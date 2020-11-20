import React, {Component} from 'react';
import { Button, Col, Form, FormGroup, Label, Input, FormText, CustomInput, Container } from 'reactstrap';
import { Link } from "react-router-dom";
import {BsStop} from "react-icons/bs"
import { connect } from 'react-redux';
import {firebase_funding_save} from '../../store/actions/formActions';
import {storage} from "../../config/fbConfig";
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
//toast-ui
import { Editor } from '@toast-ui/react-editor';
import { Viewer } from '@toast-ui/editor/dist/toastui-editor-viewer';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntaxPlugin from '@toast-ui/editor-plugin-color-syntax';
import hljs from "highlight.js";
import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight';
//chart plugin
import 'tui-chart/dist/tui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';

const style = {
    control: base => ({
      ...base,
      border: 1,
      // This line disable the blue border
        boxShadow: 'none',
    })
  };

class CreateFunding extends Component{

    constructor(props) {
        super(props);
        this.state={
            image:null,
            url:"",
            progress:0,
            artistSelect: '',
            fundingType: '',
            fundingTitle: '',
            fundingStartDate: '',
            fundingEndDate: '',
            fundingStartTime: '',
            fundingEndTime: '',
            fundingPeriodLimit: '',
            // thumbnailImage: '',
            detailText: '',
            itemTitle:'',
            itemPrice:'',
            itemLimitBox:'',
            itemRemain:'',
            itemLimit:'',
            shippingMethod:'',
            shippingFee:'',
            shippingDetail:'',
            redirectToReferrer: false,
            content: '',
            options: [
                {name:'없음', id:0},
                {name:'BTS', id:1},
                {name:'BLACKPINK', id:2},
                {name:'APINK', id:3},
                {name:'TXT', id:4},
                {name:'DAY6', id:5},
                {name:'TWICE', id:6},
                {name:'Stray Kids', id:7},
                {name:'B1A4', id:8},
                {name:"NU'EST", id:9},
                {name:'IDLE', id:10},
                {name:'기타', id:11},
            ],
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        
        
        
    }
    options=[
        {value:'BTS', label:"BTS"},
        {value:'BLACKPINK', label:"BLACKPINK"},
        {value: "APINK", label:"APINK"},
        {value: "TXT", label:"TXT"},
        {value: "DAY6", label:"DAY6"},
        {value: "TWICE", label:"TWICE"},
        {value: "Stray Kids", label:"Stray Kids"},
        {value: "B1A4", label:"B1A4"},
        {value: "NU'EST", label:"NU'EST"},
        {value: "IDLE", label:"IDLE"},
        {value: "기타", label:"기타"},
    ];

    animatedComponents =makeAnimated();

    handleImageChange = e => {

        if (e.target.files[0]) {
            this.setState({image: e.target.files[0]});
        }

    }
    

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value,
        });
        console.log(e.target.value);
    };
    handleChangeSelect = e => {
        this.setState({
            artistSelect:e
        });
    };
    handleRadioChange = e => {
        this.setState({
            fundingType: e.target.value
        });
        console.log(this.state.fundingType);
    }
    
    handleChangeEditor = e =>
    {
        const content = this.editorRef.current.getInstance().getHtml();
        console.log("I am editor" + content)

        this.setState({
            content: content
        });
    }
    handleSubmit = e => {


        e.preventDefault();
        
        console.log(this.state.content);

        if(this.state.image!=null){
            const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    this.setState({progress: progress});
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(this.state.image.name)
                        .getDownloadURL()
                        .then(url => {
                            this.setState({url:url});
                            console.log(this.state.url)
                            // console.log(this.state);
                            this.setState({image:this.state.image.name})
                            console.log(this.state);
                            this.props.firebase_funding_save(this.state)
                            this.setState({redirectToReferrer: true})

                        })
                }
            )
        }
        else{
            this.props.firebase_funding_save(this.state);
            this.setState({redirectToReferrer: true})

        }

        
    };

    editorRef = React.createRef();


    render()
    {

       
        
        if(this.state.redirectToReferrer===true){
            alert("펀딩이 생성되었습니다.");
           return  <Redirect to='/' />
        }
        return (
            <>
             <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
             <div className="mbr-section-head" style={{paddingBottom: '30px'}}>
                        <h3 className="mbr-section-title mbr-fonts-style align-center m-0 pb-30 mb-10 display-2"><strong>펀딩 생성하기</strong></h3>
                        
            </div>
            <Container
            style={{backgroundColor:"#fafafa", borderRadius:"10px", padding:"3em 2em"}}>

            <Form>
                {/*<FormGroup>*/}
                {/*<Label for="artistSelect">아티스트</Label>*/}
                {/*<CustomInput type="select" id="artistSelect" name="customSelect" onChange={this.handleChange} multiple>*/}
                {/*    {*/}
                {/*        this.state.options.map((e,key) => {*/}
                {/*            return <option value={e.value}>{e.name}</option>;*/}
                {/*        })*/}
                {/*        */}
                {/*    }*/}
                {/*    */}
                {/*</CustomInput>*/}
                {/*</FormGroup>*/}
                <FormGroup>
                    <Label><strong>아티스트</strong></Label>
                    <Select
                    styles={style} 
                    id="artistSelect" components={this.animatedComponents} options={this.options} menuPortalTarget={document.body} style={{menuPortal:base=>({...base,zIndex:9999})}} onChange={this.handleChangeSelect}/>
                </FormGroup>


                <FormGroup className="mt-5">
                    <Label for="Radio"><strong>펀딩 유형 선택</strong></Label>
                    <div>
                    <CustomInput
                    type="radio" id="fundingType" value = "reward" name="customRadio" label="리워드형 펀딩"
                    checked={this.state.fundingType === 'reward'} 
                    onChange={this.handleRadioChange}
                    
                    inline/>
                    
                    <CustomInput type="radio" id="fundingType2" value="collect" name="customRadio" label="모금형 펀딩"   
                    checked={this.state.fundingType === 'collect'} 
                    onChange={this.handleRadioChange}
                    inline/>
                </div>        
                    
                </FormGroup>
                
                <FormGroup className="mt-5">
                    <Label for="fundingTitle"><strong>펀딩 제목</strong></Label>
                    <Input type="text" name="title" id="fundingTitle" 
                    placeholder="펀딩 제목을 입력하세요"
                    onChange={this.handleChange}/>
                </FormGroup>
                </Form>

                <Label for="startDate" className="mt-5"><strong>펀딩 기간</strong>(입금 기간)</Label>
                <Form inline>
                    <FormGroup >
                        
                        <Input
                            type="date"
                            name="date"
                            id="fundingStartDate"
                            placeholder="펀딩 시작일"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="time"
                            name="time"
                            id="fundingStartTime"
                            placeholder="00:00"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Label for="wave" className="mx-auto"><strong>~</strong></Label>
                    <FormGroup >
                        <Input
                            type="date"
                            name="date"
                            id="fundingEndDate"
                            placeholder="펀딩 종료일"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="time"
                            name="time"
                            id="fundingEndTime"
                            placeholder="00:00"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                </Form>

                <Form className="mt-5">
                    <FormGroup>
                        <Label for="fileBrowser"><strong>썸네일 이미지</strong>(size: 350*250)</Label>
                        <CustomInput type="file" id="thumbnailImage" name="customFile"
                                     label="이미지를 업로드 하세요"
                                     onChange={this.handleImageChange}
                        />


                    </FormGroup>
                </Form>
                <Form className="mt-5">
                    <FormGroup>
                        <Label for="detailText"><strong>상세 설명</strong></Label>
                       {/* <Input type="textarea" name="text" id="detailText" onChange={this.handleChange}/>*/} 
                        <Editor
                        previewStyle="vertical"
                        height="400px"
                        initialEditType="wysiwyg"
                        initialValue="상세 설명을 입력하세요"
                        ref={this.editorRef}
                        plugins= {[codeSyntaxHighlightPlugin.bind(hljs), colorSyntaxPlugin, chart]}
                        onChange = {this.handleChangeEditor}
                        />
                

                        {/* <div id="toastEditor">
                            <h1>Toast UI Editor Example</h1>
                            <div id="editSection"></div> */}
                            {/*<button onClick={this.saveArticle} className="btn_save">Save</button>*/}
                            {/* <button onChange={this.handleChangeEditor} className="btn_save">Save</button>
                            <div>
                                <h2>result</h2>
                                <textarea className="tf_result" value={this.state.content} readOnly="readOnly"></textarea>
                            </div>
                        </div>   */}

                        
                    </FormGroup>
                </Form>

                <Label for="itemInfo" className="mt-5"><strong>상품정보</strong></Label>
                <Form inline>

                    <FormGroup>
                        <Label className="mr-1" for="itemTitle">상품명</Label>
                        <Input type="text" name="title" id="itemTitle" placeholder="" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="ml-2 mr-1" for="itemPrice">가격</Label>
                        <Input type="text" name="title" id="itemPrice" placeholder="" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="ml-2 mr-1" for="itemRemain">재고</Label>
                        <Input type="text" name="title" id="itemRemain" placeholder="" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup className="mt-3">
                        <CustomInput className="mr-2" type="checkbox" id="itemLimitBox" label="구매개수 제한" onChange={this.handleChange} />
                        <Input type="text" name="title" id="itemLimit" placeholder="예)2개" onChange={this.handleChange}/>
                    </FormGroup>
                    {/*상품추가 버튼 만들기*/}
                </Form>

                <Label for="shipping" className="mt-5"><strong>배송</strong></Label>
                <Form inline>
                    <FormGroup>
                        <Label className="mr-2" for="shippingMethod">배송방법</Label>
                        <Input type="text" name="title" id="shippingMethod"
                               placeholder="예)택배, 준등기"
                               onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="ml-5">
                        <Label for="shippingFee">배송비</Label>
                        <Input type="text" name="title" id="shippingFee"
                               placeholder="0"
                               onChange={this.handleChange}
                        />
                    </FormGroup>
                </Form>

                <Form className="mb-10">
                    <Label for="shippingDetail">배송 안내</Label>
                    <Input  type="textarea" name="text" id="shippingDetail"
                           onChange={this.handleChange}
                    />
                </Form>
                {/*배송방법추가 버튼 만들기*/}


                <Form className="mt-10" onSubmit={this.handleSubmit} >
                    {/*<Link to='/'>*/}

                    {/*    <Button color="warning" size="lg" block onChange={this.handleClick}>폼 만들기</Button>*/}
                    {/*</Link>*/}
                    <Button color="warning" size="lg" block >펀딩 만들기</Button>
                </Form>
            </Container>
            </section>
            </>

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
        firebase_funding_save: (funding) => dispatch(firebase_funding_save(funding)) //creds -> funding
    };
};

export default connect(
    mapStateToProps, //null로 고치면 어떻게 되나?
    mapDispatchToProps,
)(CreateFunding);