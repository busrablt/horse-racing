enum HorseStatus {
  Standing = "standing",
  Running1 = "running-1",
  Running2 = "running-2",
}

export class Horse {
  private condition: number;
  private traveled: number = 0;
  private status = HorseStatus.Standing;

  constructor(public id: number, public name: string, public color: string) {
    this.condition = Math.floor(Math.random() * 100) + 1;
  }

  move() {
    this.status =
      this.status === HorseStatus.Running1
        ? HorseStatus.Running2
        : HorseStatus.Running1;
    this.traveled += this.condition;
  }

  getDistance() {
    return this.traveled;
  }

  resetDistance() {
    this.traveled = 0;
  }

  stop() {
    this.status = HorseStatus.Standing;
  }
}
