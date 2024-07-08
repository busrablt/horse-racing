import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Navbar from "@/components/Navbar.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Navbar", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        isRaceStarted: true,
      },
      getters: {
        isRaceStarted: (state) => state.isRaceStarted,
      },
      mutations: {
        setPaused: jest.fn(),
      },
      actions: {
        generateProgram: jest.fn(),
        startNextRace: jest.fn(),
      },
    });
  });

  test("Should render Navbar component correctly", () => {
    const wrapper = mount(Navbar, {
      store,
      localVue,
      propsData: { isGenerateProgram: true },
    });

    const titleElement = wrapper.find(".navbar span");
    expect(titleElement.text()).toBe("Horse Racing");
    expect(wrapper.findAllComponents({ name: "Button" }).length).toEqual(2);
  });
});
