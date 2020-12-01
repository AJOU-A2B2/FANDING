import React, {Component, useEffect, useRef, useState} from 'react';
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CardImg, CardBody,
CardSubtitle, 
Container, CustomInput, Input} from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {BsPlus} from 'react-icons/bs'
import classnames from 'classnames';
import TabPane3 from './TabPane3';
import MyFunding from "./MyFunding";
import MyRecruit from "./MyRecruit";
import {connect, useSelector} from 'react-redux';
import MyParticipation from "./MyParticipation";
import SideBar from "./SideBar"
import {storage} from "../../config/fbConfig";
import firebase from "firebase";
import {useFirestoreConnect} from "react-redux-firebase";

// useFirestoreConnect([{
//   collection: 'users',
//   where:[
//     ["uid","==",firebase.auth().currentUser.uid]
//   ]
// }]);
//
// const participations=useSelector((state)=>state.firestore.ordered.participation);
// console.log(participations);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 50,
    height: 50,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: '#44b700',
    marginLeft: "90px",
    marginTop: "20px"
  },
}))(Avatar);

const MyAccount = (props) => {
// console.log(props)

  const [activeTab, setActiveTab] = useState("1");
  const classes = useStyles();
  const [profile,setProfile]=useState(null);
  const [url,setUrl]=useState("");
  const [file,setFile]=useState("");
  const [previewURL, setPreview]=useState(null);

  let myfunding=null;

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);

  };
  //리스트 만들기

  const hiddenFileInput=React.useRef();

  const handleChange=(e)=>{
    e.preventDefault();
    console.log(e.target.files[0]);
    let reader = new FileReader();
    let file= e.target.files[0];
    reader.onloadend=()=>{
      setFile(file);
      setPreview(reader.result)
    };
    reader.readAsDataURL(file);
  };
  const handleClick=(e)=>{
    // alert("클릭");
    hiddenFileInput.current.click();
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(file!==""){
      const uploadTask = storage.ref(`profile/${firebase.auth().currentUser.email}`).put(file);
      uploadTask.on(
          "state_changed",
          snapshot => {
            // const progress = Math.round(
            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // );
            // this.setState({progress: progress});
          },
          error => {
            console.log(error);
          },
          () => {
            storage
                .ref("profile")
                .child(firebase.auth().currentUser.email)
                .getDownloadURL()
                .then(url => {
                  setUrl(url);
                  console.log(url);
                  setProfile(file.name);
                  console.log(profile);
                  // this.props.firebase_funding_save(this.state)
                  // this.setState({redirectToReferrer: true})

                })
          }
      )
    }
  };
  const handleCancel=()=>{

    window.location.reload();

  };

  if(props.auth.isLoaded){

    return (
      <>
      
      <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
      <Container>
        <Row>
          <SideBar />
          <Col>
            <div className={classes.root}>
              <Row>
                <Badge overlap="circle" anchorOrigin={{vertical:'bottom', horizontal: 'right'}}
                       badgeContent={
                         <div>
                           <SmallAvatar children={<BsPlus/>} onClick={handleClick.bind()} style={{cursor:'pointer'}}/>
                           <input type="file" id="profile" ref={hiddenFileInput} onChange={handleChange} style={{visibility:"hidden"}}/>
                         </div>
                       }>

                  {
                    file!=="" ?
                      <Avatar style={{  width: "150px", height: "150px"}} alt="Remy Sharp" src={previewURL}/>
                      :
                        <Avatar style={{  width: "150px", height: "150px"}} alt="Remy Sharp"/>
                  }

                </Badge>
                <Col>
                  닉네임
                </Col>
              </Row>
            </div>
          </Col>
          <Col>
            <Row>
              <Button onClick={handleSubmit}>변경사항 저장</Button>
              <Button onClick={handleCancel}>취소</Button>

            </Row>
          </Col>
          <div>
          <h4 style={{paddingTop: '28px', paddingLeft:'25px'}}>내 정보에서는 프로필 관리, 펀딩 관리, 총대 인증을 하고 위시 리스트를 볼 수 있습니다. </h4>
          </div>
        </Row>

          {/*<Nav tabs>*/}
          {/*  <NavItem>*/}
          {/*    <NavLink*/}
          {/*        className={classnames({ active: activeTab === '1' })}*/}
          {/*        onClick={() => { toggle('1'); }}*/}
          {/*    >*/}
          {/*      내 정보 관리*/}
          {/*    </NavLink>*/}
          {/*  </NavItem>*/}
          {/*  <NavItem>*/}
          {/*    <NavLink*/}
          {/*        className={classnames({ active: activeTab === '2' })}*/}
          {/*        onClick={() => { toggle('2'); }}*/}
          {/*    >*/}
          {/*      총대 인증*/}
          {/*    </NavLink>*/}
          {/*  </NavItem>*/}
          {/*  <NavItem>*/}
          {/*    <NavLink*/}
          {/*        className={classnames({ active: activeTab === '3' })}*/}
          {/*        onClick={() => { toggle('3'); }}*/}
          {/*    >*/}
          {/*      내가 만든 펀딩 관리*/}
          {/*    </NavLink>*/}
          {/*  </NavItem>*/}
          {/*  <NavItem>*/}
          {/*    <NavLink*/}
          {/*        className={classnames({ active: activeTab === '4' })}*/}
          {/*        onClick={() => { toggle('4'); }}*/}
          {/*    >*/}
          {/*      참여한 펀딩*/}
          {/*    </NavLink>*/}
          {/*  </NavItem>*/}
          {/*  <NavItem>*/}
          {/*    <NavLink*/}
          {/*        className={classnames({ active: activeTab === '5' })}*/}
          {/*        onClick={() => { toggle('5'); }}*/}
          {/*    >*/}
          {/*      내가 만든 업체 모집글 관리*/}
          {/*    </NavLink>*/}
          {/*  </NavItem>*/}
          {/*  <NavItem>*/}
          {/*    <NavLink*/}
          {/*        className={classnames({ active: activeTab === '6' })}*/}
          {/*        onClick={() => { toggle('6'); }}*/}
          {/*    >*/}
          {/*      마이 위시리스트*/}
          {/*    </NavLink>*/}
          {/*  </NavItem>*/}
          {/*</Nav>*/}
          {/*<TabContent activeTab={activeTab}>*/}
          {/*  <TabPane tabId="1">*/}
          {/*    <Row>*/}
          {/*      <Col sm="12">*/}
          {/*        <h4>Tab 1 Contents</h4>*/}
          {/*      </Col>*/}
          {/*    </Row>*/}
          {/*  </TabPane>*/}
          {/*  <TabPane tabId="2">*/}
          {/*    <Row>*/}
          {/*      <Col sm="6">*/}
          {/*        <Card body>*/}
          {/*          <CardTitle>본인 인증</CardTitle>*/}
          {/*          <CardText>펀딩을 생성하려면 본인 인증이 필요합니다.</CardText>*/}
          {/*          <Button color="warning">본인 인증</Button>*/}
          {/*        </Card>*/}
          {/*      </Col>*/}
          {/*    </Row>*/}
          {/*  </TabPane>*/}
          {/*  <TabPane tabId="3">*/}
          {/*    <MyFunding></MyFunding>*/}
          {/*  </TabPane>*/}
          {/*  <TabPane tabId="4">*/}
          {/*    <MyParticipation/>*/}
          {/*  </TabPane>*/}
          {/*  <TabPane tabId="5">*/}
          {/*    <MyRecruit></MyRecruit>*/}
          {/*  </TabPane>*/}
          {/*</TabContent>*/}
        </Container>
        </section>
        </>

    );

  }else{
    return(
      <div>Loading...</div>
    )
  }
}



const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth,
    user_data: state.user_data
  }
};

export default connect(
    mapStateToProps
)(MyAccount);
