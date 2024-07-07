<template>
  <div>
    <Navbar :isGenerateProgram="!!getRounds.length" />
    <div class="content" :class="{ 'no-content': !getRounds.length }">
      <div class="content__table-container">
        <p class="content__table-container__title">Horse List (1-20)</p>
        <div class="content__table-container__scroll">
          <DynamicTable :headers="horseHeaders" :data="getHorseList" />
        </div>
      </div>
      <Hippodrome
        v-if="currentRound"
        :round="currentRound"
        :roundTitle="formatTableTitle(currentRound)"
      />
      <div
        v-if="getRounds.length"
        :class="{ content__schedule: getRounds[0].isFinished }"
      >
        <div class="content__table-container">
          <p class="content__table-container__title">Program</p>
          <div class="content__table-container__scroll">
            <DynamicTable
              v-for="(round, index) in getRounds"
              :key="`program-${index}`"
              :headers="competitionHeaders"
              :data="formatProgram(round.horses)"
              :title="formatTableTitle(round)"
            />
          </div>
        </div>
        <div v-if="getRounds[0].isFinished" class="content__table-container">
          <p class="content__table-container__title">Result</p>
          <div class="content__table-container__scroll">
            <div v-for="(round, index) in getRounds" :key="`result-${index}`">
              <DynamicTable
                v-if="round.isFinished"
                :headers="competitionHeaders"
                :data="formatResults(round)"
                :title="formatTableTitle(round)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="content__empty-schedule" v-else>
        <span>Please generate program to create a schedule!</span>
        <img src="@/assets/svg/running-2.svg" alt="horse" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navbar from "@/components/Navbar.vue";
import DynamicTable from "@/components/DynamicTable.vue";
import Hippodrome from "@/components/Hippodrome.vue";
export default {
  components: {
    DynamicTable,
    Navbar,
    Hippodrome,
  },
  data() {
    return {
      horseHeaders: ["name", "condition", "color"],
      competitionHeaders: ["position", "name"],
    };
  },
  mounted() {
    this.initialize();
  },
  computed: {
    ...mapGetters(["getHorseList", "getRounds", "getCurrentLap"]),
    currentRound() {
      return this.getRounds.find((round) => round.lap === this.getCurrentLap);
    },
  },
  methods: {
    ...mapActions(["initialize", "startNextRace"]),
    startPauseButton() {
      this.startNextRace();
    },
    formatResults(round) {
      const results = round.getResults();
      const result = [];
      for (let i = 0; i < results.length; i++) {
        const id = results[i];
        const horse = round.horses.find((horse) => horse.id === id);
        result.push({
          position: i + 1,
          name: horse.name,
        });
      }
      return result;
    },
    formatProgram(horses) {
      const program = [];
      for (let i = 0; i < horses.length; i++) {
        program.push({
          position: i + 1,
          name: horses[i].name,
        });
      }
      return program;
    },
    ordinalNumber(number) {
      const suffixes = ["th", "st", "nd", "rd"];
      const v = number % 100;
      return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    },
    formatTableTitle(round) {
      const formatedLap = this.ordinalNumber(round.lap);
      return `${formatedLap} Lap - ${round.distance}m`;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
  gap: 20px;
  margin-top: 20px;
  &.no-content {
    grid-template-columns: 1fr 2fr;
  }
  @media screen and (max-width: map-get($breakpoints, "lg")) {
    grid-template-columns: 1fr !important;
  }

  &__empty-schedule {
    display: flex;
    flex-direction: column;
    color: $gray;
    font-size: 24px;
    font-weight: 600;
    margin: auto;
    text-align: center;
    img {
      max-height: 500px;
    }
  }

  &__schedule {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  &__table-container {
    border: 1px solid $border-gray;
    border-radius: 3px;
    height: fit-content;
    &__title {
      font-size: 24px;
      text-align: center;
      margin: 10px 0;
      @media screen and (max-width: map-get($breakpoints, "md")) {
        font-size: 16px;
        margin: 6px 0;
      }
    }
    &__scroll {
      overflow-y: scroll;
      max-height: 760px;
      overflow-x: scroll;
    }
  }
  img {
    max-width: 100%;
  }
}
</style>