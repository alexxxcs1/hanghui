import React, { Component } from "react";
import style from "./PrefaceView.scss";
import PropTypes from "prop-types";
import bkg from "./imgs/bkg.jpg";
import clicktips from "./imgs/clicktips.png";
import people from "./imgs/people.png";
import light from "./imgs/light.png";

export class PrefaceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cannext:false,
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.next = this.next.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    setTimeout(() => {
      this.state.cannext = true;
      this.setState(this.state)
    }, 1800);
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  next(){
    if (!this.state.cannext) return;
    this.context.setStageStatus(2);
  }
  render() {
    return (
      <div className={style.ViewBox} onClick={this.next}>
        <div className={style.Detial}>
          <div className={style.basetext}>每个人心中都有一个英雄梦</div>
          <div className={style.basetext}>是鲜衣怒马，还是变身超人</div>
          <div className={style.basetext}>这次我们将邀请你参加</div>
          <div className={style.basetext}>瀚晖制药ONC BU年会</div>
          <div className={style.basetext}>来做自己的<span>专属</span>超级英雄</div>
          <img src={clicktips} className={style.ClikcTips} alt=""/>
        </div>
        <img src={people} className={style.people} alt=""/>
        <img src={light} className={style.light} alt=""/>
        <img src={bkg} className={style.bkg} alt="" />
      </div>
    );
  }
}
PrefaceView.contextTypes = {
  setStageStatus: PropTypes.func,
};
export default PrefaceView;
