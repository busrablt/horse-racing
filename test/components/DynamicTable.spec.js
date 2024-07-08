import { mount } from "@vue/test-utils";
import DynamicTable from "@/components/DynamicTable.vue";

describe("DynamicTable", () => {
  const title = "Propgram";
  const headers = ["position", "name"];
  const data = [
    { position: 1, name: "Apollo" },
    { position: 2, name: "Luna" },
  ];
  const wrapper = mount(DynamicTable, {
    propsData: { title, headers, data },
  });

  test("Should render DynamicTable component correctly", () => {
    const titleElement = wrapper.find(".dynamic-table__title");
    expect(titleElement.text()).toBe(title);
  });

  test("Should render the correct text content for each header cell", () => {
    const thElements = wrapper.findAll("th");
    expect(thElements.length).toBe(headers.length);
    thElements.wrappers.forEach((thWrapper, index) => {
      expect(thWrapper.text()).toBe(headers[index]);
    });
  });

  test("Should render the table rows and cells correctly", () => {
    const trElements = wrapper.findAll("tbody tr");
    expect(trElements.length).toBe(data.length);
    trElements.wrappers.forEach((trWrapper, rowIndex) => {
      const tdElements = trWrapper.findAll("td");
      expect(tdElements.length).toBe(headers.length);
      tdElements.wrappers.forEach((tdWrapper, colIndex) => {
        expect(tdWrapper.text()).toBe(
          data[rowIndex][headers[colIndex]].toString()
        );
      });
    });
  });
});
