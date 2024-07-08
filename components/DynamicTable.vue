<template>
  <div class="dynamic-table">
    <div class="dynamic-table__title">{{ title }}</div>
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td v-for="(header, headerIndex) in headers" :key="headerIndex">
            {{ row[header] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DynamicTable",
  props: {
    title: {
      type: String,
      required: false,
    },
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.dynamic-table {
  &__title {
    text-align: center;
    margin: 12px 0;
    @media screen and (max-width: map-get($breakpoints, "md")) {
      font-size: 13px;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      text-transform: capitalize;
      border: 1px solid $border-gray;
      padding: 8px 12px;
      font-family: $font-base;
      @media screen and (max-width: map-get($breakpoints, "md")) {
        font-size: 12px;
        padding: 4px 6px;
      }
    }

    th {
      background-color: $light-gray;
      text-align: left;
    }
  }
}
</style>
