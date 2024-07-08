import { mount } from "@vue/test-utils";
import Button from "@/components/Button.vue";

describe("Button", () => {
  const wrapper = mount(Button, {
    propsData: { value: "Start" }
  });
  test("Should render Button component correctly", () => {
    expect(wrapper.text()).toBe("Start");
    expect(wrapper.classes()).toContain("gray");
  });

  test("When button is clicked then it should emit the click event", async () => {
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });

  test("Should be disabled when disabled prop is true", () => {
    const wrapper = mount(Button, {
      propsData: { value: "Click me", disabled: true }
    });
    wrapper.setProps({
      disabled: true
    });
    const buttonElement = wrapper.find("button");
    expect(buttonElement.attributes("disabled")).toBe("disabled");
    expect(buttonElement.classes()).toContain("cursor-none");
  });
});
