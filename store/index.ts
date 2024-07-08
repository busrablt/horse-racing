import Vue from 'vue';
import Vuex, { MutationTree, ActionTree, GetterTree } from 'vuex';
import { Horse } from "@/utils/types/horse";
import { Round } from "@/utils/types/round";
import { Horses, PathDistances } from "~/utils/constants";

Vue.use(Vuex);


export const state = () => ({
  horseList: [] as Horse[],
  rounds: [] as Round[],
  currentLap: 1,
  raceInProgress: false,
  isPaused: false,
  lastRunningHorse: null as number | null
});

export type RootState = ReturnType<typeof state>;

export const mutations: MutationTree<RootState> = {
  setHorseList(state, list: Horse[]) {
    state.horseList = list;
  },
  setRounds(state, rounds: Round[]) {
    state.rounds = rounds;
  },
  nextRound(state) {
    state.currentLap++;
  },
  resetLap(state) {
    state.currentLap = 1;
  },
  setRaceInProgress(state, value: boolean) {
    state.raceInProgress = value;
  },
  roundHorseReset(state) {
    const round = state.rounds.find(round => round.lap === state.currentLap);
    if (round) {
      round.horses.forEach(horse => {
        horse.resetDistance();
      });
    }
  },
  resetAllHorses(state) {
    state.lastRunningHorse = null;
    state.horseList.forEach(horse => {
      horse.resetDistance();
    });
  },
  horseMove(state, index: number) {
    const round = state.rounds.find(round => round.lap === state.currentLap);
    if (round) {
      round.horses[index].move(round.distance);
    }
  },
  horseFinish(state, index: number) {
    const round = state.rounds.find(round => round.lap === state.currentLap);
    if (round) {
      const horse = round.horses[index];
      horse.stop();
      round.results.push(horse.id);
    }
  },
  setRoundFinished(state, value: boolean) {
    const round = state.rounds.find(round => round.lap === state.currentLap);
    if (round) {
      round.isFinished = value;
    }
  },
  setPaused(state, value: boolean) {
    state.isPaused = value;
    if (value) {
      state.raceInProgress = false;
    }
  },
  setLastRunningHorse(state, horseIndex: number | null) {
    state.lastRunningHorse = horseIndex;
  }
};

export const actions: ActionTree<RootState, RootState> = {
  initialize({ commit }) {
    const horseList: Horse[] = [];
    Object.entries(Horses).forEach(([name, color], i) => {
      horseList.push(new Horse(i + 1, name, color));
    });

    commit("setHorseList", horseList);
  },
  generateProgram({ commit, state }) {
    if (state.raceInProgress) {
      commit("setPaused", true);
    }

    commit("setRaceInProgress", false);
    commit("setLastRunningHorse", null);
    commit("resetAllHorses");
    commit("resetLap");
    const rounds: Round[] = [];
    const pathDistances = PathDistances;
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
    if (state.lastRunningHorse === null) {
      commit("roundHorseReset");
    }

    while (round.results.length < round.horses.length) {
      for (let i = 0; i < round.horses.length; i++) {
        const idx = state.lastRunningHorse ?? i;
        const horse = round.horses[idx];
        if (state.lastRunningHorse !== null) {
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

export const getters : GetterTree<RootState, RootState> = {
  getHorseList(state) {
    return state.horseList;
  },
  getRounds(state) {
    return state.rounds;
  },
  getCurrentLap(state) {
    return state.currentLap;
  },
  isRaceStarted(state) {
    return state.raceInProgress;
  }
};
