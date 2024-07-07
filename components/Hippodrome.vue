<template>
  <div>
    <div class="lane" v-for="(horse, i) in horses" :key="i">
      <div class="lane__number">
        <div>{{ i + 1 }}</div>
      </div>
      <div class="lane__path">
        <Horse :horse="horse" :distance="distance" />
      </div>
      <div class="lane__finish-line"></div>
    </div>
  </div>
</template>

<script>
import Horse from "./Horse.vue";
export default {
  name: "Hippodrome",
  components: {
    Horse,
  },
  props: {
    horses: {
      type: Array,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
  },

};
</script>

<style lang="scss" scoped>
.lane {
  display: flex;
  height: 80px;
  position: relative;
  font-family: $font-base;
  &__number {
    display: flex;
    width: 50px;
    justify-content: center;
    align-items: center;
    background-color: $green;
    border: 1px solid white;
    div {
      color: white;
      transform: rotate(270deg);
    }
  }
  &__path {
    display: flex;
    align-items: center;
    border: 1px dashed $gray;
    border-left: none;
    width: 100%;
    position: relative;
  }
  &__finish-line {
    width: 5px;
    background-color: $red;
    height: 100%;
    right: 0;
  }
  img {
    height: 40px;
    width: 80px;
    position: absolute;
    left: 0;
  }
}
</style>
