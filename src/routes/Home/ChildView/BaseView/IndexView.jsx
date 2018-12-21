import React, { Component } from "react";
import style from "./IndexView.scss";
import bkg from "./imgs/bkg.jpg";

export class IndexView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refreshProps = this.refreshProps.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  render() {
    return (
      <div className={style.ViewBox}>
        <div className={style.Detial}>IndexView</div>
        <img src={bkg} className={style.bkg} alt="" />
      </div>
    );
  }
}
export default IndexView;
