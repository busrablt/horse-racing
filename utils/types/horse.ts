enum HorseStatus {
  Standing = "standing",
  Running1 = "running-1",
  Running2 = "running-2",
}

export class Horse {
  private _condition: number;
  private traveled: number = 0;
  private status = HorseStatus.Standing;

  constructor(public id: number, public name: string, public color: string) {
    this._condition = Math.floor(Math.random() * 100) + 1;
  }

  move(targetDistance: number) {
    this.status =
      this.status === HorseStatus.Running1
        ? HorseStatus.Running2
        : HorseStatus.Running1;

    if (this.traveled + this._condition >= targetDistance) {
      this.traveled = targetDistance;
      this.status = HorseStatus.Standing;
      return;
    } else {
      this.traveled += this._condition;
    }
  }

  getDistance() {
    return this.traveled;
  }

  resetDistance() {
    this.traveled = 0;
    this.status = HorseStatus.Standing;
  }

  stop() {
    this.status = HorseStatus.Standing;
  }

  get condition() {
    return this._condition;
  }
}
