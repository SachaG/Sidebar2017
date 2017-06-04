import React from 'react';
import { registerComponent, Components } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';
import withUI from '../../containers/withUI.js';
import { STATES } from 'meteor/vulcan:accounts';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

const PostsNewButton = () =>
  <OverlayTrigger placement="bottom" overlay={<Tooltip id="submit_link">Submit Link</Tooltip>}>
    <a className="nav-item-icon" href="javascript:void(0)"><Components.Icon name="new"/></a>
  </OverlayTrigger>

const SearchButton = ({toggleFilters}) =>
  <OverlayTrigger placement="bottom" overlay={<Tooltip id="search_link">Search Links</Tooltip>}>
    <a className="nav-item-icon" href="javascript:void(0)" onClick={toggleFilters}><Components.Icon name="search" /></a>
  </OverlayTrigger>

// add div so that the event handler can be applied to it
// see https://github.com/react-bootstrap/react-bootstrap/issues/2208
const UsersAccountMenuButton = () =>
  <OverlayTrigger placement="bottom" overlay={<Tooltip id="sign_up_log_in">Sign Up/Log In</Tooltip>}>
    <a className="nav-item-icon" href="javascript:void(0)"><Components.Icon name="user"/></a>
  </OverlayTrigger>

const SbNav = ({currentUser, toggleFilters}, context) =>
  
  <div className="nav">
    
    <div className="nav-item nav-user">
      {!!currentUser ?

        <Components.UsersMenu/> :

        <Components.ModalTrigger title="Sign Up/Log In" size="small" component={<div><UsersAccountMenuButton/></div>}>
          <Components.AccountsLoginForm formState={STATES.SIGN_IN}/>
        </Components.ModalTrigger>

      }
    </div>

    <div className="nav-item nav-search">
      <SearchButton toggleFilters={toggleFilters} />
    </div>

    <div className="nav-item nav-new-post">
      <Components.ModalTrigger size={currentUser ? 'large' : 'small'} title={context.intl.formatMessage({id: "posts.new_post"})} component={<div><PostsNewButton/></div>}>
        <Components.PostsNewForm redirect={`/users/${currentUser && currentUser.slug}`}/>
      </Components.ModalTrigger>
    </div>

  </div>

SbNav.contextTypes = {
  intl: intlShape
};

registerComponent('Nav', SbNav, withUI);

export default withUI(SbNav);