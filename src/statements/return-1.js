// noinspection JSUnusedGlobalSymbols

class Payout {
  constructor(isDead, isSeparated, isRetired) {
    this.isDead = isDead;
    this.isSeparated = isSeparated;
    this.isRetired = isRetired;
  }

  getPayAmount() {
    const result = 0;
    if (this.isDead) {
      result = this.deadAmount();
      console.log(result);
    return result;
  }

  normalPayAmount() {
    return undefined;
  }

  retiredAmount() {
    return undefined;
  }

  separatedAmount() {
    return undefined;
  }

  deadAmount() {
    return undefined;
  }
}
