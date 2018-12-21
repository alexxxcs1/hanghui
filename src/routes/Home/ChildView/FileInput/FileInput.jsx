import React, { Component } from "react";
import style from "./FileInput.scss";
import bkg from "./imgs/bkg.jpg";
import { api } from "common/app";
import PropTypes from "prop-types";

import warchartline from "./imgs/warchartline.png";
import warchart1 from "./imgs/warchart1.png";
import warchart2 from "./imgs/warchart2.png";
import warchart3 from "./imgs/warchart3.png";
import warchart4 from "./imgs/warchart4.png";
import warchart5 from "./imgs/warchart5.png";
import warchart6 from "./imgs/warchart6.png";

import infotext1 from "./imgs/infotext1.png";
import infotext2 from "./imgs/infotext2.png";
import infotext3 from "./imgs/infotext3.png";
import infotext4 from "./imgs/infotext4.png";
import infotext5 from "./imgs/infotext5.png";
import infotext6 from "./imgs/infotext6.png";

const warchartArray = [
  warchart1,
  warchart2,
  warchart3,
  warchart4,
  warchart5,
  warchart6
];
const textArray = [
  infotext1,
  infotext2,
  infotext3,
  infotext4,
  infotext5,
  infotext6
];

export class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      rank: 0,
      msg: "",
      option: ["A", "A", "C", "D"]
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.HandleInputValue = this.HandleInputValue.bind(this);
    this.openFileInput = this.openFileInput.bind(this);
    this.Submit = this.Submit.bind(this);
    this.filechange = this.filechange.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  HandleInputValue(type, e) {
    if (e.target.value.length > 16) {
      e.target.value = e.target.value.slice(0, 16);
    }
    this.state[type] = e.target.value;
    this.setState(this.state);
  }
  refreshProps(props) {
    if (this.props.info.option) {
      this.state.option = this.props.info.option;
    }
    if (this.props.info.score) {
      let score = this.props.info.score;
      if (score >= 4 && score <= 7) {
        this.state.rank = 0;
      } else if (score >= 8 && score <= 9) {
        this.state.rank = 1;
      } else if (score >= 10 && score <= 11) {
        this.state.rank = 2;
      } else if (score >= 12 && score <= 13) {
        this.state.rank = 3;
      } else if (score >= 14 && score <= 15) {
        this.state.rank = 4;
      } else if (score >= 16 && score <= 18) {
        this.state.rank = 5;
      }
    }
    this.setState(this.state);
  }
  openFileInput() {
    this.refs.file.click();
  }
  Submit() {
    if ((!this.refs.file)) {
      alert('请上传人脸清晰的照片');
      return;
    }
    let data = {
      file: this.refs.file.files[0],
      declaration: this.state.msg
    };
    this.context.setUserInfo(data);
    this.context.setStageStatus(5);
    // let formdata = new FormData();
    // let file = this.refs.file.files[0];
    // formdata.append("file", file);
    // formdata.append("score", 10);
    // // formdata.append("option", this.state.option);
    // formdata.append("declaration", this.state.msg);
    // api.getResult(formdata).then(res=>{
    //   console.log(res);

    // },err=>{
    //   console.log(err);

    // })
  }
  filechange(e) {
    if (!this.refs.file.value) return;
    if (window.FileReader) {
      let self = this;
      var reader = new FileReader();
      var file = this.refs.file.files[0];
      reader.onload = function(e) {
        self.state.file = e.target.result;
        self.setState(self.state);
      };
      reader.readAsDataURL(file);
    } else {
      alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
    }
  }
  onInputBlur() {
    var scrollTop =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop;
    document.documentElement.scrollTop = 0;
    window.pageYOffset = 0;
    document.body.scrollTop = 0;
  }
  render() {
    return (
      <div className={style.ViewBox}>
        <div className={style.Detial}>
          <div className={style.WarChart}>
            <img src={warchartline} className={style.WarchartLine} alt="" />
            <img
              src={warchartArray[this.state.rank]}
              className={style.WarchartPic}
              alt=""
            />
          </div>
          <div className={style.UserInfoBox}>
            <div className={style.InfoTop}>
              <div className={style.InfoType}>
                <img
                  src={textArray[this.state.rank]}
                  className={style.RankInfo}
                  alt=""
                />
              </div>
              <div className={style.InputPic} onClick={this.openFileInput}>
                {this.state.file ? (
                  <div className={style.fileimg}>
                    <img src={this.state.file} alt="" />
                  </div>
                ) : (
                  [<div className={style.AddIcon} />, <div>添加照片</div>]
                )}
                <input
                  type="file"
                  className={style.File}
                  onChange={this.filechange}
                  accept="image/*"
                  ref="file"
                />
              </div>
            </div>
            <div className={style.InfoBot}>
              <div className={style.MessageInput}>
                <input
                  type="text"
                  value={this.state.msg}
                  placeholder="输入英雄宣言……"
                  onChange={this.HandleInputValue.bind(this, "msg")}
                  onBlur={this.onInputBlur}
                />
              </div>
            </div>
            <div className={style.SubmitButton} onClick={this.Submit}>
              提交
            </div>
          </div>
        </div>
        <img src={bkg} className={style.bkg} alt="" />
      </div>
    );
  }
}
FileInput.contextTypes = {
  setStageStatus: PropTypes.func,
  setUserInfo: PropTypes.func
};
export default FileInput;
