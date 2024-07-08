<template>
  <div>
    <div
      class="saddle"
      :style="{
        top: `${horse.status !== 'standing' ? '30px': '' }`,
        left: `${traveledPixels + 46}px`,
        background: horseColors[horse.color],
      }"
    />
    <div
      :style="{
        top: `${horse.status !== 'standing' ? '32px': '' }`,
        left: `${traveledPixels + 55}px`,
        background: horseColors[horse.color],
      }"
      class="number"
    >
      {{ laneNumber }}
    </div>
    <img
      :src="require(`@/assets/svg/${horse.status}.svg`)"
      alt="horse"
      class="horse"
      :style="{ left: `${traveledPixels}px` }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { Horse } from "@/utils/types/horse";
import { HorseColors } from "~/utils/constants";
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
    traveledPixels(): number {
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
  top: 26px;
  z-index: 2;
  border-radius: 25% 30% 20% 12%;
}

.number {
  user-select: none;
  position: absolute;
  z-index: 10;
  font-size: 10px;
  color: white;
  top: 28px;
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
