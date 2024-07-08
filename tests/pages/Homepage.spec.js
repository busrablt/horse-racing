import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Homepage from "@/pages/index.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Homepage", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        getHorseList: () => [
          {
            id: 1,
            name: "Maverick",
            color: "red",
            traveled: 0,
            status: "standing",
            _condition: 83,
          },
          {
            id: 2,
            name: "Starlight",
            color: "green",
            traveled: 0,
            status: "standing",
            _condition: 72,
          }
        ],
        getRounds: () => [],
        getCurrentLap: () => 1,
      },
      actions: {
        initialize: jest.fn(),
        startNextRace: jest.fn(),
      },
    });
  });

  test("Should render homepage correctly", () => {
    const wrapper = mount(Homepage, {
      store,
      localVue,
    });
    expect(wrapper.exists()).toBe(true);
    const horseListTitle = wrapper.find(".wrapper__content__table-wrapper__title");
    expect(horseListTitle.text()).toContain("Horse List");
  });

  test("Should rendercomponents correctly in the page", () => {
    const wrapper = mount(Homepage, {
      store,
      localVue,
    });

    const dynamicTable = wrapper.findComponent({ name: "DynamicTable" });
    expect(dynamicTable.exists()).toBe(true);
    expect(dynamicTable.props("headers")).toEqual(["name", "condition", "color"]);
    expect(dynamicTable.props("data")).toEqual(store.getters.getHorseList);
    const navbar = wrapper.findComponent({ name: "Navbar" });
    expect(navbar.exists()).toBe(true);
    const hippodrome = wrapper.findComponent({ name: "Hippodrome" });
    expect(hippodrome.exists()).toBe(false);
  });
});
