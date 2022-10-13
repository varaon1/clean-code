// noinspection JSUnusedGlobalSymbols

const Decimal = require("decimal.js");
const ValidationResult = require("./validation-result");

/**
 * Matcher validates that string value represents a decimal number or null.
 */
class DecimalNumberMatcher {
  /**
   * Constructor with optional params
   * @param {Number} maxTotalDigits - optional param with default value: 11
   * @param {Number} maxDecimalDigits - optional param without default value
   */
  constructor(maxTotalDigits = 11, maxDecimalDigits) {
    this.maxTotalDigits = maxTotalDigits;
    this.maxDecimalDigits = maxDecimalDigits;
  }

  /**
   * Enum for common errors
   * @readonly
   * @enum {{code: string, message: string}}
   */
  Errors = Object.freeze({
    INVALID_DECIMAL_NUMBER: { code: "doubleNumber.e001", message: "The value is not a valid decimal number." },
    MAX_DIGITS_EXCEEDED: { code: "doubleNumber.e002", message: "The value exceeded maximum number of digits." },
    MAX_DECIMAL_PLACES_EXCEEDED: { code: "doubleNumber.e003", message: "The value exceeded maximum number of decimal places." },
  });

  /**
   * Method takes number and provide validations.
   * Decimal separator is always "."
   * @param {String} inputValue
   * @returns {ValidationResult}
   */
  match(inputValue) {
    if (inputValue === null) {
      return new ValidationResult();
    }
    return this._validateDecimalNumber(this.getDecimalNumber(inputValue));
  }

  /**
   * @param {String} inputValue
   * @returns {Decimal|null} - returns Decimal object or null in case of invalid inputValue
   */
  //TODO move to NumberHelper
  getDecimalNumber(inputValue) {
    let decimalNumber;
    try {
      decimalNumber = new Decimal(inputValue);
    } catch (e) {
      decimalNumber = null;
    }
    return decimalNumber;
  }

  /**
   * @param {Decimal} decimalNumber
   * @returns {ValidationResult}
   * @private
   */
  _validateDecimalNumber(decimalNumber) {
    const result = new ValidationResult();
    if (decimalNumber === null) {
      result.addInvalidTypeError(this.Errors.INVALID_DECIMAL_NUMBER.code, this.Errors.INVALID_DECIMAL_NUMBER.message);
      return result;
    }
    if (this._isMaxTotalDigitsExceeded(decimalNumber)) {
      result.addInvalidTypeError(this.Errors.MAX_DIGITS_EXCEEDED.code, this.Errors.MAX_DIGITS_EXCEEDED.message);
    }
    if (this._isMaxDecimalPlacesExceeded(decimalNumber)) {
      result.addInvalidTypeError(this.Errors.MAX_DECIMAL_PLACES_EXCEEDED.code, this.Errors.MAX_DECIMAL_PLACES_EXCEEDED.message);
    }
    return result;
  }

  _isMaxTotalDigitsExceeded(decimalNumber) {
    return decimalNumber.precision(true) > this.maxTotalDigits;
  }

  _isMaxDecimalPlacesExceeded(decimalNumber) {
    return decimalNumber && decimalNumber.decimalPlaces() > this.maxDecimalDigits;
  }
}

module.exports = DecimalNumberMatcher;
