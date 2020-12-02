import React, {Component} from 'react';
import {Container, Form, FormGroup, Label, CustomInput, Media, Button} from 'reactstrap';
import ticketImg from './ticket.png';
import streamingImg from './streaming.png';
import fanclub from './fanclub.png';
const imgStyle = {
    maxHeight: 400,
    maxWidth: 200
  }
class FanAuth extends Component{
    render()
    {
        return(
            <>
            <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
            <div className="mbr-section-head" style={{paddingBottom: '30px'}}>
                       <h3 className="mbr-section-title mbr-fonts-style align-center m-0 pb-30 mb-10 display-2">
                           <strong>팬 인증하기</strong></h3>
                       
           </div>
           <Container
           style={{backgroundColor:"#fafafa", borderRadius:"10px", padding:"3em 2em"}}>
            <p>팬 인증은 <strong>스트리밍 인증, 팬클럽 인증, 공연 관람 내역 중 최소 하나</strong>를 하셔야합니다.</p>
            <p>팬 인증은 펀딩 참여자가 펀딩을 고르는 하나의 기준이 될 수 있습니다.</p>
            <p>모든 사진에는 도용 방지를 위해 <strong>자신의 닉네임, 날짜, 시간</strong>이 나올 수 있게 해주세요.</p>
            <Form>
                <FormGroup>
                <Label><strong>1. 스트리밍 인증하기</strong></Label>
                <Media object src={streamingImg} style={imgStyle}/>
                <CustomInput type="file" id="streamingImage" name="customFile"
                                     label="스트리밍 인증 캡처를 업로드 하세요"
                                     onChange={this.handleImageChange}
                        />
                </FormGroup>
            
                <FormGroup>
                <Label><strong>2. 팬클럽 인증하기</strong></Label>
                <Media object src={fanclub} style={imgStyle}/>
                <CustomInput type="file" id="fanclubImage" name="customFile"
                                     label="팬클럽 인증 캡처를 업로드 하세요"
                                     onChange={this.handleImageChange}
                        />
                </FormGroup>
            
                <FormGroup>
                <Label><strong>3. 공연 관람 내역 인증하기</strong></Label>
                <Media object src={ticketImg} style={imgStyle}/>
                <CustomInput type="file" id="concertImage" name="customFile"
                                     label="공연 관람 내역을 업로드 하세요"
                                     onChange={this.handleImageChange}
                        />
                </FormGroup>
            
                <FormGroup>
                <Label><strong>4. 앨범 및 공식 굿즈 인증하기</strong></Label>
                <CustomInput type="file" id="albumImage" name="customFile"
                                     label="앨범 및 공식 굿즈를 업로드 하세요"
                                     onChange={this.handleImageChange}
                        />
                </FormGroup>
                <Button color="warning" size="md" block >제출하기</Button>
                {/* 버튼 handler 연결해야함 */}
            </Form>

         </Container>
         </section>
         </>   
        )
    }
}

export default FanAuth;