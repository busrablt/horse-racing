import helpers from "@/utils/helpers"; 

describe("ordinalNumber", () => {
  test("Should format ordinal number correctly", () => {
    expect(helpers.ordinalNumber(1)).toBe("1st");
    expect(helpers.ordinalNumber(2)).toBe("2nd");
    expect(helpers.ordinalNumber(3)).toBe("3rd");
    expect(helpers.ordinalNumber(4)).toBe("4th");
  });
});

describe("formatTableTitle", () => {
  test("Should format table title correctly", () => {
    const round= { lap: 1, distance: 1200 };
    expect(helpers.formatTableTitle(round)).toBe("1st Lap - 1200m");
  });
});
