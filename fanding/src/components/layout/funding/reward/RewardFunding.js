import React, { Component } from "react";
import { DefaultContext } from "react-icons";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, CardDeck, Row, 
    Col, Container} from "reactstrap";
//import Dropdown from './Dropdown';
import { compose } from 'redux';
import FundingList from './RewardFundingList';
import NewOrdered from './NewOrdered';
import DefaultOrdered from './DeafaultOrdered';
import PopOrdered from './PopOrdered';

class RewardFunding extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            actions: [],
            dropDownValue: '보기 방식',
            dropdownOpen: false
        };
    }
    toggle(event) {

        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    changeValue(e) {
        this.setState({dropDownValue: e.currentTarget.textContent},
            ()=>{this.forceUpdate()});
        //let id = e.currentTarget.getAttribute("id");
        //console.log(this.state.dropDownValue);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("next State: ", nextState.dropDownValue);
    //     console.log("current State: ", this.state.dropDownValue);
    //     return this.state.dropDownValue !== nextState.dropDownValue;
    //   }

    render(){
        //const { fundings } = this.props;
        
        return(
            <div>

                
            <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
    
                
                    <div className="mbr-section-head">
                        <div className="container-fluid">
                        <h4 className="mbr-section-title mbr-fonts-style align-center m-0 display-2"><strong>리워드 펀딩</strong></h4>
                        <p className="mbr-section-subtitle mbr-fonts-style mb-0 mt-2 display-5"
                        style={{fontSize: '1.5rem'}}>
                        리워드 펀딩은 자금이 필요한 총대가 펀딩을 통해 자금을 모집하여, 제작하며
                        리워드 상품이 완성되면 펀딩에 참여한 참여자에게 상품을 제공하는 방식입니다.
                        </p>
                    </div>
                    
                    <ButtonDropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>

                    <DropdownToggle caret className="mt-30" style={{marginLeft:'30px'}}>
                        {this.state.dropDownValue}
                    </DropdownToggle>
                    <DropdownMenu>
                            {/* {this.state.actions.map(e => {
                                return <DropdownItem id={e.id} key={e.id} onClick={this.changeValue}>{e.name}</DropdownItem>
                            })} */}
                        <DropdownItem>
                            <div onClick={this.changeValue}>보기 방식</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div onClick={this.changeValue}>최신순</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div onClick={this.changeValue}>인기순</div>
                        </DropdownItem>
                        {/* <DropdownItem>
                            <div onClick={this.changeValue}>인기순</div>  */}
                                {/* 참여퍼센테이지가 높은 순*/}
                        {/* </DropdownItem> */}
                            

                    </DropdownMenu>

            </ButtonDropdown>
                {this.state.dropDownValue === "보기 방식" && <DefaultOrdered onClick={this.changeValue}/>}
                {this.state.dropDownValue === "최신순" && <NewOrdered onClick={this.changeValue}/>}
                {this.state.dropDownValue === "인기순" && <PopOrdered onClick={this.changeValue}/>}
            </div>
            {/* </div> */}
            </section>
            </div>
            
        )
    }
}

// const mapStateToProps = (state) => {
//     console.log(state);
//     return {
//         fundings: state.firestore.ordered.fundings
//     }
// }
// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([//data sync
//         { collection: 'fundings',
//           where: ['fundingType', '==', 'reward'],
          
//         } 
//     ])
// )(RewardFunding);

export default RewardFunding;