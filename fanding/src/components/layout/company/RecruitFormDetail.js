import React, {Component} from 'react';
import { connect } from 'react-redux'
import {firestoreConnect, isLoaded} from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import {
    Card,
    CardImg,
    CardTitle,
    CardSubtitle,
    CardText,
    CardBody,
    Container,
    Row,
    Col,
    Button,
    Progress,
    Form, FormGroup, Label, Input
} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//import { Viewer } from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Editor, Viewer} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { BsHeart, BsChatSquareDots } from "react-icons/bs";
import {FaShareAlt} from "react-icons/fa";
import "./company.css"

//import moment from 'moment';
let imgStyle = {
    maxHeight: '400px',
    maxWidth: '400px'
  }
  
class RecruitFormDetail extends Component{

  constructor(props){
    super(props);
    this.state = {
      recruitCompany: this.props.recruitCompany,
        comments:"",
        render:"",
        modal: false
    };
      this.toggle = this.toggle.bind(this);
  }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }


  viewerRef = React.createRef();


  handleCommentChange=(e)=>{
      this.setState({
          [e.target.id]: e.target.value,
      });
      console.log(e.target.value);
  }

    handleClick=(Comp,e)=>{
      this.setState({render:Comp});
    }

    handleChange=(e)=>{

    }

    handleSubmit=(e)=>{

    }
    renderComments(){
      switch(this.state.render) {
          case 'comments': return <Comments comments={this.state.comments}/>

      }
    }
  render(){

    const {recruitCompany}=this.props;
    
    if(isLoaded(recruitCompany) && recruitCompany)
    {
      return(
        <>
        <Container>
          
         <div className="text-center"><h2><b>{recruitCompany.itemTitle}</b></h2></div>
        <Row xs="2">
          <Col>
              <CardImg top width="10%" src={recruitCompany.itemImage} style={imgStyle} alt="Card image cap" />
              <CardText>예상 가격대 : 개당 {recruitCompany.itemPrice}원</CardText>
              <CardText>예상 개수 : {recruitCompany.itemRemain}</CardText>
          </Col>


            <Col>
            <div>
              
              
            </div>
          </Col>
          
      </Row>
        
        <div className="mt-auto">
             <Viewer
              height="400px"
              initialValue={recruitCompany.content}
              ref={this.viewerRef}
              previewStyle="vertical"
              initialEditType="wysiwyg"
              />
        </div>
            <div>
                <div>
                    <Button color="danger" onClick={this.toggle}>지원하기</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle} charCode="x">지원서</ModalHeader>
                        <ModalBody>
                            <div className="companyRecruit">
                                <h3>{recruitCompany.itemTitle}</h3>

                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label for="PaymentInfo">입금정보입력</Label>
                                        <Input type="name" name="name" id="name"
                                               placeholder="입금자명"
                                               onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="price" name="price" id="price"
                                               placeholder="입금 금액(숫자만 입력)"
                                               onChange={this.handleChange}

                                        />
                                    </FormGroup>
                                    <FormGroup className="ml-auto">
                                        <Input
                                            type="date"
                                            name="date"
                                            id="paymentDate"
                                            placeholder="입금 날짜"
                                            onChange={this.handleChange}

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            type="time"
                                            name="time"
                                            id="paymentTime"
                                            placeholder="00:00"
                                            onChange={this.handleChange}

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="Refund">환불계좌정보입력</Label>
                                        <Input type="bank" name="bank" id="bank"
                                               placeholder="은행명"
                                               onChange={this.handleChange}

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="accountNumber" name="accountNumber" id="accountNumber"
                                               placeholder="계좌번호"
                                               onChange={this.handleChange}

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="accountName" name="accountName" id="accountName"
                                               placeholder="예금주명"
                                               onChange={this.handleChange}

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>이메일 주소</Label>
                                        <Input type="email" name="email" id="email"
                                               placeholder="이메"
                                               onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Form>
                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>제출하기</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>닫기</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>

            <div className='Reply_div'>
          <h4> 댓글 </h4>
          <div className='Reply_write'>
            <textarea id="comments" rows='3' placeholder='100자 이내의 글을 입력해주세요.'
              maxLength='100' name='write_reply' onChange={this.handleCommentChange}>
              </textarea>
              <input type='button' value='등록' id='reply_submit_button' onClick={this.handleClick.bind(this, 'comments')}/>
          </div>

        </div>

            <div>
                {/*{this.state.comments}*/}
                {this.renderComments()}
            </div>
        </Container>

        
            </>
      )
    }
    else
    {
        console.log(this.state)
      return(
        <div>
              <p>Loading form...</p>
        </div>
      )
    }
  }
   
}

class Comments extends Component{
    constructor() {
        super();
        this.state={
            comments:""
        }
    }

    render() {
        return <div>{this.props.comments}</div>
    }
}
/*
const FundingDetail = (props) => {
    //const id = props.match.params.id; //route information
    //const { funding, auth } = props;
    //if(!auth.uid) return <Redirect to='/signin' />
    
    //const viewerRef = React.createRef();
    const { funding } = props;
    const rootE1 = React.createRef();
    var viewerInst = null;

    
    var Viewer = { Editor };
    var viewer = new Viewer(
      {
        el: document.querySelector('#viewer'),
        initialValue: 'hello'
      }
    )

    
    
    if (funding)
     {
       

         return(
            <Card sm="6">
            <CardImg top width="10%" src={funding.url} style={imgStyle} alt="Card image cap" />
            <CardBody>
            <CardTitle>{funding.fundingTitle}</CardTitle>
            <CardSubtitle> subtitle</CardSubtitle>
            <CardText>{funding.content}</CardText>
            </CardBody>
            {viewer}
            
            </Card>
            
         )
     }
     else{
         return (
           <div>
               <p>Loading funding...</p>
           </div>
        )
     }
        
}

*/

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    const id = ownProps.match.params.id;
    const recruitCompanies = state.firestore.data.recruitCompanies;
    const recruitCompany = recruitCompanies ? recruitCompanies[id] : null
    return {
      recruitCompany: recruitCompany,
      auth: state.firebase.auth
    }
  }



export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [{
        collection: 'recruitCompanies', doc: props.match.params.id
    }])
)(RecruitFormDetail)



//export default FundingDetail;