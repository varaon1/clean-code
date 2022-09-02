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

    // Apply regional discounts.
    switch (this._user.getCountry()) {
      case "US":
        total *= 0.85;
        break;
      case "RU":
        total *= 0.75;
        break;
      case "CN":
        total *= 0.9;
        break;
      // ...
    }

    return total;
  }
}
