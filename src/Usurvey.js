import React, { Component } from "react";
import firebase from "firebase";
var uuid = require("uuid");
var firebaseConfig = {
  apiKey: "AIzaSyDIqh9Fak7sADk2aQk_S7g0v4AFsNV68a8",
  authDomain: "usurvey-f281b.firebaseapp.com",
  databaseURL: "https://usurvey-f281b-default-rtdb.firebaseio.com",
  projectId: "usurvey-f281b",
  storageBucket: "usurvey-f281b.appspot.com",
  messagingSenderId: "1014496046992",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class Usurvey extends Component {
  nameSubmit(event) {
    var studentName = this.refs.name.value;
    this.setState({ studentName }, function () {
      console.log(this.state);
    });
  }
  answerSelected(event) {
    var answers = this.state.answers;
    if (event.target.name === "answer1") {
      answers.answer1 = event.target.value;
    } else if (event.target.name === "answer2") {
      answers.answer2 = event.target.value;
    } else if (event.target.name === "answer3") {
      answers.answer3 = event.target.value;
    }
    this.setState({ answers }, function () {
      console.log(answers);
    });
  }
  questionSubmit() {
    firebase
      .database()
      .ref("uSurvey/" + this.state.uid)
      .set({
        studentName: this.state.studentName,
        answers: this.state.answers,
      });
    this.setState({ isSubmitted: true });
  }
  constructor(props) {
    super(props);
    this.state = {
      uid: uuid.v1(),
      studentName: "",
      answers: {
        answer1: "",
        answer2: "",
        answer3: "",
      },
      isSubmitted: false,
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }
  state = {};
  render() {
    var studentName;
    var questions;
    if (this.state.studentName === "" && this.state.isSubmitted === false) {
      studentName = (
        <div>
          <h1>Hey Student, Please enter your name:</h1>
          <form onSubmit={this.nameSubmit}>
            <input
              className="namy"
              type="text"
              placeholder="Enter Name"
              ref="name"
            />
          </form>
        </div>
      );
      questions = "";
    } else if (
      this.state.studentName !== "" &&
      this.state.isSubmitted === false
    ) {
      studentName = <h1>Welcome to U-Survey {this.state.studentName}</h1>;
      questions = (
        <div>
          <h2> Here are some questions:</h2>
          <form onSubmit={this.questionSubmit}>
            <div className="card">
              <label>
                What kind of courses would you like to learn in 2021?
              </label>
              <input
                type="radio"
                name="answer1"
                value="React"
                onChange={this.answerSelected}
              />
              React
              <input
                type="radio"
                name="answer1"
                value="Javascript"
                onChange={this.answerSelected}
              />
              JavaScript
              <input
                type="radio"
                name="answer1"
                value="Typescript"
                onChange={this.answerSelected}
              />
              TypeScript
            </div>
            <div className="card">
              <label>You are :</label>
              <input
                type="radio"
                name="answer2"
                value="Student"
                onChange={this.answerSelected}
              />
              Student
              <input
                type="radio"
                name="answer2"
                value="Employee"
                onChange={this.answerSelected}
              />
              Employee
              <input
                type="radio"
                name="answer2"
                value="Freelancer"
                onChange={this.answerSelected}
              />
              FreeLancer
            </div>
            <div className="card">
              <label>Which job would you prefer?</label>
              <input
                type="radio"
                name="answer3"
                value="Full"
                onChange={this.answerSelected}
              />
              Full-Time
              <input
                type="radio"
                name="answer3"
                value="Full"
                onChange={this.answerSelected}
              />
              Part-Time
              <input
                type="radio"
                name="answer3"
                value="Contract"
                onChange={this.answerSelected}
              />
              Contract
            </div>
            <input className="feedback-button" type="submit" value="submit" />
          </form>
        </div>
      );
    } else if (
      this.state.studentName !== "" &&
      this.state.isSubmitted === true
    ) {
      studentName = (
        <h1>Thanks {this.state.studentName} for completing our survey!</h1>
      );
    }

    return (
      <div>
        {studentName}
        -------------------------
        {questions}
      </div>
    );
  }
}

export default Usurvey;
