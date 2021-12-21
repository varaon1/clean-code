// noinspection JSUnusedGlobalSymbols

class Order {
  constructor(products, user) {
    this._products = products;
    this._user = user;
  }

  calculateTotal() {
    let total = 0;
    for (const product of this._products) {
      total += product.quantity * product.price;
    }

    return this.applyRegionalDiscounts(total);
  }

  applyRegionalDiscounts(total) {
    switch (this._user.getCountry()) {
      case "US":
        return total * 0.85;
      case "RU":
        return total * 0.75;
      case "CN":
        return total * 0.9;
      // ...
    }
  }
}
