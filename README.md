# with-yup

React validator HOC integrated with yup.js

```
npm i -S with-yup redefine-statics-js
```

# Usage

The idea behind this is to abstract the form states, validations, errors away from react component and have react component itself only focused on the rendering of the UI instead of putting all the state and error handling in it which could get messy in the long run.

The example below shows a login form with `email` and `password` as part of the form state which has been abstracted out of the component itself.

```jsx
import React from 'react';
import withYup from 'with-yup';
import * as yup from 'yup';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

class ReactComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      submitting: false,
      result: null
    };
  }

  async submit () {
    try {
      if (this.state.submitting) return;

      this.setState({
        submitting: true,
        result: null
      });
    } catch (error) {
      console.error(error);

      this.setState({
        submitting: false,
        result: false
      });
    }
  }

  render () {
    console.log('form values', this.props.formValues);
    console.log('form errors', this.props.formErrors);

    // you can use this to identify if a field has been touched or not
    // then conditionally show the error based on that
    console.log('form touched', this.props.touched);

    return (
      <Paper>
        <Box p={2}>
          {this.state.result === false ? (
            <Typography color="error">
              Email and/or password are/is incorrect.
            </Typography>
          ) : null}
          <Box mb={2}>
            <TextField
              value={this.props.formValues.email}
              error={Boolean(this.props.formErrors.email && this.props.formTouched.email)}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              label="email"
              type="email"
              {/* name is important as it is what the handleChange callback is using to identify this field */}
              name="email"
              disabled={this.state.submitting}
              fullWidth
            />
            {this.props.formErrors.email && this.props.formTouched.email ? (
              <Typography color="error">{this.props.formErrors.email}</Typography>
            ) : null}
          </Box>
          <Box mb={2}>
            <TextField
              value={this.props.formValues.password}
              error={Boolean(this.props.formErrors.password && this.props.formTouched.password)}
              {/* handleChange can handle events with event.target.value and event.target.name */}
              onChange={this.props.handleChange}
              {/* handleBlur is required if you want to set the touched when the user clicks away */}
              onBlur={this.props.handleBlur}
              label="password"
              type="password"
              {/* name is important as it is what the handleChange callback is using to identify this field */}
              name="password"
              disabled={this.state.submitting}
              fullWidth
            />
            {this.props.formErrors.password && this.props.formTouched.password ? (
              <Typography color="error">{this.props.formErrors.password}</Typography>
            ) : null}
          </Box>
          <Button
            color="primary"
            variant="outlined"
            onClick={this.submit}
            disabled={this.state.submitting}>
            {this.state.submitting ? (
              <CircularProgress size={20} />
            ) : 'Login'}
          </Button>
      </Paper>
    );
  }
}
```
