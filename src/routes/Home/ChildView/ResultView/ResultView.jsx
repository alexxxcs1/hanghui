import React, { Component } from "react";
import style from "./ResultView.scss";
import bkg from "./imgs/bkg.jpg";
import darklogo from "./imgs/darklogo.png";
import lightlogo from "./imgs/lightlogo.png";
import ringball from "./imgs/ringball.png";
import ring from "./imgs/ring.png";
import { api } from "common/app";
import PropTypes from "prop-types";

export class ResultView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.createResultImage = this.createResultImage.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    if (this.props.info) {
      let formdata = new FormData();
      formdata.append("score", this.props.info.score);
      formdata.append("file", this.props.info.file);
      formdata.append("option", this.props.info.option);
      formdata.append("declaration", this.props.info.declaration);
      api.getResult(formdata).then(
        res => {
          if (res.code == 200) {
            this.createResultImage(res.data);
          } else {
            alert(res.msg);
            this.context.setStageStatus(4);
          }
        },
        err => {
          this.context.setStageStatus(4);
        }
      );
    }
  }
  refreshProps(props) {
    
  }
  createResultImage(info) {
    let ctx = this.refs.canvas.getContext("2d");
    let bkgs = new Image();
    bkgs.src = info.base64;
    bkgs.onload = () => {
      ctx.drawImage(bkgs, 0, 0);

      ctx.font = "35px Arial";
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 4;

      ctx.strokeText(
        info.name,
        parseInt(info.n_position.split(",")[0]),
        parseInt(info.n_position.split(",")[1]) + 36
      );
      ctx.fillText(
        info.name,
        parseInt(info.n_position.split(",")[0]),
        parseInt(info.n_position.split(",")[1]) + 36
      );
      if (info.declaration.length >= 7) {
        ctx.strokeText(
          info.declaration.slice(0, 7),
          parseInt(info.d_position.split(",")[0]),
          parseInt(info.d_position.split(",")[1]) + 36
        );
        ctx.strokeText(
          info.declaration.slice(7, info.declaration.length),
          parseInt(info.d_position.split(",")[0]),
          parseInt(info.d_position.split(",")[1]) + 72
        );
        ctx.fillText(
          info.declaration.slice(0, 7),
          parseInt(info.d_position.split(",")[0]),
          parseInt(info.d_position.split(",")[1]) + 36
        );
        ctx.fillText(
          info.declaration.slice(7, info.declaration.length),
          parseInt(info.d_position.split(",")[0]),
          parseInt(info.d_position.split(",")[1]) + 72
        );
      } else {
        ctx.strokeText(
          info.declaration,
          parseInt(info.d_position.split(",")[0]),
          parseInt(info.d_position.split(",")[1]) + 36
        );
        ctx.fillText(
          info.declaration,
          parseInt(info.d_position.split(",")[0]),
          parseInt(info.d_position.split(",")[1]) + 36
        );
      }
      setTimeout(() => {
        let data = this.refs.canvas.toDataURL("image/jpg");
        this.state.image = data;
        this.setState(this.state);
      }, 100);
    };
    this.setState(this.state);
  }
  render() {
    return (
      <div className={style.ViewBox}>
        <div className={style.Detial}>
          {this.state.image == null ? (
            [
              <div className={style.LoadingLogo}>
                <div className={style.Logos}>
                  <img src={darklogo} alt="" />
                  <img src={lightlogo} alt="" />
                </div>
                <div className={style.RingBall}>
                  <img src={ringball} alt="" />
                  <img src={ring} alt="" />
                </div>
              </div>,
              <div className={style.LoadingText}>Loading...</div>
            ]
          ) : (
            <img src={this.state.image} className={style.resultimg} alt="" />
          )}
        </div>
        <img src={bkg} className={style.bkg} alt="" />
        <canvas
          ref="canvas"
          width="750"
          height="1334"
          style={{ display: "none" }}
        />
      </div>
    );
  }
}
ResultView.contextTypes = {
  setStageStatus: PropTypes.func
};
export default ResultView;
