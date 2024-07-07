import { Horse } from "~/utils/horse"
import { Horses } from "~/utils/constant"
import { Round } from "~/utils/round"

export const state = () => ({
  horseList: [],
  rounds: [],
  currentLap: 1,
  raceInProgress: false,
  isPaused: false,
  lastRunningHorse: null
})

export const mutations = {
  setHorseList(state, list) {
    state.horseList = list
  },
  setRounds(state, rounds) {
    state.rounds = rounds
  },
  nextRound(state) {
    state.currentLap++;
  },
  resetLap(state) {
    state.currentLap = 1;
  },
  setRaceInProgress(state, value) {
    state.raceInProgress = value;
  },
  roundHorseReset(state) {
    const round = state.rounds.find(round => round.lap === state.currentLap);
    round.horses.forEach(horse => {
      horse.resetDistance();
    });
  },
  resetAllHorses(state) {
    state.lastRunningHorse = null;
    state.horseList.forEach(horse => {
      horse.resetDistance();
    });
  },
  horseMove(state, index) {
    const round = state.rounds.find(round => round.lap === state.currentLap);
    round.horses[index].move(round.distance);
  },
  horseFinish(state, index) {
    const round = state.rounds.find(round => round.lap === state.currentLap);
    const horse = round.horses[index];
    horse.stop();
    round.results.push(horse.id);
  },
  setRoundFinished(state, value) {
    const round = state.rounds.find(round => round.lap === state.currentLap);
    round.isFinished = value;
  },
  setPaused(state, value) {
    state.isPaused = value;
    if (value) {
      state.raceInProgress = false;
    }
  },
  setLastRunningHorse(state, horseIndex) {
    state.lastRunningHorse = horseIndex;
  }
};

export const actions = {
  initialize ({ commit }) {
    const horseList = [];
    Object.entries(Horses).forEach(([name, color], i) => {
      horseList.push(new Horse(i + 1, name, color));
    });

    commit("setHorseList", horseList);
  },
  generateProgram ({ commit, state }) {
    if (state.raceInProgress) {
      commit("setPaused", true);
    }

    commit("setRaceInProgress", false);
    commit("setLastRunningHorse", null);
    commit("resetAllHorses");
    commit("resetLap");
    const rounds = [];
    const pathDistances = [1200, 1400, 1600, 1800, 2000, 2200];
    for (let i = 0; i < 6; i++) {
      const lap = i + 1;
      const round = new Round(pathDistances[i], lap);
      round.selectHorsesToRace(state.horseList);
      rounds.push(round);
    }

    commit("setRounds", rounds);
  },
  async startNextRace({ commit, dispatch, state }) {
    const delayDuration = 15;
    const round = state.rounds.find(round => round.lap === state.currentLap);
    if (!round) {
      console.error("No round found");
      return;
    }
    
    if (round.horses.length < 10) {
      throw new Error("There are not enough horses to start");
    }

    commit("setRaceInProgress", true);
    if (!state.lastRunningHorse) {
      commit("roundHorseReset");
    }
  
    while (round.results.length < round.horses.length) {
      for (let i = 0; i < round.horses.length; i++) {
        const idx = state.lastRunningHorse || i;
        const horse = round.horses[idx];
        if (state.lastRunningHorse) {
          commit("setLastRunningHorse", null);
        }

        if (state.isPaused) {
          commit("setLastRunningHorse", i);
          break;
        }

        if (horse.getDistance() >= round.distance) {
          await new Promise((resolve) => setTimeout(resolve, delayDuration));
          continue;
        }

        commit("horseMove", i);
        await new Promise((resolve) => setTimeout(resolve, delayDuration));
        if (horse.getDistance() >= round.distance) {
          commit("horseFinish", i);
          console.log("horseFinish", i);
        }
      }
      if (state.isPaused) {
        break;
      }
    }
    if (state.isPaused) {
      commit("setPaused", false);
      return;
    }

    commit("setRoundFinished", true);
    if (state.currentLap !== state.rounds.length) {
      commit("nextRound");
      await dispatch("startNextRace");
    } else {
      commit("setRaceInProgress", false);
    }
  }
};

export const getters = {
  getHorseList(state) {
    return state.horseList
  },
  getRounds(state) {
    return state.rounds
  },
  getCurrentLap(state) {
    return state.currentLap
  },
  isRaceStarted(state) {
    return state.raceInProgress
  }
};