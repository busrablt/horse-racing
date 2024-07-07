import { Horse } from "~/utils/horse"
import { Round } from "~/utils/round"

export const state = () => ({
  horseList: [],
  rounds: [],
  currentRound: 1,
  raceInProgress: false,
})

export const getters = {
  getHorseList(state) {
    return state.horseList
  },
  getRounds(state) {
    return state.rounds
  },
  getCurrentRound(state) {
    return state.currentRound
  }
}

export const mutations = {
  setHorseList(state, list) {
    state.horseList = list
  },
  setRounds(state, rounds) {
    state.rounds = rounds
  },
  nextRound(state) {
    state.currentRound++;
  },
  setRaceInProgress(state, value) {
    state.raceInProgress = value;
  }
}

export const actions = {
  generateProgram ({ commit, state }) {
    const rounds = [];
    const pathDistances = [1200, 1400, 1600, 1800, 2000, 2200];
    for (let i = 0; i < 6; i++) {
      const lap = i + 1;
      const round = new Round(pathDistances[i], lap);
      round.selectHorsesToRace(state.horseList);
      rounds.push(round);
    }
    console.log("SET ROUNDS CALLED");
    commit("setRounds", rounds);
  },
  initialize ({ commit }) {
    const horses = {
      "Comet": "light gray",
      "Whisper": "black",
      "Maverick": "chestnut",
      "Starlight": "palomino",
      "Midnight": "red",
      "Apollo": "bay",
      "Luna": "gray",
      "Rio Grande": "brown",
      "Ember": "chestnut",
      "Zephyr": "black and white pinto",
      "Champion": "buckskin",
      "Sable": "black",
      "Dakota": "appaloosa",
      "Valor": "dark bay",
      "Gypsy": "piebald",
      "Thunder": "chestnut",
      "Picasso": "skewbald",
      "Legend": "beige",
      "Phoenix": "red roan",
      "Moonlight": "white"
    };
    const horseList = [];
    Object.entries(horses).forEach(([name, color], i) => {
      horseList.push(new Horse(i + 1, name, color));
    });

    commit("setHorseList", horseList);
  },
  startNextRace ({ state, commit, dispatch }) {
    const round = state.rounds.find(round => round.lap === state.currentRound);
    if (!round) {
      console.error("No round found");
      return;
    }
    commit("setRaceInProgress", true);
    round.start();
    if (state.currentRound !== state.rounds.length) {
      commit("nextRound");
      dispatch("startNextRace");
    } else {
      commit("setRaceInProgress", false);
    }
  },
}