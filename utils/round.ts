import type { Horse } from "./horse";
export class Round {
  private results: number[] = [];
  private horses: Horse[] = [];
  public isFinished: boolean = false;
  constructor(public distance: number, public lap: number) {}

  start(): void {
    if (this.horses.length < 10) {
      throw new Error("There are not enough horses to start");
    }

    if (this.isFinished) {
      throw new Error("Round is already finished");
    }

    this.horses.forEach((horse) => {
      horse.resetDistance();
    });

    while (this.results.length < this.horses.length) {
      for (const horse of this.horses) {
        if (horse.getDistance() >= this.distance) {
          continue;
        }
        horse.move();

        if (horse.getDistance() >= this.distance) {
          horse.stop();
          this.results.push(horse.id);
        }
      }
    }
    this.isFinished = true;
  }

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