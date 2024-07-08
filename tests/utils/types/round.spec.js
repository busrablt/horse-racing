const { Round } = require("@/utils/types/round");
const { Horse } = require("@/utils/types//horse");

describe("Round Class", () => {
  let round;
  let horses;

  beforeEach(() => {
    round = new Round(1200, 1);
    horses = [];
    for (let i = 0; i < 20; i++) {
      horses.push(new Horse(i, `Horse ${i}`));
    }
  });

  test("Should initialize correctly", () => {
    expect(round.results).toEqual([]);
    expect(round.horses).toEqual([]);
    expect(round.isFinished).toBe(false);
    expect(round.distance).toBe(1200);
    expect(round.lap).toBe(1);
  });

  test("Should select 10 unique horses to race", () => {
    round.selectHorsesToRace(horses);
    expect(round.horses.length).toBe(10);
    const horseId = round.horses.map(horse => horse.id);
    const uniqueHorseId = new Set(horseId);
    expect(uniqueHorseId.size).toBe(10); 
  });

  test("Should throw error if less than 10 horses are provided", () => {
    const fewHorses = horses.slice(0, 4);
    expect(() => {round.selectHorsesToRace(fewHorses)}).toThrow("There are not enough horses to select from");
  });
});
