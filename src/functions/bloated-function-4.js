// noinspection JSUnusedGlobalSymbols
const { Matcher } = require("uu_appg01_server").Validation;
const { ValidationResult } = require("uu_appg01_server").Validation;
const { Validator } = require("uu_appg01_server").Validation;
const MasterDataErrors = require("../errors/upload-master-data-error");

/**
 * Double number matcher implemented according to https://uuapp.plus4u.net/uu-bookkit-maing01/2590bf997d264d959b9d6a88ee1d0ff5/book/page?code=validationsReferenceDocumentation_00
 *
 * @param params - Matcher can take 0 to 3 parameters with following rules:
 * - no parameters: validates that string length of decimal number (including decimal separator) does not exceed the maximum value of 11.
 * - one parameter: the parameter specifies maximum length of number for the above rule (parameter replaces the default value of 11)
 * - two parameters:
 *   -- first parameter represents the maximum number of digits of the whole part,
 *   -- the second parameter represents the maximum number of decimal places.
 *   -- both conditions must be met in this case.
 * Decimal separator is always "."
 * The value can also be null, it is considered as valid then
 */
class _DoubleNumberMatcher extends Matcher {
  constructor(...params) {
    super("doubleNumberMatcher", ...params);
  }

  processParams(...params) {
    if (params.length < 1) {
      this.maxDigits = 11;
    } else if (params.length < 2) {
      this.maxDigits = params[0];
    } else {
      this.maxDigits = params[0];
      this.maxScale = params[1];
    }
  }

  match(value, ctx, ...args) {
    this.result = new ValidationResult();

    if (value != null) {
      let split = value.toString().split(".");
      if (split.length < 2) {
        if (split[0].length > this.maxDigits) {
          this.result.addInvalidTypeError(
            "doubleNumberMatcher.e001",
            `The value must have max ${this.maxDigits} digits`
          );
        }
      } else {
        if (split[0].length + split[1].length > this.maxDigits) {
          this.result.addInvalidTypeError(
            "doubleNumberMatcher.e001",
            `The value must have max ${this.maxDigits} digits`
          );
        }

        if (this.maxScale && split[1].length > this.maxScale) {
          this.result.addInvalidTypeError(
            "doubleNumberMatcher.e002",
            `The value must have max ${this.maxDigits} digits (including max ${this.maxScale} after decimal point)`
          );
        }
      }
    }

    return this;
  }
}

function DoubleNumberMatcher(...params) {
  let matcher = new _DoubleNumberMatcher(...params);
  if (this && this.matchers && this.matchers[0]) {
    this.matchers.push(matcher);
    return this;
  } else {
    let validator = new Validator();
    validator._loadMatchers();
    validator.matchers = [matcher];
    return validator;
  }
}

const { MatcherStore } = require("uu_appg01_server").Validation;
MatcherStore.registerMatcher("doubleNumber", DoubleNumberMatcher);

module.exports = DoubleNumberMatcher;
