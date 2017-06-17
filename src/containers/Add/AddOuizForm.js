import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Checkbox from "material-ui/Checkbox";

export default class AddQuiz extends Component {
	quiz = {
		name: undefined,
		questions: []
	};
	constructor(props) {
		super(props);
		this.state = {
			updateFlag: false
		};
	}

	_addQuestionClick = () => {
		const newQuestion = {
			question: undefined,
			imageUrl: undefined,
			options: [],
			answerIndex: undefined
		};
		this.quiz.questions.push(newQuestion);
		this.setState({ updateFlag: !this.state.updateFlag });
		console.log("Quiz ==> ", this.quiz);
	};

	_deleteQuestion = index => {
		this.quiz.questions.splice(index, 1);
		this.setState({ updateFlag: !this.state.updateFlag });
	};

	_channgeQuestion = (questionIndex, value) => {
		this.quiz.questions[questionIndex].question = value;
		this.setState({ updateFlag: !this.state.updateFlag });
	};

	_changeImage = (questionIndex, value) => {
		this.quiz.questions[questionIndex].imageUrl = value;
		this.setState({ updateFlag: !this.state.updateFlag });
	};

	_changeOption = (questionIndex, answerIndex, value) => {
		this.quiz.questions[questionIndex].options[answerIndex] = value;
		this.setState({ updateFlag: !this.state.updateFlag });
	};

	_changeSelectedAnswer = (questionIndex, answerIndex) => {
		console.log("changeSelectedAnswer ", questionIndex, " ::: ", answerIndex);
		this.quiz.questions[questionIndex].answerIndex = answerIndex;
		this.setState({ updateFlag: !this.state.updateFlag });
	};

	render() {
		return (
			<div className={css(styles.container)}>
				<TextField hintText="Type Quiz Name" floatingLabelText="Quiz Name" />
				{this.quiz.questions.map((question, index) => {
					return (
						<QuestionForm
							key={index}
							index={index}
							question={question}
							deleteQuestion={this._deleteQuestion}
							changeAnswer={this._changeSelectedAnswer}
							changeQuestion={this._channgeQuestion}
							changeImage={this._changeImage}
							changeOption={this._changeOption}
						/>
					);
				})}
				<RaisedButton label="Add Question" primary={true} style={{ margin: 10 }} onClick={this._addQuestionClick} />

			</div>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		flexDirection: "column"
	},
	row: {
		display: "flex",
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	}
});

const radioButtonStyle = {
	width: 40,
	marginTop: 30
};

const QuestionForm = props => {
	const { question, index, deleteQuestion, changeQuestion, changeImage, changeOption, changeAnswer } = props;
	return (
		<div className={css(styles.container)}>
			<TextField hintText="Type Question" floatingLabelText="Question" onChange={(e, value) => changeQuestion(index, value)} />
			<TextField
				hintText="url of image you want to show"
				floatingLabelText="Image url"
				onChange={(e, value) => changeImage(index, value)}
			/>
			<div className={css(styles.row)}>
				<Checkbox
					value="Option1"
					label=""
					style={radioButtonStyle}
					checked={question.answerIndex == 1}
					onCheck={() => changeAnswer(index, 1)}
				/>
				<TextField hintText="Answer option 1" floatingLabelText="Option 1" onChange={(e, value) => changeOption(index, 1, value)} />
			</div>
			<div className={css(styles.row)}>
				<Checkbox
					value="Option2"
					label=""
					style={radioButtonStyle}
					checked={question.answerIndex == 2}
					onCheck={() => changeAnswer(index, 2)}
				/>
				<TextField hintText="Answer option 2" floatingLabelText="Option 2" onChange={(e, value) => changeOption(index, 2, value)} />
			</div>
			<div className={css(styles.row)}>
				<Checkbox
					value="Option3"
					label=""
					style={radioButtonStyle}
					checked={question.answerIndex == 3}
					onCheck={() => changeAnswer(index, 3)}
				/>
				<TextField hintText="Answer option 3" floatingLabelText="Option 3" onChange={(e, value) => changeOption(index, 3, value)} />
			</div>
			<div className={css(styles.row)}>
				<Checkbox
					value="Option4"
					label=""
					style={radioButtonStyle}
					checked={question.answerIndex == 4}
					onCheck={() => changeAnswer(index, 4)}
				/>
				<TextField hintText="Answer option 4" floatingLabelText="Option 4" onChange={(e, value) => changeOption(index, 4, value)} />
			</div>
			<RaisedButton label="Delete" secondary={true} style={{ margin: 10 }} onClick={() => deleteQuestion(index)} />
		</div>
	);
};
