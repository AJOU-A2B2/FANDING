import React, { Component, useEffect, useRef, useState } from "react";
import {
  Button,
  CardText,
  Row,
  Col,
  Container,
  Input,
  Label,
  FormGroup,
  Form,
  ModalFooter,
  Modal,
} from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { BsPlus } from "react-icons/bs";
import { connect, useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import TopNavbar from "./TopNavbar";
import { storage } from "../../config/fbConfig";
import firebase from "firebase";
import { useFirestoreConnect } from "react-redux-firebase";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";
import DaumPostCode from "react-daum-postcode";
import { modify_mypage } from "../../store/actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
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
    backgroundColor: "#44b700",
    marginLeft: "120px",
    marginTop: "20px",
  },
}))(Avatar);

const style = {
  control: (base) => ({
    ...base,
    border: 1,
    // This line disable the blue border
    boxShadow: "none",
  }),
};

const MyAccount = (props) => {
  const uid = firebase.auth().currentUser ? props.auth.uid : null;

  console.log(uid);
  const dispatch = useDispatch();

  useFirestoreConnect([
    {
      collection: "users",
      where: [["user_uid", "==", uid]],
    },
  ]);

  const user = useSelector((state) => state.firestore.ordered.users);

  console.log(props);

  const classes = useStyles();
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState("");
  const [previewURL, setPreview] = useState(null);
  const [modify, setModify] = useState(false);
  const [artistSelect, setArtist] = useState("");
  const [fullAddress, setFullAdd] = useState(false);
  const [zoneCode, setZoneCode] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);

  const [inputs, setInputs] = useState({
    nickname: "",
    detailAddress: "",
    bank: "",
    accountNumber: "",
    accountName: "",
    artistSelect: "",
  });

  const options = [
    { value: "BTS", label: "BTS" },
    { value: "BLACKPINK", label: "BLACKPINK" },
    { value: "APINK", label: "APINK" },
    { value: "TXT", label: "TXT" },
    { value: "DAY6", label: "DAY6" },
    { value: "TWICE", label: "TWICE" },
    { value: "Stray Kids", label: "Stray Kids" },
    { value: "B1A4", label: "B1A4" },
    { value: "NU'EST", label: "NU'EST" },
    { value: "IDLE", label: "IDLE" },
    { value: "기타", label: "기타" },
  ];

  const animatedComponents = makeAnimated();

  const handleChangeSelect = (e) => {
    // console.log(e);
    setArtist(e);
  };

  const toggleNested = () => {
    setNestedModal(!nestedModal);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(inputs);
  };

  const hiddenFileInput = React.useRef();

  const handleImageChange = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleClick = (e) => {
    // alert("클릭");
    hiddenFileInput.current.click();
  };

  const handleModify = () => setModify(!modify);

  var nickname_check = false;
  const handleNickName = () => {
    // console.log(inputs.nickname)
    firebase
      .firestore()
      .collection("users")
      .where("nickname", "==", inputs.nickname)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, "=>", doc.data());
          console.log("Duplicate Appears");
          nickname_check = true;
        });
      })
      .then(() => {
        if (nickname_check === true) {
          alert("닉네임 중복입니다.");
        } else {
          dispatch(modify_mypage({ nickname: inputs.nickname }));
          alert("닉네임이 수정되었습니다.");
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  const data = {};
  const checkModify = (url) => {
    // console.log(url)
    if (url !== "" && url !== undefined) {
      Object.assign(data, { profile: url });
    }
    if (fullAddress !== false) {
      // console.log("실행");
      Object.assign(data, { addr: fullAddress });
    }
    if (zoneCode !== false) {
      Object.assign(data, { zipcode: zoneCode });
    }
    if (inputs.detailAddress) {
      Object.assign(data, { addr_detail: inputs.detailAddress });
    }
    if (inputs.bank) {
      Object.assign(data, { bank: inputs.bank });
    }
    if (inputs.accountName) {
      Object.assign(data, { accountName: inputs.accountName });
    }
    if (inputs.accountNumber) {
      Object.assign(data, { accountNumber: inputs.accountNumber });
    }
    if (artistSelect !== "") {
      Object.assign(data, { artistSelect: artistSelect });
    }

    console.log(data);
    dispatch(modify_mypage(data));
  };

  const handleAddress = (data) => {
    let AllAddress = data.address;
    let extraAddress = "";
    let zoneCodes = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      AllAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setFullAdd(AllAddress);
    setZoneCode(zoneCodes);
  };

  const handleSubmit = (e) => {
    if (window.confirm("변경사항을 저장하시겠습니까 ?") === true) {
      alert("등록되었습니다");
      e.preventDefault();
      console.log(e.target.value);
      if (file !== "") {
        const uploadTask = storage
          .ref(`profile/${firebase.auth().currentUser.email}`)
          .put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // const progress = Math.round(
            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // );
            // this.setState({progress: progress});
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("profile")
              .child(firebase.auth().currentUser.email)
              .getDownloadURL()
              .then((url) => {
                setUrl(url);
                console.log(url);
                setProfile(file.name);
                console.log(profile);
                checkModify(url);

                // dispatch(modify_mypage(inputs,url,fullAddress,zoneCode));
              })
              .then(() => {
                checkModify(url);
              });
          }
        );
      } else {
        // dispatch(modify_mypage(inputs,profile,fullAddress,zoneCode));
        checkModify();
      }
    } else {
      console.log(e.target);

      e.preventDefault();

      alert("취소되었습니다.");
    }
  };
  const handleCancel = () => {
    window.location.reload();
  };
  const handleClickDelete = () => {
    if (window.confirm("회원탈퇴를 진행 하시겠습니까?") === true) {
      var user = firebase.auth().currentUser;
      var userDoc = firebase.auth().currentUser.email;
      firebase
        .firestore()
        .collection("users")
        .doc(userDoc)
        .delete()
        .then(function () {
          console.log("delete succeslly");
        })
        .catch(function (error) {
          console.log("error", error.message);
        });
      user
        .delete()
        .then(function () {
          alert("회원탈퇴 처리 되었습니다.");
          window.location.href = "/";
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } else {
      alert("취소되었습니다.");
    }
  };
  const handleClickPasswordSearch = () => {
    if (user[0].user_email != "") {
      firebase
        .auth()
        .sendPasswordResetEmail(user[0].user_email)
        .then(function () {
          alert("비밀번호 재설정 이메일 전송되었습니다.");
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };
  if (props.auth.isLoaded && user !== undefined) {
    return (
      <>
        <section
          class="gallery5 mbr-gallery cid-sgtDmxvlJH"
          id="gallery5-q"
          style={{ paddingTop: "25px" }}
        >
          <Container>
            <Row>
              
              <Col>
              <TopNavbar />
                <SideBar />
                
              </Col>
              {/*<SideBar />*/}
              <Col>
                <div className={classes.root}>
                  <Row>
                    <Badge
                      overlap="circle"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <div>
                          <SmallAvatar
                            children={<BsPlus />}
                            onClick={handleClick.bind()}
                            style={{ cursor: "pointer" }}
                          />
                          <input
                            type="file"
                            id="profile"
                            ref={hiddenFileInput}
                            onChange={handleImageChange}
                            style={{ visibility: "hidden" }}
                          />
                        </div>
                      }
                    >
                      {file !== "" ? (
                        <Avatar
                          style={{
                            width: "150px",
                            height: "150px",
                            marginLeft: "100px",
                          }}
                          alt="Remy Sharp"
                          src={previewURL}
                        />
                      ) : user[0].profile ? (
                        <Avatar
                          style={{
                            width: "150px",
                            height: "150px",
                            marginLeft: "100px",
                          }}
                          alt="Remy Sharp"
                          src={user[0].profile}
                        />
                      ) : (
                        <Avatar
                          style={{
                            width: "150px",
                            height: "150px",
                            marginLeft: "100px",
                          }}
                          alt="Remy Sharp"
                        />
                      )}
                    </Badge>
                  </Row>
                </div>
                <Row>
                  <Col style={{ width: "732px", paddingTop: "30px" }}>
                    <CardText>
                      <b>이메일: {user[0].user_email}</b>
                      <Button
                        className="ml-3"
                        color="warning"
                        size="sm"
                        onClick={handleClickPasswordSearch}
                      >
                        비밀번호 수정
                      </Button>
                      <Button onClick={handleClickDelete}>회원 탈퇴</Button>
                    </CardText>
                    <CardText>
                      <b>닉네임</b>
                    </CardText>
                    {modify === true ? (
                      <div>
                        <Input name="nickname" onChange={handleChange} />
                        <Button onClick={handleModify}>닫기</Button>
                        <Button onClick={handleNickName}>완료</Button>
                      </div>
                    ) : (
                      <CardText>
                        {user[0].nickname}
                        <Button
                          className="ml-3"
                          color="warning"
                          size="sm"
                          onClick={handleModify}
                        >
                          수정
                        </Button>
                      </CardText>
 
                    )}

                    <CardText>
                      <b>선호 아티스트</b>
                    </CardText>
                    {
                      user[0].selectedArtist ?
                          <Select
                              styles={style}
                              id="artistSelect"
                              components={animatedComponents}
                              options={options}
                              menuPortalTarget={document.body}
                              style={{
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                              }}
                              isMulti
                              defaultValue={user[0].artistSelect.map(
                                  (artist) => artist
                              )}
                              onChange={handleChangeSelect}
                          />
                          :
                          <Select
                              styles={style}
                              id="artistSelect"
                              components={animatedComponents}
                              options={options}
                              menuPortalTarget={document.body}
                              style={{
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                              }}
                              isMulti
                              onChange={handleChangeSelect}
                          />


                    }


                    <CardText>
                      <b>배송지 정보</b>
                    </CardText>
                    <Button color="primary" onClick={toggleNested}>
                      우편번호 찾기
                    </Button>
                    <Modal isOpen={nestedModal} toggle={toggleNested}>
                      <Form>
                        {nestedModal ? (
                          <DaumPostCode
                            onComplete={handleAddress}
                            autoClose="true"
                            nestedModal={nestedModal}
                          />
                        ) : null}
                      </Form>
                      <ModalFooter>
                        <Button color="secondary" onClick={toggleNested}>
                          닫기
                        </Button>
                      </ModalFooter>
                    </Modal>

                    <FormGroup>
                      {user[0].zipcode ? (
                        zoneCode === false ? (
                          <Input
                            type="zoneCode"
                            name="zoneCode"
                            id="zoneCode"
                            placeholder={user[0].zipcode}
                            onChange={handleChange}
                          />
                        ) : (
                          <Input
                            type="zoneCode"
                            name="zoneCode"
                            id="zoneCode"
                            value={zoneCode}
                            onChange={handleChange}
                          />
                        )
                      ) : zoneCode === false ? (
                        <Input
                          type="zoneCode"
                          name="zoneCode"
                          id="zoneCode"
                          placeholder="우편번호"
                          onChange={handleChange}
                        />
                      ) : (
                        <Input
                          type="zoneCode"
                          name="zoneCode"
                          id="zoneCode"
                          value={zoneCode}
                          onChange={handleChange}
                        />
                      )}
                    </FormGroup>

                    <FormGroup>
                      {user[0].addr ? (
                        fullAddress === false ? (
                          <Input
                            type="fullAddress"
                            name="fullAddress"
                            id="fullAddress"
                            placeholder={user[0].addr}
                            onChange={handleChange}
                          />
                        ) : (
                          <Input
                            type="fullAddress"
                            name="fullAddress"
                            id="fullAddress"
                            value={fullAddress}
                            onChange={handleChange}
                          />
                        )
                      ) : fullAddress === false ? (
                        <Input
                          type="fullAddress"
                          name="fullAddress"
                          id="fullAddress"
                          placeholder="주소"
                          onChange={handleChange}
                        />
                      ) : (
                        <Input
                          type="fullAddress"
                          name="fullAddress"
                          id="fullAddress"
                          value={fullAddress}
                          onChange={handleChange}
                        />
                      )}
                    </FormGroup>
                    <FormGroup>
                      {user[0].addr_detail ? (
                        <Input
                          type="detailAddress"
                          name="detailAddress"
                          id="detailAddress"
                          placeholder={user[0].addr_detail}
                          onChange={handleChange}
                        />
                      ) : (
                        <Input
                          type="detailAddress"
                          name="detailAddress"
                          id="detailAddress"
                          placeholder="상세 주소를 입력하세요"
                          onChange={handleChange}
                        />
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label for="Refund">
                        <b>환불계좌정보입력</b>
                      </Label>
                      {user[0].bank ? (
                        <Input
                          type="bank"
                          name="bank"
                          id="bank"
                          placeholder={user[0].bank}
                          onChange={handleChange}
                        />
                      ) : (
                        <Input
                          type="bank"
                          name="bank"
                          id="bank"
                          placeholder="은행명"
                          onChange={handleChange}
                        />
                      )}
                    </FormGroup>
                    <FormGroup>
                      {user[0].accountNumber ? (
                        <Input
                          type="accountNumber"
                          name="accountNumber"
                          id="accountNumber"
                          placeholder={user[0].accountNumber}
                          onChange={handleChange}
                        />
                      ) : (
                        <Input
                          type="accountNumber"
                          name="accountNumber"
                          id="accountNumber"
                          placeholder="계좌번호"
                          onChange={handleChange}
                        />
                      )}
                    </FormGroup>
                    <FormGroup>
                      {user[0].accountName ? (
                        <Input
                          type="accountName"
                          name="accountName"
                          id="accountName"
                          placeholder={user[0].accountName}
                          onChange={handleChange}
                        />
                      ) : (
                        <Input
                          type="accountName"
                          name="accountName"
                          id="accountName"
                          placeholder="예금주명"
                          onChange={handleChange}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ position: "absolute", left: "25%" }}>
                  <Button onClick={handleSubmit}>변경사항 저장</Button>
                  <Button onClick={handleCancel}>취소</Button>
                </Row>
              </Col>

            </Row>
          </Container>
        </section>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    user_data: state.user_data,
  };
};

export default connect(mapStateToProps)(MyAccount);
