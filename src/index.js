import React from 'react';
import redefineStatics from 'redefine-statics-js';

export default (createFormValues, createYupValidationScheme, WrappedComponent) => {
  function Validator (props) {
    this.props = props;
    this.state = {
      formValues: createFormValues(),
      formErrors: {},
      formTouched: {}
    };
    this.yupValidationScheme = createYupValidationScheme();

    this.getFormErrors = async values => {
      try {
        await this.yupValidationScheme.validate(values, {
          abortEarly: false
        });

        return {};
      } catch (validationErrors) {
        return validationErrors.inner.reduce((formErrors, error) => {
          formErrors[error.path] = error.message;
          return formErrors;
        }, {});
      }
    };

    this.validateForm = async () => {
      const formErrors = await this.getFormErrors(this.state.formValues);
      const keys = Object.keys(formErrors);

      this.setState({
        ...this.state,
        formErrors,
        formTouched: keys.reduce((formTouched, key) => {
          formTouched[key] = true;
          return formTouched;
        }, {})
      });

      return keys.length > 0;
    };

    this.setValuesAndErrors = async params => {
      if (!params.values && !params.errors) return;

      const newState = { ...this.state };

      if (params.values) {
        Object.keys(params.values).forEach(key => {
          newState.formValues[key] = params.values[key];
        });
      }

      if (params.errors) {
        Object.keys(params.errors).forEach(key => {
          newState.formErrors[key] = params.errors[key];
          newState.formTouched[key] = true;
        });
      }

      this.setState(newState);
    };

    this.setValue = async (key, value, skipValidation) => {
      const newState = {
        ...this.state,
        formValues: {
          ...this.state.formValues,
          [key]: value
        },
        formTouched: {
          ...this.state.formTouched,
          [key]: true
        }
      };

      if (!skipValidation) newState.formErrors = await this.getFormErrors(newState.formValues);
      this.setState(newState);
    };

    this.setTouched = async (key, skipValidation) => {
      const newState = {
        ...this.state,
        formTouched: {
          ...this.state.formTouched,
          [key]: true
        }
      };

      if (!skipValidation) newState.formErrors = await this.getFormErrors(newState.formValues);
      this.setState(newState);
    };

    this.handleChange = ev => {
      if (process.env.NODE_ENV !== 'production' && !ev.target.name)
        throw new Error('Please specify `name` attribute to the input!');

      this.setValue(ev.target.name, ev.target.value);
    };

    this.handleBlur = ev => {
      if (process.env.NODE_ENV !== 'production') {
        if (ev.type !== 'blur') throw new Error('handleBlur should only be called with onBlur event!');
        if (!ev.target.name) throw new Error('Please specify `name` attribute to the input!');
      }

      this.setTouched(ev.target.name);
    };

    this.render = () => (
      <WrappedComponent
        {...this.props}
        {...this.state}
        handleChange={this.handleChange}
        handleBlur={this.handleBlur}
        validateForm={this.validateForm}
        setValue={this.setValue}
        setValuesAndErrors={this.setValuesAndErrors}
        setTouched={this.setTouched}>
      </WrappedComponent>
    );

    return this;
  }

  Validator.prototype = React.Component.prototype;
  Validator.prototype.constructor = Validator;

  redefineStatics(Validator, WrappedComponent);

  return Validator;
};
