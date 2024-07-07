<template>
  <button :class="buttonClass" @click="handleClick">
    {{value}}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    value: {
        type: String
    },
    type: {
      type: String,
      default: "gray"
    }
  },
  computed: {
    buttonClass() {
      return `button ${this.type}`;
    }
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    }
  }
}
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
  &.gray {
    background-color: $gray;
  }
  &.red {
    background-color: $red;
  }
  &.green {
    background-color: $green;
  }
}

</style>
