// noinspection JSUnusedGlobalSymbols

class Size {
  setValue(name, value) {
    if (name === "height") {
      this.height = value;
      return;
    }
    if (name === "width") {
      this.width = value;
      return;
    }
  }
}
