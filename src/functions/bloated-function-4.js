// noinspection JSUnusedGlobalSymbols

const { Matcher } = require("uu_appg01_server").Validation;
const { ValidationResult } = require("uu_appg01_server").Validation;
const { Validator } = require("uu_appg01_server").Validation;

const MasterDataErrors = require("../errors/upload-master-data-error");

class _DoubleNumberMatcher extends Matcher {
  constructor(...params) {
    super("doubleNumberMatcher", ...params);
    this.params = params;
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
    let uuAppErrorMap = { Error: MasterDataErrors.UploadMasterData };

    if (value != null) {
      let split = value.toString().split(".");
      if (split.length < 2) {
        if (split[0].length > this.maxDigits) {
          this.result.addInvalidTypeError(
            "doubleNumberMatcher.e001",
            `The value must have max ${this.maxDigits} digits`
          );
          this.result.invalidValues = value;
          throw new MasterDataErrors.UploadMasterData.InvalidDtoIn(
            { uuAppErrorMap },
            { cause: this.result }
          );
        }
      } else {
        if (split[0].length + split[1].length > this.maxDigits) {
          this.result.addInvalidTypeError(
            "doubleNumberMatcher.e001",
            `The value must have max ${this.maxDigits} digits`
          );
          this.result.invalidValues = value;
          throw new MasterDataErrors.UploadMasterData.InvalidDtoIn(
            { uuAppErrorMap },
            { cause: this.result }
          );
        }

        if (this.maxScale && split[1].length > this.maxScale) {
          this.result.addInvalidTypeError(
            "doubleNumberMatcher.e002",
            `The value must have max ${this.maxDigits} digits (including max ${this.maxScale} after decimal point)`
          );
          this.result.invalidValues = value;
          throw new MasterDataErrors.UploadMasterData.InvalidDtoIn(
            { uuAppErrorMap },
            { cause: this.result }
          );
        }
      }
    }

    this.valid = true;
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
