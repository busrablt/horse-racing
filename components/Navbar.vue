<template>
  <div class="navbar">
    <span>Horse Racing</span>
    <div>
      <Button value="Generate Program" @click="generateProgram()" />
      <Button
        :value="buttonName"
        :type="buttonType"
        @click="startPauseButton"
        :disabled="!this.isGenerateProgram"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Button from "@/components/Button.vue";
export default {
  name: "Navbar",
  components: {
    Button,
  },
  props: {
    isGenerateProgram: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isStarted: true,
    };
  },
  computed: {
    ...mapGetters(["isRaceStarted"]),
    buttonType() {
      return this.isRaceStarted ? "red" : "green";
    },
    buttonName() {
      return this.isRaceStarted ? "Pause" : "Start";
    },
  },
  methods: {
    ...mapActions(["generateProgram", "startNextRace"]),
    ...mapMutations(["setPaused"]),
    startPauseButton() {
      if (!this.isRaceStarted) {
        return this.startNextRace();
      }
      return this.setPaused(true);
    },
  },
};
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
  @media screen and (max-width: map-get($breakpoints, "md")) {
    padding: 6px 0 12px;
    span {
      font-size: 18px;
    }
  }
}
</style>
