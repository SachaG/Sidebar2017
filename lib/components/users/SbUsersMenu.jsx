import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'vulcan:accounts';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { LinkContainer } from 'react-router-bootstrap';
import Users from 'meteor/vulcan:users';
import { withMutation, withCurrentUser, Components, getRawComponent, registerComponent } from 'meteor/vulcan:core';
import { compose } from 'react-apollo';
import classNames from 'classnames';

class SbUsersMenu extends Component {

  constructor() {
    super();
    this.sendNewsletter = this.sendNewsletter.bind(this);
    this.testNewsletter = this.testNewsletter.bind(this);
  }

  sendNewsletter() {
    console.log("// sendNewsletter")
    this.props.sendNewsletter();
  }

  testNewsletter() {
    console.log("// testNewsletter")
    this.props.testNewsletter();
  }

  render() {
    const user = this.props.currentUser;

    return (
      <div className={classNames("users-menu", {"users-menu-admin": Users.isAdmin(user)})}>
        <Dropdown id="user-dropdown">
          <Dropdown.Toggle>
            <Components.UsersAvatar size="medium" user={user} link={false} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
          
            <LinkContainer to={`/users/${user.slug}`} /*to={{name: "users.single", params: {slug: user.telescope.slug}}}*/>
              <MenuItem className="dropdown-item" eventKey="1">Profile</MenuItem>
            </LinkContainer>
          
            <LinkContainer to={`/account`} /*to={{name: "account"}}*/>
              <MenuItem className="dropdown-item" eventKey="2">Edit Account</MenuItem>
            </LinkContainer>

            <LinkContainer to={`/my-jobs`} /*to={{name: "account"}}*/>
              <MenuItem className="dropdown-item" eventKey="2">My Job Offers</MenuItem>
            </LinkContainer>

            {Users.isAdmin(this.props.currentUser) ? 
             
             <div>
             
                <MenuItem className="dropdown-item" eventKey="3" onClick={this.sendNewsletter}>Send Newsletter</MenuItem>
             
                <MenuItem className="dropdown-item" eventKey="4" onClick={this.testNewsletter}>Test Newsletter</MenuItem>

                <LinkContainer to={{pathname:'/', query: {view: 'pending'}}} >
                  <MenuItem className="dropdown-item" eventKey="5">Pending Jobs</MenuItem>
                </LinkContainer>

                <LinkContainer to={{pathname:'/', query: {view: 'pending'}}} >
                  <MenuItem className="dropdown-item" eventKey="5">Pending Links</MenuItem>
                </LinkContainer>

                <LinkContainer to={{pathname:'/', query: {view: 'sponsoredCandidatePosts'}}}>
                  <MenuItem className="dropdown-item" eventKey="6">Sponsored Candidates</MenuItem>
                </LinkContainer>

                <LinkContainer to={{pathname:'/', query: {view: 'sponsoredPending'}}}>
                  <MenuItem className="dropdown-item" eventKey="7">Sponsored Pending</MenuItem>
                </LinkContainer>

                <LinkContainer to={{pathname:'/', query: {view: 'sponsored'}}}>
                  <MenuItem className="dropdown-item" eventKey="7">Sponsored Links</MenuItem>
                </LinkContainer>

                <LinkContainer to={{pathname:'/', query: {view: 'scheduled'}}}>
                  <MenuItem className="dropdown-item" eventKey="8">Scheduled Links</MenuItem>
                </LinkContainer>

              </div>
            
            : null }
          
            <MenuItem className="dropdown-item" eventKey="4" onClick={() => Meteor.logout(Accounts.ui._options.onSignedOutHook())}>Log Out</MenuItem>
          
          </Dropdown.Menu>
        </Dropdown>
      </div>
    ) 
  }

}

registerComponent('UsersMenu', SbUsersMenu, withMutation({name: 'testNewsletter'}), withMutation({name: 'sendNewsletter'}), withCurrentUser);

export default compose(
  withMutation({name: 'testNewsletter'}),
  withMutation({name: 'sendNewsletter'}),
  withCurrentUser
)(SbUsersMenu);