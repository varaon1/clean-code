// noinspection JSUnusedGlobalSymbols

class Stadium {
  constructor() {
    this.summerRate = 1.0;
    this.winterRate = 1.12;
    this.winterServiceCharge = 180;
    this.winterStart = new Date("2021-12-20T23:00:00.000Z");
    this.winterEnd = new Date("2022-03-19T23:00:00.000Z");
  }

  getTicketPrice(date, quantity) {
    let charge;
    if (this.isSummer(date)) {
      charge = this.summerCharge(quantity);
    } else {
      charge = this.winterCharge(quantity);
    }
    return charge;
  }

  isSummer(date) {
    return date < this.winterStart || date > this.winterEnd;
  }

  summerCharge(quantity) {
    return quantity * this.summerRate;
  }

  winterCharge(quantity) {
    return quantity * this.winterRate + this.winterServiceCharge;
  }
}
