import React, { Component } from "react";
import style from "./InfoView.scss";
import bkg from "./imgs/bkg.jpg";
import diamond from './imgs/diamond.png'
import diamondtext from './imgs/diamondtext.png'
import gobutton from './imgs/gobutton.png'
import PropTypes from "prop-types";

import {api} from 'common/app'

export class InfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      id:'',
      sex:null,
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.HandleSex = this.HandleSex.bind(this);
    this.next = this.next.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  HandleInputValue(type,e){
    switch (type) {
      case 'name':
        
        break;
      case 'id':
        e.target.value = e.target.value.replace(/[^0-9xX]/, "");
        break;
    }
    this.state[type] = e.target.value;
    this.setState(this.state);
  }
  HandleSex(sex){
    this.state.sex = sex;
    this.setState(this.state);
  }
  next(){
    if(!this.state.name||!this.state.id||this.state.sex==null){
      alert('请您填写完整的信息')
    }else{
      api.Login(this.state.name.slice(0, 5),this.state.id,(this.state.sex+1)).then(res=>{
        if (res.code == 200) {
          this.context.setStageStatus(3);
        }else{
          alert(res.msg)
        }
      })
      
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
          <div className={[style.DiamondBox,style.BaseAnimBox].join(' ')} style={{backgroundImage:'url('+diamond+')'}}>
            <img src={diamondtext} className={style.DiamondText} alt=""/>
          </div>
          <div className={[style.TextBox,style.BaseAnimBox].join(' ')}>
            <div className={style.BaseText}>你是天才发明家<span className={style.Size1}>钢铁侠</span></div>
            <div className={style.BaseText}>还是攻无不克的<span className={style.Size1}>神奇女侠</span></div>
            <div className={style.BaseText}>来看看你和哪位</div>
            <div className={style.BaseText}><span className={style.Size2}>超级英雄最为</span><span className={style.Size3}>契合</span></div>
          </div>
          <div className={[style.FormBox,style.BaseAnimBox].join(' ')}>
            <div className={style.InputGroup}>
              <div className={style.InputBox}>
                <input type="text" placeholder='名字' onBlur={this.onInputBlur} value={this.state.name} onChange={this.HandleInputValue.bind(this,'name')}/>
              </div>
              <div className={style.InputBox}>
                <input type="tel" placeholder='工号' onBlur={this.onInputBlur} value={this.state.id} onChange={this.HandleInputValue.bind(this,'id')}/>
              </div>
            </div>
            <div className={style.nextButton} onClick={this.next}>
              <img src={gobutton} alt=""/>
            </div>
          </div>
          <div className={[style.sexSelect,style.BaseAnimBox].join(' ')}>
            <div className={style.Option} onClick={this.HandleSex.bind(this,0)}>
              <div className={[style.OptionIcon,this.state.sex == 0?style.ActOption:''].join(' ')}></div>
              男
            </div>
            <div className={style.Option} onClick={this.HandleSex.bind(this,1)}>
              <div className={[style.OptionIcon,this.state.sex == 1?style.ActOption:''].join(' ')}></div>
              女
            </div>
          </div>
        </div>
        <img src={bkg} className={style.bkg} alt="" />
      </div>
    );
  }
}
InfoView.contextTypes = {
  setStageStatus: PropTypes.func,
};
export default InfoView;
