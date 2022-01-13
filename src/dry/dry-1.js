/**
 * Validates all required attributes of product are set
 * @param {*} product
 */
function validateProduct(product) {
  if (!product.color) {
    throw new Error("Import fail: the product attribute color is missing");
  }

  if (!product.size) {
    throw new Error("Import fail: the product attribute size is missing");
  }

  if (!product.type) {
    throw new Error("Import fail: the product attribute type is missing");
  }
}
