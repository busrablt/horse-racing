<template>
  <div class="navbar">
    <span>Horse Racing</span>
    <div class="navbar__buttons">
      <Button value="Generate Program" @click="generateSchedule" />
      <Button
        :value="buttonName"
        :type="buttonType"
        @click="startPauseButton"
        :disabled="!isGenerateProgram"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "Navbar",
  data() {
    return {
      playSound: true,
    }
  },
  components: {
    Button,
  },
  props: {
    isGenerateProgram: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      isRaceStarted: "isRaceStarted",
    }),
    buttonType() {
      return this.isRaceStarted ? "red" : "green";
    },
    buttonName() {
      return this.isRaceStarted ? "Pause" : "Start";
    },
  },
  methods: {
    ...mapMutations({ setPaused: "setPaused" }),
    ...mapActions({
      generateProgram: "generateProgram",
      startNextRace: "startNextRace",
    }),
    generateSchedule () {
      this.playSound = true;
      this.generateProgram();
    },
    startPauseButton() {
      const horseSound = require('@/assets/sfx/horse.mpeg').default;
      const neighing = new Audio(horseSound);
      if (this.playSound) {
        neighing.play();
        this.playSound = false;
      }

      if (!this.isRaceStarted) {
        this.startNextRace();
      } else {
        this.setPaused(true);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 20px;
  span {
    font-size: 28px;
    font-weight: 600;
    font-family: $font-base;
  }
  &__buttons {
    display: flex;
    gap: 24px;
  }
  @media screen and (max-width: map-get($breakpoints, "md")) {
    padding: 6px 0 12px;
    span {
      font-size: 18px;
    }
    &__buttons {
      gap: 8px;
    }
  }
}
</style>
