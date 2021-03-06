import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { browserHistory } from "react-router";

import QuizFrom from "./QuizForm";
import AddOuizForm from "./AddOuizForm";
import { addQuiz } from "../../redux/reducers/quiz";
import { routepath } from "../../utils/config";
const routePath = routepath();

class AddQuiz extends Component {
	constructor(props) {
		super(props);
	}

	_handleSubmit = (values, dispatch) => {
		browserHistory.push(routePath + "/home");
		const user = this.props.auth.getProfile();
		this.props.dispatch(addQuiz(values, user));
	};

	_home = () => {
		browserHistory.push(routePath + "/home");
	};

	render() {
		return (
			<div className={css(styles.container)}>
				<RaisedButton label={"Home"} primary={true} style={buttonStyle} onClick={this._home} />
				<span className={css(styles.heading)}>Add Quiz</span>
				<AddOuizForm onSubmit={this._handleSubmit} />
			</div>
		);
	}
}

const buttonStyle = {
	margin: 10
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		justyfyContent: "space-between",
		alignItems: "center",
		padding: 10
	},
	heading: {
		fontSize: 30,
		color: "#00BCD4",
		padding: 40
	}
});

function mapStateToProps(state) {
	return {};
}
export default connect(mapStateToProps)(AddQuiz);
