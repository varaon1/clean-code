// noinspection JSUnusedGlobalSymbols

class Payout {
  constructor(isDead, isSeparated, isRetired) {
    this.isDead = isDead;
    this.isSeparated = isSeparated;
    this.isRetired = isRetired;
  }

  getPayAmount() {
    let result;
    if (this.isDead) {
      result = this.deadAmount();
    } else {
      if (this.isSeparated) {
        result = this.separatedAmount();
      } else {
        if (this.isRetired) {
          result = this.retiredAmount();
        } else {
          result = this.normalPayAmount();
        }
      }
    }
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
