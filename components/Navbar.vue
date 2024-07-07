<template>
  <div class="navbar">
    <span>Horse Racing</span>
    <div>
      <Button value="Generate Program" @click="generateProgram()" />
      <Button
        value="Start / Pause"
        :type="buttonType"
        @click="startPauseButton"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Button from "../components/Button.vue";
export default {
  name: "Navbar",
  components: {
    Button,
  },
  data() {
    return {
      isStarted: true,
    };
  },
  computed: {
    buttonType() {
      return this.isStarted ? "green" : "red";
    },
  },
  methods: {
    ...mapActions(["generateProgram"]),
    startPauseButton() {
      this.isStarted = !this.isStarted;
    }
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
}
</style>
