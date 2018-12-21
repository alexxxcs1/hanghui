import React, { Component } from "react";
import style from "./QuestionView.scss";
import bkg from "./imgs/bkg.jpg";
import nextquestion from "./imgs/nextquestion.png";
import endquestion from "./imgs/endquestion.png";

import { api } from "common/app";
import PropTypes from "prop-types";

export class QuestionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      QuestionSteep: 0,
      UserAnswer: [],
      data: []
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.SelectAnswer = this.SelectAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.getQuestion();
  }
  refreshProps(props) {}
  getQuestion() {
    api.getQuestion().then(
      res => {
        if (res.code == 200) {
          this.state.data = res.data;
          let newAnswer = [];
          for (let z = 0; z < res.data.length; z++) {
            newAnswer.push(null);
          }
          this.state.newAnswer = newAnswer;
          this.setState(this.state);
        } else {
          alert(res.msg);
        }
      },
      err => {
        console.log("服务器错误");
      }
    );
  }
  createQuestion() {
    if (!this.state.data.length) return;
    let result = [];
    result.push(
      <div className={style.QuestionTittle}>
        （{this.state.QuestionSteep + 1}）
        {this.state.data[this.state.QuestionSteep].title}
      </div>
    );
    result.push(
      <div className={style.QuestionOptionBox}>
        {(() => {
          let child = [];
          let data = this.state.data[this.state.QuestionSteep].option;
          for (const key in data) {
            child.push(
              <div
                className={style.Option}
                onClick={this.SelectAnswer.bind(this, key)}>
                <div
                  className={[
                    style.OptionIcon,
                    this.state.UserAnswer[this.state.QuestionSteep] == key
                      ? style.ActOption
                      : ""
                  ].join(" ")}
                />
                {data[key].value}
              </div>
            );
          }
          return child;
        })()}
      </div>
    );
    return result;
  }
  SelectAnswer(key) {
    this.state.UserAnswer[this.state.QuestionSteep] = key;
    this.setState(this.state);
  }
  nextQuestion() {
    if (this.state.UserAnswer[this.state.QuestionSteep]) {
      if (this.state.QuestionSteep + 1 >= this.state.data.length) {
        let self = this;
        this.getResult((res)=>{
          self.context.setUserInfo(res);
          self.context.setStageStatus(4);
        });
      } else {
        this.state.QuestionSteep += 1;
      }
    } else {
      alert("请选择一个选项");
    }
    this.setState(this.state);
  }
  getResult(callback){
    let result = {
      score:0,
      option:[],
    }
    let userAnser = this.state.UserAnswer;
    for (let z = 0; z < userAnser.length; z++) {
      result.score += this.state.data[z].option[userAnser[z]].score;
      result.option.push({
        id:this.state.data[z].id,
        value:userAnser[z],
      })
    }
    callback(result);
  }
  render() {
    return (
      <div className={style.ViewBox}>
        <div className={style.Detial}>
          {this.createQuestion()}
          <div className={style.nextQuestion}>
            <img src={this.state.QuestionSteep + 1 >= this.state.data.length?endquestion:nextquestion} onClick={this.nextQuestion} alt="" />
          </div>
        </div>
        <img src={bkg} className={style.bkg} alt="" />
      </div>
    );
  }
}
QuestionView.contextTypes = {
  setStageStatus: PropTypes.func,
  setUserInfo: PropTypes.func,
};
export default QuestionView;
