// noinspection JSUnusedGlobalSymbols

const Decimal = require("decimal.js");
const ValidationResult = require("./validation-result");

/**
 * Matcher validates that string value represents a decimal number or null.
 * Decimal separator is always "."
 * In addition, it must comply to the rules described below.
 *
 * @param params - Matcher can take 0 to 2 parameters with following rules:
 * - no parameters: validates that number of digits does not exceed the maximum value of 11.
 * - one parameter: the parameter specifies maximum length of number for the above rule (parameter replaces the default value of 11)
 * - two parameters:
 *   -- first parameter represents the total maximum number of digits,
 *   -- the second parameter represents the maximum number of decimal places.
 *   -- both conditions must be met in this case.
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
   * Method takes decimal number and provide validations
   * @param {String} inputValue
   * @returns {ValidationResult}
   */
  match(inputValue) {
    if (inputValue === null) {
      return new ValidationResult();
    }
    const decimalNumber = this.getDecimalNumber(inputValue);

    return this._validateDecimalNumber(decimalNumber);
  }

  /**
   * @param {String} inputValue
   * @returns {Decimal|null} - returns Decimal object or null in case of invalid inputValue
   */
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
