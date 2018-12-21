import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./IndexView.scss";
import bkg from "./imgs/bkg.jpg";
import fingerprint from "./imgs/fingerprint.png";


let longtouch = null;

export class IndexView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onTouch: false
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.longpress = this.longpress.bind(this);
    this.touchstart = this.touchstart.bind(this);
    this.touchmove = this.touchmove.bind(this);
    this.touchend = this.touchend.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  longpress() {
    this.context.setStageStatus(1);
  }
  touchstart() {
    this.state.onTouch = true;
    this.setState(this.state);
    longtouch = setTimeout(() => {
      this.longpress();
    }, 500);
  }
  touchmove() {
    this.state.onTouch = false;
    this.setState(this.state);
    clearTimeout(longtouch);
  }
  touchend() {
    this.state.onTouch = false;
    this.setState(this.state);
    clearTimeout(longtouch);
  }
  render() {
    return (
      <div className={style.ViewBox}>
        <div className={style.Detial}>
          <div className={style.RowText}>一封来自魔都总部的神秘邀约</div>
          <div
            style={{ backgroundImage: "url(" + fingerprint + ")" }}
            className={[
              style.fingerprintBox,
              this.state.onTouch ? style.startscan : ""
            ].join(" ")}
            onTouchMove={this.touchmove}
            onTouchStart={this.touchstart}
            onTouchEnd={this.touchend}
          />
          <div className={[style.RowText,style.clickTips].join(' ')}>长按指纹</div>
        </div>
        <img src={bkg} className={style.bkg} alt="" />
      </div>
    );
  }
}
IndexView.contextTypes = {
  setStageStatus: PropTypes.func,
};
export default IndexView;
