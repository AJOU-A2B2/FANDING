import React from 'react'
//import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { NavLink, NavItem, Button } from 'reactstrap';
import {BsPeopleCircle, BsBell} from "react-icons/bs"

const style = {
  color: 'rgb(0, 0, 0)',
  fill: 'rgb(0, 0, 0)'
};
// const SignedInLinks = (props) => {
//   return (
//     <div>
//       <ul className="right">
//         <li><NavLink to='/create'>New Project</NavLink></li>
//         <li><a onClick={props.signOut}>Log Out</a></li>
//         <li><NavLink to='/' className="btn btn-floating pink lighten-1">
//           {props.profile.initials}
//         </NavLink></li>
//       </ul>
//     </div>
//   )
// }

const SignedInLinks = (props) => {
    return (
      

          // <>
          // <NavItem>
          //   <NavLink href="#"><BsBell size={24}/></NavLink>
          // </NavItem>
          // <NavItem>
          //   <NavLink href="/myaccount"><BsPeopleCircle size={24}/></NavLink>
          // </NavItem>

          // <NavItem>
          //   <NavLink href="/create_funding"><Button outline color="info">펀딩 생성</Button></NavLink>
          // </NavItem>

          // <NavLink href='/' onClick={props.signOut} >로그아웃</NavLink>
          // </>
          <div>
            <ul class="navbar-nav ml=auto">
            <div class="icons-menu">
            <a class="iconfont-wrapper" href="/" rel="noopener noreferrer" target="_blank">
                <span class="p-2 mbr-iconfont mobi-mbri-alert mobi-mbri"></span>
            </a>
            <a class="iconfont-wrapper" href="/myaccount" rel="noopener noreferrer" target="_blank">
                <span class="p-2 mbr-iconfont mobi-mbri-user-2 mobi-mbri" style={style}></span>
            </a>
            </div>
            <div class="navbar-buttons mbr-section-btn">
              <a class="btn btn-info display-4" href="/create_funding">펀딩 생성</a>
            </div>
            <li class="nav-item">
              <a class="nav-link link text-black display-4" href="/" onClick={props.signOut}>로그아웃</a>
            </li>
            </ul>
          </div>
    )
  }

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)