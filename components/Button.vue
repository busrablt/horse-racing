<template>
  <button
    :class="[buttonClass, { 'cursor-none': disabled }]"
    @click="handleClick"
    :disabled="disabled"
  >
    {{ value }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Button",
  props: {
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "gray",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClass() {
      return `button ${this.type}`;
    },
  },
  methods: {
    handleClick(event: any) {
      this.$emit("click", event);
    },
  },
});
</script>

<style lang="scss" scoped>
.button {
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease;
  color: white;
  font-family: $font-base;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  @media screen and (max-width: map-get($breakpoints, "md")) {
    font-size: 12px;
    padding: 6px 12px;
  }
  &.gray {
    background-color: $gray;
  }
  &.red {
    background-color: $red;
  }
  &.green {
    background-color: $green;
  }
  &.cursor-none {
    cursor: not-allowed;
  }
  &:hover {
    box-shadow: none;
  }
}
</style>
