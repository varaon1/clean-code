// noinspection JSUnusedGlobalSymbols

class Order {
  constructor(price) {
    this.price = price;
  }

  process() {
    if (this.isSpecialDeal()) {
      this.total = this.price * 0.95;
      this.send();
    } else {
      this.total = this.price * 0.98;
      this.send();
    }
  }

  isSpecialDeal() {
    //...
  }

  send() {
    //...
  }
}
