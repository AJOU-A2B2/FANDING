import React, {Component} from 'react';
import { Button, Form, Input, Label } from 'reactstrap';
import { Link } from "react-router-dom";
import {connect,useSelector} from 'react-redux';
import {firestoreConnect, useFirestoreConnect} from 'react-redux-firebase';
import firebase from 'firebase/app';
import ReactHtmlParser from 'react-html-parser';
import { storage } from 'firebase';
import axios from 'axios';
import {verifyChongdae} from '../../store/actions/chongdaeAction';

class Account_auth extends Component{

  
    constructor(props) {
        super(props);
        
        this.state = {
          access_token: '',
          refresh_token: '',
          user_seq_no: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      componentDidMount(){
        let currentComponent = this;
        token(currentComponent);
      }

      handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value,
        });
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
    
        console.log(this.state.access_token);
        this.props.verifyChongdae(this.state)
        alert("본인인증이 완료되었습니다.")
      };

      
    render()
    {
        return(
          <div>
            <h5>본인 인증</h5>
            <Form onSubmit = {this.handleSubmit}>
              <h5>사용자 정보</h5>
              <Label>Access Token</Label>
              <Input type="text" id="access_token" 
              placeholder={this.state.access_token} onChange={this.handleChange}/>
              <Label>Refresh Token</Label>
              <Input type="text" id="refresh_token" 
              placeholder={this.state.refresh_token} onChange={this.handleChange} />
              <Label>User Number</Label>
              <Input type="text" id="user_seq_no" 
              placeholder={this.state.user_seq_no} onChange={this.handleChange} />
              <Button id='verifyButton' onClick={finishVerify} >인증 완료</Button>
            </Form>
            
          </div>
        )
    }
}

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      verifyChongdae: (creds) => dispatch(verifyChongdae(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account_auth);

async function token(currentComponent){
  console.log(window.location.href);
  if(getQueryStringObjectToken()){
    var authCode = getQueryStringObjectToken()
    axios.post('/api/token',{
      code: authCode
    })
    .then((res)=>{
      if(res.data.rsp_code){
      var errCode = res.data.rsp_code
      console.log(`arror: ${errCode}`)

      currentComponent.setState({
        access_token: 'error',
        refresh_token: 'error',
        user_seq_no: 'error'
      })

      }
      else{
      var accesstoken = res.data.access_token
      console.log(`access_token: ${accesstoken}`)
      var refreshtoken = res.data.refresh_token
      console.log(`refresh_token: ${refreshtoken}`)
      var userseqno = res.data.user_seq_no
      console.log(`user_seq_no: ${userseqno}`)
      
      currentComponent.setState({
        access_token: accesstoken,
        refresh_token: refreshtoken,
        user_seq_no: userseqno
      })
     }
    })
    .catch(function(error){
      console.log(error);
    })
  }
  else{
    alert("본인인증에 실패했습니다. 다시 인증하세요.");
    window.location.href = "http://localhost:3000/chongdae";
  }
}

function getQueryStringObjectToken(){
  var a = window.location.href.split('&');
  if(a=="") return {};
  var p = a[0].split('=',2);
  //console.log(p[1]);
  return p[1];
}

function finishVerify(){
  alert("본인인증이 완료되었습니다.");
  window.location.href = "http://localhost:3000/";
}