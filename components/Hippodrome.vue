<template>
  <div ref="hippodrome">
    <div class="round-title">{{ roundTitle }}</div>
    <div class="lane" v-for="(horse, i) in horses" :key="i">
      <div class="lane__number">
        <div>{{ i + 1 }}</div>
      </div>
      <div class="lane__path">
        <HorseComponent
          :horse="horse"
          :distance="distance"
          :lane-length="hippodromeWidth"
          :laneNumber="i + 1"
        />
      </div>
      <div class="lane__finish-line"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { Round } from "@/utils/types/round";
import type { Horse } from "@/utils/types/horse";
import HorseComponent from "@/components/Horse.vue";
export default defineComponent({
  name: "Hippodrome",
  components: {
    HorseComponent,
  },
  props: {
    round: {
      type: Object as PropType<Round>,
      required: true,
    },
    roundTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hippodromeWidth: 0,
    };
  },
  mounted() {
    this.calculateHippodromeWidth();
    window.addEventListener("resize", this.calculateHippodromeWidth);
  },
  methods: {
    calculateHippodromeWidth() {
      const ref = this.$refs.hippodrome as HTMLElement;
      if (ref) {
        this.hippodromeWidth = ref.offsetWidth - 120;
      }
    }
  },
  computed:  {
    horses(): Horse[] {
      return this.round.getHorses();
    },
    distance(): number {
      return this.round.distance;
    },
  },
});
</script>

<style lang="scss" scoped>
.round-title {
  width: 100%;
  text-align: center;
  color: $olive-gray;
  font-size: 20px;
  margin-bottom: 14px;
  @media screen and (max-width: map-get($breakpoints, "md")) {
    font-size: 16px;
  }
}
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
    border: 1px solid $white;
    div {
      color: $white;
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
