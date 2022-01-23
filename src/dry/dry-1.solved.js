// noinspection JSUnusedGlobalSymbols

/**
 * Validates all required attributes of imported product are set
 * @param {*} product
 */
function validateProduct(product) {
  const productAttributes = ["color", "size", "type"];

  productAttributes.forEach((attribute) => {
    if (!product[attribute]) {
      throw new Error(
        `Import fail: the product attribute ${attribute} is missing`
      );
    }
  });
}
