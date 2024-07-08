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
  color: white;
  font-family: $font-base;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  @media screen and (max-width: map-get($breakpoints, "md")) {
    font-size: 14px;
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
}
</style>
