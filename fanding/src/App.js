import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import Navbar from './components/layout/Navbar';

import Navbar from "./components/layout/Navbar";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import SignUpCom from "./components/auth/SignUpCom";
import SignUpRoot from "./components/auth/SignUpRoot";
import MyAccount from "./components/layout/MyAccount";
import Chongdae_auth from "./components/layout/Chongdae_auth";
import Account_auth from "./components/auth/Account_auth";
import CreateFunding from "./components/layout/CreateFunding";
import FindCompanyForm from "./components/layout/company/FindCompanyForm";
import Payment from "./components/payment/Payment";
import RewardFunding from "./components/layout/funding/reward/RewardFunding";
import RewardFundingDetail from "./components/layout/funding/reward/RewardFundingDetail";
import CollectFunding from "./components/layout/funding/collect/CollectFunding";
import CollectFundingDetail from "./components/layout/funding/collect/CollectFundingDetail";
import RecruitFormDetail from "./components/layout/company/RecruitFormDetail";
import CompanyRecruit from "./components/layout/company/CompanyRecruit";
import QuestionChat from "./components/chatting/questionchat/QuestionChat";
import TotalChat from "./components/chatting/totalchat/TotalChat";
import CompanyChat from "./components/chatting/companychat/CompanyChat";
import createFundingDefault from "./components/layout/CreateFunding";
import AdminPaymentList from "./components/payment/AdminPaymentList";

// import test from './components/layout/test';
import FundingDetails from "./components/layout/FundingDetails";
import FundingState from "./components/layout/FundingState";
import MainPage from "./components/layout/MainPage";
import ReactDOM from "react-dom";
import MainPageDefault from "./components/layout/MainPageDefault";
// import MainPage from "./components/layout/MainPage";
import MyFunding from "./components/layout/MyFunding";
import MyParticipation from "./components/layout/MyParticipation";
import MyRecruit from "./components/layout/MyRecruit";
import MyCart from "./components/layout/MyCart";


import NoticeList from "./components/notice/NoticeList";

import Search from "./components/layout/Search";
import MyCompany from './components/layout/company/MyCompany';
import FanAuth from './components/layout/FanAuth';
import MyApplied from './components/layout/company/MyApplied';
import MyOngoing from './components/layout/company/MyOngoing';
import AdminDashBoard from "./components/layout/admin/AdminDashBoard";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          
          
          <Switch>
            {/*<Route exact path="/" component={MainPage} />*/}
            <Route exact path="/" component={MainPageDefault} />
            <Route path="/search" component={Search} />
            <Route path="/signuproot" component={SignUpRoot} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signupcom" component={SignUpCom} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signupcom" component={SignUpCom} />
            <Route path="/myaccount" component={MyAccount} />
            <Route path="/create_funding" component={createFundingDefault} />
            <Route path="/chongdae" component={Chongdae_auth} />
            <Route path="/account_auth" component={Account_auth} />
            <Route exact path="/find_company" component={CompanyRecruit} />
            <Route path="/find_company_form" component={FindCompanyForm} />
            <Route path="/payment" component={Payment} />

            <Route exact path="/reward_funding" component={RewardFunding} />
            <Route
              exact
              path="/reward_funding/:id"
              component={RewardFundingDetail}
            />
            <Route exact path="/collect_funding" component={CollectFunding} />
            <Route
              exact
              path="/collect_funding/:id"
              component={CollectFundingDetail}
            />
            <Route path="/find_company/:id" component={RecruitFormDetail} />
            <Route path="/funding_detail/:id" component={FundingDetails} />
            <Route path="/funding_state/:id" component={FundingState} />
            <Route path="/myFunding_created" component={MyFunding} />
            <Route path="/myFunding_participated" component={MyParticipation} />
            <Route path="/myCart" component={MyCart}/>
            <Route path="/questionchat" component={QuestionChat} />
            <Route path="/totalchat" component={TotalChat} />
            <Route path="/myRecruit" component={MyRecruit} />

            <Route path="/notice/list/:id" component={NoticeList} />

            <Route path="/companychat" component={CompanyChat} />
            <Route path="/myCompany" component={MyCompany} />
            <Route exact path="/fan_auth" component={FanAuth} />
            <Route exact path="/myAppliedFunding" component={MyApplied} />
            <Route path="/adminpaymentlist" component={AdminPaymentList} />
            <Route path="/admindashboard" component={AdminDashBoard} />
            <Route path="/myOngoingFunding" component={MyOngoing} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

// class App extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             username:null
//         };
//     }
//
//     componentDidMount() {
//         fetch('/api')
//             .then(res=>res.json())
//             .then(data=>this.setState({username:data.username}));
//     }
//
//
//     render() {
//         const {username} = this.state;
//         return (
//             <div className="App">
//                 <header className="App-header">
//                     {username ? `Hello ${username}` : 'Hello World'}
//                 </header>
//             </div>
//         );
//         ;
//     }
// }

export default App;
