import React, { Component} from "react";
import { Container} from 'reactstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { isLoaded} from "react-redux-firebase";
import {connect} from "react-redux";
import FundingContents from "./FundingContents";
import {CardDeck, CardText, Row} from 'reactstrap';
import queryString from 'query-string';
import {SearchBar} from "./MainPageDefault";


class Search extends Component {

    render() {

        const {search} = this.props.location;
        const queryObj=queryString.parse(search);
        const {keyword}=queryObj;
        // console.log(queryObj)
        // console.log(keyword);


        if(isLoaded(this.props.fundings)){

            const filteredResult=this.props.fundings.filter(
                (fundings)=>{
                    return (
                        fundings.artistSelect.toLowerCase().indexOf(keyword.toLowerCase())!==-1 ||
                            fundings.fundingTitle.toLowerCase().indexOf(keyword.toLowerCase())!==-1 ||
                            fundings.itemTitle.toLowerCase().indexOf(keyword.toLowerCase())!==-1
                    );
                }
            )

            return (

                <div>
                    <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
                        <Container>
                            <SearchBar history={this.props.history}/>
                            <div>
                                <Row style={{paddingLeft:"30px",paddingTop:"30px",paddingBottom:"30px"}}>
                                    <CardText><b>"{keyword}"</b>검색 결과입니다.</CardText>
                                </Row>
                                {keyword==="" ? null :
                                    (<CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', flexFlow:'row wrap',margin:'10px'}}>

                                    {
                                        filteredResult.map((funding, i) => {
                                            return (
                                                <FundingContents funding={funding} key={i}></FundingContents>
                                            )

                                        })

                                    }
                                </CardDeck>)
                                }
                            </div>

                        </Container>
                    </section>
                </div>
            )
        }
        else{
            return(
                <div>Loading...</div>
            )
        }

    }
}

    const mapStateToProps = (state) => {
    console.log("mapStateToProps", state);
    return {

        uid: state.firebase.auth.uid,
        auth: state.firebase.auth,
        authError: state.auth.authError,
        fundings: state.firestore.ordered.fundings,


    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props=> {

            return[
                {
                    collection:'fundings'
                }

            ]
        }
    )
)(Search);

