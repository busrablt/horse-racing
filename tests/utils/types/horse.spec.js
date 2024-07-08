const { Horse, HorseStatus } = require("@/utils/types/horse")

describe("Horse Class", () => {
  let horse;

  beforeEach(() => {
    horse = new Horse(7, "Whisper", "cyan");
  });

  test("Should initialize correctly", () => {
    expect(horse.id).toBe(7);
    expect(horse.name).toBe("Whisper");
    expect(horse.color).toBe("cyan");
    expect(horse.getDistance()).toBe(0);
    expect(horse.status).toBe(HorseStatus.Standing);
    expect(horse.condition).toBeLessThanOrEqual(100);
    expect(horse.condition).toBeGreaterThanOrEqual(1);
  });

  test("Should move correctly", () => {
    const initialCondition = horse.condition;
    horse.move(200);
    expect(horse.getDistance()).toBe(initialCondition);
    expect(horse.status).toBe(HorseStatus.Running1);
  });

  test("Should stop correctly", () => {
    horse.move(80);
    horse.stop();
    expect(horse.status).toBe(HorseStatus.Standing);
  });

  test("Should reset distance correctly", () => {
    horse.move(50);
    horse.resetDistance();
    expect(horse.getDistance()).toBe(0);
    expect(horse.status).toBe(HorseStatus.Standing);
  });
});
