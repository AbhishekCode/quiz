import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton';

import validate from './validate'
import asyncValidate from './asyncValidate';
const formWidth = '80%';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    style = {{width:formWidth}}
  />
)

const renderPasswordField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    type="password"
    errorText={touched && error}
    {...input}
    {...custom}
    style = {{width:formWidth}}
  />
)

const buttonStyle = {
  margin: 12
}

class QuizForm extends Component {

  _submit = () => {
    this.props.dispatch(this.props.handleSubmit(this.props.onSubmit));
  };

  render() {
    const { array: { push }, handleSubmit, pristine, reset, submitting } = this.props;
    return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Club Name</label>
        <Field name="clubName" key="clubName" component={clubName =>
          <div>
            <input type="text" {...clubName} placeholder="Club Name"/>
            {clubName.touched && clubName.error && <span>{clubName.error}</span>}
          </div>
        }/>
      </div>
      <FieldArray name="members" component={members =>
        <ul>
          <li>
            <button type="button" onClick={() => push('members', {})}>Add Member</button>
          </li>
          {members.map((member, memberIndex) =>
            <li key={memberIndex}>
              <button
                type="button"
                title="Remove Member"
                onClick={() => members.remove(memberIndex)}/>
              <h4>Member #{memberIndex + 1}</h4>
              <div>
                <label>First Name</label>
                <Field name={`${member}.firstName`} component={firstName =>
                  <div>
                    <input type="text" {...firstName} placeholder="First Name"/>
                    {firstName.touched && firstName.error && <span>{firstName.error}</span>}
                  </div>
                }/>
              </div>
              <div>
                <label>Last Name</label>
                <Field name={`${member}.lastName`} component={lastName =>
                  <div>
                    <input type="text" {...lastName} placeholder="Last Name"/>
                    {lastName.touched && lastName.error && <span>{lastName.error}</span>}
                  </div>
                }/>
              </div>
              <FieldArray name={`${member}.hobbies`} component={hobbies =>
                <ul>
                  <li>
                    <button type="button" onClick={() => hobbies.push()}>Add Hobby</button>
                  </li>
                  {hobbies.map((hobby, hobbyIndex) =>
                    <li key={hobbyIndex}>
                      <button
                        type="button"
                        title="Remove Hobby"
                        onClick={() => hobbies.remove(hobbyIndex)}/>
                      <div>
                        <Field name={hobby} component={hobbyProps =>
                          <div>
                            <input type="text" {...hobbyProps} placeholder={`Hobby #${hobbyIndex + 1}`}/>
                            {hobbyProps.touched && hobbyProps.error && <span>{hobbyProps.error}</span>}
                          </div>
                        }/>
                      </div>
                    </li>
                  )}
                  {hobbies.error && <li className="error">{hobbies.error}</li>}
                </ul>
              }/>
            </li>
          )}
        </ul>
      }/>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values
        </button>
      </div>
    </form>
    );
  }
};

export default reduxForm({
  form: 'QuizForm',  // a unique identifier for this form
  validate,
  asyncValidate
})(QuizForm)
