import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import style from "./Home.scss";

import IndexView from "./ChildView/IndexView";
import PrefaceView from "./ChildView/PrefaceView";
import InfoView from "./ChildView/InfoView";
import QuestionView from "./ChildView/QuestionView";
import FileInput from "./ChildView/FileInput";
import ResultView from "./ChildView/ResultView";

import shareicon from "./img/shareicon.jpg";
import musicicon from "./img/musicicon.png";
import bkgmusic from "./bkgmusic.m4a";

import { api } from "common/app";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicon: true,
      userInfo: {},
      StageStatus: 0,
      LoginStatus: false
    };
    this.PageRoute = this.PageRoute.bind(this);
    this.HandleRoute = this.HandleRoute.bind(this);
    this.HandleData = this.HandleData.bind(this);
    this.HandleMusic = this.HandleMusic.bind(this);
  }
  getChildContext() {
    return {
      setStageStatus: this.HandleRoute,
      setUserInfo: this.HandleData
    };
  }
  componentDidMount() {
    this.isAuth();
    this.setShare();
    this.audioAutoPlay();
    document.body.addEventListener(
      "touchmove",
      function(e) {
        e.preventDefault();
      },
      false
    );
    document.body.addEventListener(
      "ondragstart",
      function(e) {
        return false;
      },
      false
    );
  }
  componentWillReceiveProps() {}
  HandleData(data) {
    Object.assign(this.state.userInfo, data);
    this.setState(this.state);
  }
  HandleRoute(status) {
    this.state.StageStatus = status;
    this.setState(this.state);
  }
  isAuth() {
    let self = this;
    api.isAuth().then(
      res => {
        if (res.code != 200) {
          api.getAuth(window.location.href).then(
            res => {
              if (res.code == 200) {
                window.location.href = res.data.url;
              } else {
                console.log(res.msg);
              }
            },
            err => {
              console.log(err);
            }
          );
        }
        self.state.LoginStatus = res.data.is_user ? true : false;
        self.setState(this.state);
      },
      err => {
        console.log(err);
      }
    );
  }
  setShare() {
    var share_url = window.location.href;
    var share_img =
      "http://h5.rup-china.com/hanhui/public/html/static/media/" +
      shareicon.split("/")[3];
    var share_title = "想了解你心中的神秘力量吗";
    var share_content = "2019瀚晖肿瘤药物事业部年会";
    api.getShare(window.location.href).then(
      response => {
        window.wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: response.appId, // 必填，公众号的唯一标识
          timestamp: response.timestamp, // 必填，生成签名的时间戳
          nonceStr: response.nonceStr, // 必填，生成签名的随机串
          signature: response.signature, // 必填，签名，见附录1
          jsApiList: [
            "chooseImage",
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "previewImage",
            "uploadImage",
            "checkJsApi",
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "hideMenuItems",
            "startRecord",
            "stopRecord",
            "onVoiceRecordEnd",
            "playVoice",
            "pauseVoice",
            "onVoicePlayEnd",
            "uploadVoice",
            "downloadVoice"
          ]
        });
        window.wx.ready(function() {
          window.wx.onMenuShareAppMessage({
            title: share_title, // 分享标题
            desc: share_content, // 分享描述
            link: share_url, // 分享链接
            imgUrl: share_img, // 分享图标
            type: "link", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });

          window.wx.onMenuShareTimeline({
            title: share_title, // 分享标题
            desc: share_content, // 分享描述
            link: share_url, // 分享链接
            imgUrl: share_img, // 分享图标
            type: "link", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });
        });
        window.wx.error(function(res) {});
      },
      err => {}
    );
  }
  audioAutoPlay() {
    var audio = this.refs.music;
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        audio.currentTime = 0.0;
        audio.play();
      },
      false
    );
    document.addEventListener(
      "YixinJSBridgeReady",
      function() {
        audio.currentTime = 0.0;
        audio.play();
      },
      false
    );
  }
  HandleMusic() {
    this.state.musicon = !this.state.musicon;
    if (this.state.musicon) {
      this.refs.music.play();
    } else {
      this.refs.music.pause();
    }
    this.setState(this.state);
  }
  PageRoute() {
    switch (this.state.StageStatus) {
      case 0:
        return <IndexView />;
      case 1:
        return <PrefaceView />;
      case 2:
        console.log(this.state.LoginStatus);
        if (this.state.LoginStatus) {
          this.state.StageStatus = 3;
          this.setState(this.state);
          break;
        }
        return <InfoView />;
      case 3:
        return <QuestionView />;
      case 4:
        return <FileInput info={this.state.userInfo} />;
      case 5:
        return <ResultView info={this.state.userInfo} />;
      default:
        return <IndexView />;
    }
  }

  render() {
    return (
      <div className={style.Box}>
        <div
          className={[
            style.musicIcon,
            this.state.musicon ? style.actIcon : ""
          ].join(" ")}
          onClick={this.HandleMusic}>
          <img src={musicicon} alt="" />
        </div>
        {this.PageRoute()}
        <audio
          src={bkgmusic}
          ref="music"
          style={{ display: "none" }}
          autoPlay
          loop
        />
      </div>
    );
  }
}
Home.childContextTypes = {
  setStageStatus: PropTypes.func,
  setUserInfo: PropTypes.func
};
export default Home;
