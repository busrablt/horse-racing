<template>
  <div class="wrapper">
    <Navbar :isGenerateProgram="!!getRounds.length" />
    <div
      class="wrapper__content"
      :class="{ 'no-content': !getRounds.length }"
    >
      <div class="wrapper__content__table-wrapper">
        <p class="wrapper__content__table-wrapper__title">
          Horse List (1-20)
        </p>
        <div class="wrapper__content__table-wrapper__scroll">
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
        :class="{ wrapper__content__schedule: getRounds[0].isFinished }"
      >
        <div class="wrapper__content__table-wrapper">
          <p class="wrapper__content__table-wrapper__title">Program</p>
          <div class="wrapper__content__table-wrapper__scroll">
            <DynamicTable
              v-for="(round, index) in getRounds"
              :key="`program-${index}`"
              :headers="competitionHeaders"
              :data="formatProgram(round.horses)"
              :title="formatTableTitle(round)"
            />
          </div>
        </div>
        <div
          v-if="getRounds[0].isFinished"
          class="wrapper__content__table-wrapper"
        >
          <p class="wrapper__content__table-wrapper__title">Result</p>
          <div class="wrapper__content__table-wrapper__scroll">
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
      <div class="wrapper__content__empty-schedule" v-else>
        <span>Please generate program to create a schedule!</span>
        <img src="@/assets/svg/running-2.svg" alt="horse" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import type { Horse } from "@/utils/types/horse";
import type { Round } from "@/utils/types/round";
import helpers from "@/utils/helpers";
import Navbar from "@/components/Navbar.vue";
import DynamicTable from "@/components/DynamicTable.vue";
import Hippodrome from "@/components/Hippodrome.vue";
export default defineComponent({
  components: {
    DynamicTable,
    Navbar,
    Hippodrome,
  },
  data() {
    return {
      horseHeaders: ["name", "condition", "color"],
      competitionHeaders: ["position", "name"],
      formatTableTitle: helpers.formatTableTitle
      
    };
  },
  mounted() {
    this.initialize();
  },
  computed: {
    ...mapGetters({
      getHorseList: "getHorseList",
      getRounds: "getRounds",
      getCurrentLap: "getCurrentLap"
    }),
    currentRound(): Round {
      return this.getRounds.find((round: any) => round.lap === this.getCurrentLap);
    },
  },
  methods: {
    ...mapActions({ initialize: "initialize", startNextRace: "startNextRace" }),
    startPauseButton() {
      this.startNextRace();
    },
    formatResults(round: Round) {
      const results = round.getResults();
      const result = [];
      for (let i = 0; i < results.length; i++) {
        const id = results[i];
        const horse = round.horses.find((horse) => horse.id === id);
        result.push({
          position: i + 1,
          name: horse?.name,
        });
      }
      return result;
    },
    formatProgram(horses: Horse[]) {
      const program = [];
      for (let i = 0; i < horses.length; i++) {
        program.push({
          position: i + 1,
          name: horses[i].name,
        });
      }
      return program;
    }
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 20px;
  &__content {
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
    &__table-wrapper {
      border: 1px solid $border-gray;
      box-shadow: 9px -7px 20px -12px rgba(0,0,0,0.22);

      border-radius: 3px;
      height: fit-content;
      &__title {
        font-size: 20px;
        text-align: center;
        margin: 10px 0 4px;
        @media screen and (max-width: map-get($breakpoints, "md")) {
          font-size: 16px;
          margin: 6px 0;
        }
      }
      &__scroll {
        overflow-y: scroll;
        max-height: 720px;
        overflow-x: scroll;
        @media screen and (max-width: map-get($breakpoints, "md")) {
          max-height: 280px;
        }
      }
    }
    img {
      max-width: 100%;
    }
  }
}
</style>
