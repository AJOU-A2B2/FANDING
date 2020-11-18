import React from 'react';
//import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';
import CollectFundingSummary from './CollectFundingSummary';
import { Link } from 'react-router-dom';
import { CardDeck } from 'reactstrap';

const CollectFundingList = ({fundings}) => {
    return(
        <CardDeck style={{display: 'flex', flexDirection: 'row', 
                    justifyContent: 'left'}}>

            { fundings && fundings.map(funding => {
                return (
                    <Link to={'collect_funding/' + funding.id}>
                        <CollectFundingSummary funding={funding} key={funding.id} />
                    </Link>
                )
            })}
        </CardDeck>
    )   
}

export default CollectFundingList;