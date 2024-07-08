import type { Horse } from "./horse";
export class Round {
  public results: number[] = [];
  public horses: Horse[] = [];
  public isFinished: boolean = false;
  constructor(public distance: number, public lap: number) {}

  selectHorsesToRace(horses: Horse[]): void {
    if (horses.length < 10) {
      throw new Error("There are not enough horses to select from");
    }

    while (this.horses.length < 10) {
      const horse = horses[Math.floor(Math.random() * horses.length)];
      if (!this.horses.includes(horse)) {
        this.horses.push(horse);
      }
    }
  }

  getResults(): number[] {
    return this.results;
  }
  
  getHorses(): Horse[] {
    return this.horses;
  }
}