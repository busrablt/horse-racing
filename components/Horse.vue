<template>
  <div>
    <div
      class="saddle"
      :style="{
        left: `${traveledPixels + 46}px`,
        background: horseColors[horse.color],
      }"
    />
    <div
      :style="{
        left: `${traveledPixels + 55}px`,
        background: horseColors[horse.color],
      }"
      class="number"
    >
      {{ laneNumber }}
    </div>
    <img
      :src="require(`~/assets/svg/${horse.status}.svg`)"
      alt="horse"
      class="horse"
      :style="{ left: `${traveledPixels}px` }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { Horse } from "~/utils/horse";
import { HorseColors } from "@/utils/constant";
export default defineComponent({
  props: {
    horse: {
      type: Object as PropType<Horse>,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    laneLength: {
      type: Number,
      required: true,
    },
    laneNumber: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      horseColors: HorseColors,
    };
  },
  computed: {
    animationDuration() {
      return `${this.distance / this.horse.condition}s`;
    },
    traveledPixels() {
      const traveledPixel =
        (this.laneLength * this.horse.getDistance()) / this.distance;
      return traveledPixel;
    },
  },
});
</script>

<style scoped lang="scss">
.saddle {
  width: 18px;
  height: 17px;
  position: absolute;
  top: 27px;
  z-index: 2;
  border-radius: 20% 30% 12% 10%;
}

.number {
  user-select: none;
  position: absolute;
  z-index: 10;
  font-size: 10px;
  color: white;
  top: 30px;
  font-weight: 900;
  padding: 2px;
  padding-left: 0px;
  padding-bottom: 1px;
  border-radius: 5px;
}
.horse {
  height: 80px;
  width: 120px;
  position: absolute;
  left: 0;
  top: 0;
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
