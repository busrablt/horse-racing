<template>
  <img
    :src="require(`~/assets/svg/${horse.status}.svg`)"
    alt="horse"
    class="horse"
  />
</template>

<script>
export default {
  props: {
    horse: {
      type: Object,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
  },
  computed: {
    animationDuration() {
      return `${this.distance / this.horse.condition }s`;
    },
  },
};
</script>

<style scoped lang="scss">
.horse {
  height: 40px;
  width: 80px;
  position: absolute;
  left: 0;
  animation: run linear infinite;
  animation-duration: v-bind(animationDuration);
}

@keyframes run {
  0% {
    left: 0;
  }
  100% {
    left: calc(100% - 50px);
  }
}
</style>
