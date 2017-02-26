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

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}/>
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
            <Field name="quizName" component={renderTextField} label="Quiz Name"/>
            <FieldArray name="questions" component={questions=> this._renderQuestionFrom(questions)} />
            <div>
                <RaisedButton type="submit" label="submit" primary={true} disabled={pristine || submitting} onClick={this._submit} style={buttonStyle} />
                <RaisedButton type="submit" label="Clear Values" primary={true} disabled={pristine || submitting} onClick={reset} style={buttonStyle} />
            </div>
        </form>
    );
  }
   
  _renderQuestionFrom = (questions) => {
      console.log("Questions ", questions)
      return (
        <div>
           <RaisedButton label="Add Question" onClick={() => questions.fields.push('questions', {})} style={buttonStyle} />
           {questions && questions.fields && questions.fields.map((question, index) => this._renderQuestion(question, index))}
        </div>
      );
  }

  _renderQuestion = (question, index) =>{
    return (
       <div key={"div"+index}>
           <Field name={`${question}.question`} key={"question"+index} component={renderTextField} label="Question"/>
           <Field name={`${question}.imageURL`} key={"imageURL"+index} component={renderTextField} label="Image Url"/>
           <FieldArray name={`${question}.options`} key={"options"+index} component={options=> this._renderAnswerForm(options)} />
           <Field name={`${question}.answer`} key={"answer"+index} component={renderTextField} label="Answer number"/>
       </div>
    );
  }

  _renderAnswerForm = (options) =>{
     return(
        <div>
           <RaisedButton label="Add Answer" onClick={() => options.fields.push('options', {})} style={buttonStyle} />
           {options && options.fields && options.fields.map((option, index) => this._renderAnswerOption(option, index))}
        </div>
     );
  }

   _renderAnswerOption= (option, index) =>{
    return (
       <div key={"div"+index}>
           <Field name={`${option}`} value={""} key={"option"+index} component={renderTextField} label={`option ${index+1}`}/>
       </div>
    );
  }

};

export default reduxForm({
  form: 'QuizForm',  // a unique identifier for this form
  validate,
  asyncValidate
})(QuizForm)
