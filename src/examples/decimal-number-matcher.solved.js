// noinspection JSUnusedGlobalSymbols
const { Matcher } = require("uu_appg01_server").Validation;
const { ValidationResult } = require("uu_appg01_server").Validation;
const Decimal = require("decimal.js");

const DEFAULT_MAX_NUM_OF_DIGITS = 11;

/**
 * Matcher validates that string value represents a decimal number or null.
 * Decimal separator is always "."
 * In addition, it must comply to the rules described below.
 *
 * @param params - Matcher can take 0 to 3 parameters with following rules:
 * - no parameters: validates that number of digits does not exceed the maximum value of 11.
 * - one parameter: the parameter specifies maximum length of number for the above rule (parameter replaces the default value of 11)
 * - two parameters:
 *   -- first parameter represents the total maximum number of digits,
 *   -- the second parameter represents the maximum number of decimal places.
 *   -- both conditions must be met in this case.
 * Implemented according to https://uuapp.plus4u.net/uu-bookkit-maing01/2590bf997d264d959b9d6a88ee1d0ff5/book/page?code=validationsReferenceDocumentation_00
 */
class DecimalNumberMatcher extends Matcher {
  constructor(...params) {
    super("decimalNumber", ...params);
  }

  processParams(...params) {
    if (params.length === 0) {
      this.maxNumOfDigits = DEFAULT_MAX_NUM_OF_DIGITS;
    } else if (params.length === 1) {
      this.maxNumOfDigits = params[0];
    } else if (params.length === 2) {
      this.maxNumOfDigits = params[0];
      this.maxDecimalPlaces = params[1];
    } else {
      throw new Error("Invalid number of parameters");
    }
  }

  match(value) {
    const validationResult = new ValidationResult();

    if (value === null) {
      return validationResult;
    }

    const decimalNumber = this._tryParseDecimalNumber(value);
    if (decimalNumber === null) {
      validationResult.addInvalidTypeError(
        "doubleNumber.e001",
        "The value is not a valid decimal number."
      );
      return validationResult;
    }

    if (this._isMaxNumberOfDigitsExceeded(decimalNumber)) {
      validationResult.addInvalidTypeError(
        "doubleNumber.e002",
        "The value exceeded maximum number of digits."
      );
    }

    if (this._isMaxDecimalPlacesExceeded(decimalNumber)) {
      validationResult.addInvalidTypeError(
        "doubleNumber.e003",
        "The value exceeded maximum number of decimal places."
      );
    }

    return validationResult;
  }

  _tryParseDecimalNumber(value) {
    try {
      return new Decimal(value);
    } catch (e) {
      return null;
    }
  }

  _isMaxNumberOfDigitsExceeded(decimalNumber) {
    return (
      this.maxNumOfDigits !== undefined &&
      decimalNumber.precision(true) > this.maxNumOfDigits
    );
  }

  _isMaxDecimalPlacesExceeded(decimalNumber) {
    return (
      this.maxNumOfDigits !== undefined &&
      decimalNumber.decimalPlaces() > this.maxDecimalPlaces
    );
  }
}

module.exports = DecimalNumberMatcher;
