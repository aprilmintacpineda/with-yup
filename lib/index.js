"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _redefineStaticsJs = _interopRequireDefault(require("redefine-statics-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = function _default(createFormValues, createYupValidationScheme, WrappedComponent) {
  function Validator(props) {
    var _this = this;

    this.props = props;
    this.state = {
      formValues: createFormValues(),
      formErrors: {},
      formTouched: {}
    };
    this.yupValidationScheme = createYupValidationScheme();

    this.getFormErrors = function _callee(values) {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(_this.yupValidationScheme.validate(values, {
                abortEarly: false
              }));

            case 3:
              return _context.abrupt("return", {});

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _context.t0.inner.reduce(function (formErrors, error) {
                formErrors[error.path] = error.message;
                return formErrors;
              }, {}));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 6]]);
    };

    this.validateForm = function _callee2() {
      var formErrors, keys;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_this.getFormErrors(_this.state.formValues));

            case 2:
              formErrors = _context2.sent;
              keys = Object.keys(formErrors);

              _this.setState(_extends({}, _this.state, {
                formErrors: formErrors,
                formTouched: keys.reduce(function (formTouched, key) {
                  formTouched[key] = true;
                  return formTouched;
                }, {})
              }));

              return _context2.abrupt("return", keys.length > 0);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      });
    };

    this.setValuesAndErrors = function _callee3(params) {
      var newState;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!params.values && !params.errors)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              newState = _extends({}, _this.state);

              if (params.values) {
                Object.keys(params.values).forEach(function (key) {
                  newState.formValues[key] = params.values[key];
                });
              }

              if (params.errors) {
                Object.keys(params.errors).forEach(function (key) {
                  newState.formErrors[key] = params.errors[key];
                  newState.formTouched[key] = true;
                });
              }

              _this.setState(newState);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      });
    };

    this.setValue = function _callee4(key, value, skipValidation) {
      var _extends2, _extends3;

      var newState;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              newState = _extends({}, _this.state, {
                formValues: _extends({}, _this.state.formValues, (_extends2 = {}, _extends2[key] = value, _extends2)),
                formTouched: _extends({}, _this.state.formTouched, (_extends3 = {}, _extends3[key] = true, _extends3))
              });

              if (skipValidation) {
                _context4.next = 5;
                break;
              }

              _context4.next = 4;
              return regeneratorRuntime.awrap(_this.getFormErrors(newState.formValues));

            case 4:
              newState.formErrors = _context4.sent;

            case 5:
              _this.setState(newState);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      });
    };

    this.setTouched = function _callee5(key, skipValidation) {
      var _extends4;

      var newState;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              newState = _extends({}, _this.state, {
                formTouched: _extends({}, _this.state.formTouched, (_extends4 = {}, _extends4[key] = true, _extends4))
              });

              if (skipValidation) {
                _context5.next = 5;
                break;
              }

              _context5.next = 4;
              return regeneratorRuntime.awrap(_this.getFormErrors(newState.formValues));

            case 4:
              newState.formErrors = _context5.sent;

            case 5:
              _this.setState(newState);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      });
    };

    this.handleChange = function (ev) {
      if (process.env.NODE_ENV !== 'production' && !ev.target.name) throw new Error('Please specify `name` attribute to the input!');

      _this.setValue(ev.target.name, ev.target.value);
    };

    this.handleBlur = function (ev) {
      if (process.env.NODE_ENV !== 'production') {
        if (ev.type !== 'blur') throw new Error('handleBlur should only be called with onBlur event!');
        if (!ev.target.name) throw new Error('Please specify `name` attribute to the input!');
      }

      _this.setTouched(ev.target.name);
    };

    this.render = function () {
      return _react["default"].createElement(WrappedComponent, _extends({}, _this.props, _this.state, {
        handleChange: _this.handleChange,
        handleBlur: _this.handleBlur,
        validateForm: _this.validateForm,
        setValue: _this.setValue,
        setValuesAndErrors: _this.setValuesAndErrors,
        setTouched: _this.setTouched
      }));
    };

    return this;
  }

  Validator.prototype = _react["default"].Component.prototype;
  Validator.prototype.constructor = Validator;
  (0, _redefineStaticsJs["default"])(Validator, WrappedComponent);
  return Validator;
};

exports["default"] = _default;