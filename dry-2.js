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

/**
 * Validates all required attributes of priced product are set
 * @param {*} pricedProduct
 */
function validatePricedProduct(pricedProduct) {
  if (!pricedProduct.color) {
    throw new Error("Import fail: the product attribute color is missing");
  }

  if (!pricedProduct.size) {
    throw new Error("Import fail: the product attribute size is missing");
  }

  if (!pricedProduct.type) {
    throw new Error("Import fail: the product attribute type is missing");
  }

  if (!pricedProduct.price) {
    throw new Error("Import fail: the product attribute price is missing");
  }
}
