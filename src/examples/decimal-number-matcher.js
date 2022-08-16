// noinspection JSUnusedGlobalSymbols
const { Matcher } = require("uu_appg01_server").Validation;
const { ValidationResult } = require("uu_appg01_server").Validation;
const { Validator } = require("uu_appg01_server").Validation;
const Decimal = require("decimal.js");

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
 * Implemented according to https://uuapp.plus4u.net/uu-bookkit-maing01/2590bf997d264d959b9d6a88ee1d0ff5/book/page?code=validationsReferenceDocumentation_00
 */
class DecimalNumberMatcher extends Matcher {
  constructor(...params) {
    super("doubleNumberMatcher", ...params);
  }

  processParams(...params) {
    this.params = params;
  }

  match(numberStr, ctx, ...args) {
    let result = new ValidationResult();
    if (numberStr != null) {
      let number;
      try {
        number = new Decimal(numberStr);
      } catch (e) {
        result.addInvalidTypeError("doubleNumber.e001", "The value is not a valid decimal number.");
        return result;
      }
      let maxDigitsCount = this._maxDigitsCount();
      if (!this._digitsCountValid(number, maxDigitsCount)) {
        result.addInvalidTypeError("doubleNumber.e002", "The value exceeded maximum number of digits.");
      }
      if (this.params.length >= 2) {
        let maxDecimalPlacesCount = this.params[1];
        if (!this._decimalPlacesCountValid(number, maxDecimalPlacesCount)) {
          result.addInvalidTypeError("doubleNumber.e003", "The value exceeded maximum number of decimal places."
          );
        }
      }
    }
    return result;
  }

  _decimalPlacesCountValid(number, maxDecimalPlacesCount) {
    return (number.decimalPlaces() <= maxDecimalPlacesCount);
  }

  _maxDigitsCount() {
    if (this.params.length > 1) {
      return this.params[0];
    } else {
      return 11;
    }
  }

  _digitsCountValid(number, maxDigitsCount) {
    let digitsCount = number.precision(true);
    return (digitsCount <= maxDigitsCount);
  }
}
    module.exports = DecimalNumberMatcher;