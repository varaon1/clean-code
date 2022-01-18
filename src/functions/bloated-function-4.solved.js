// noinspection JSUnusedGlobalSymbols

const { Matcher } = require("uu_appg01_server").Validation;
const { ValidationResult } = require("uu_appg01_server").Validation;
const { Validator } = require("uu_appg01_server").Validation;
const Decimal = require("decimal.js");

class _DoubleNumberMatcher extends Matcher {
  constructor(...params) {
    super("doubleNumberMatcher", ...params);
    this.params = params;
  }

  processParams(...params) {
    if (params.length === 0) {
      this.maxCharacters = 11;
    } else if (params.length === 1) {
      this.maxCharacters = params[0];
    } else if (params.length === 2) {
      this.precision = params[0]; //whole number count
      this.scale = params[1]; //decimal places
    } else {
      throw new Error("Number of parameters exceeded.");
    }
  }

  match(value) {
    let result = new ValidationResult();
    if (value != null && this._isNumberInvalid(value)) {
      result.addInvalidTypeError(
        "state.e002",
        "The value exceeded maximum of allowed characters."
      );
    }
    return result;
  }

  _isNumberInvalid(value) {
    let invalid = false;
    if (this.maxCharacters !== undefined) {
      invalid = value.toString().length > this.maxCharacters;
    } else if (this.precision !== undefined && this.scale !== undefined) {
      invalid = this._isNumberOutsideRanges(value);
    }
    return invalid;
  }

  _isNumberOutsideRanges(value) {
    let number = new Decimal(value);
    return (
      number.decimalPlaces() > this.scale || number.precision() > this.precision
    );
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
