import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';
import { registerComponent, Components, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import classNames from 'classnames';

class SbUsersProfile extends Component {

  constructor() {
    super();
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeTab: 'links'
    }
  }

  toggleTab(tab) {
    this.setState({
      activeTab: tab
    });
  }

  render() {
    const {loading, documentId, slug, currentUser, document} = this.props;

    if (loading) {

      return <div className="page users-profile"><Components.Loading/></div>

    } else if (!document) {

      console.log(`// missing user (_id/slug: ${documentId || slug})`);
      return <div className="page users-profile"><FormattedMessage id="app.404"/></div> 
    
    } else {

      const user = document;

      const userPostsTerms = Users.isAdmin(currentUser) || Users.owns(currentUser, document) ? {view: "allUserPosts", userId: user._id} : {view: "userPosts", userId: user._id};
      
      const classname = classNames({
        'posts-list-user-posts': this.state.activeTab === 'links',
        'posts-list-upvoted-posts': this.state.activeTab === 'likes',
        'posts-list-own-profile': currentUser && Users.owns(currentUser, user),
      });

      return (
        <div className="page users-profile">
          <Components.HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} />
          <h2 className="page-title">
            <span>{Users.getDisplayName(user)}</span>
            {user.twitterUsername ? <a className="users-profile-twitter" href={"http://twitter.com/" + user.twitterUsername} target="_blank"><Components.Icon name="twitter"/></a> : null }
          </h2>
          {/*
          <ul>
            {user.twitterUsername ? <li><a href={"http://twitter.com/" + user.twitterUsername}>@{user.twitterUsername}</a></li> : null }
            {Users.isAdmin(currentUser) ? <li><Link to={Users.getEditUrl(user)}><FormattedMessage id="users.edit_account"/></Link></li> : null}
          </ul>
          */}
          <div className="user-posts">

            {currentUser && Users.owns(currentUser, user) ? 

              <div className="user-posts-header">
                <a className={this.state.activeTab === 'links' ? 'active' : ''} onClick={() => this.toggleTab('links')}>My Links</a>
                <a className={this.state.activeTab === 'likes' ? 'active' : ''} onClick={() => this.toggleTab('likes')}>My Likes</a>
                {Users.isAdmin(currentUser) ? <Link to={Users.getEditUrl(user)}><FormattedMessage id="users.edit_account"/></Link> : null}
              </div> :

              <div className="user-posts-header">
                <span>Featured Links</span>
              </div>

             }

            {this.state.activeTab === 'links' ? <Components.PostsList className={classname} terms={userPostsTerms} /> : <Components.PostsList className={classname} terms={{view: "userUpvotedPosts", userId: user._id}} /> }
          
          </div>
          {/*
          <div className="user-posts user-posts-upvoted">
            <h2>Likes</h2>
            <Components.PostsList terms={{view: "userUpvotedPosts", userId: user._id}} />
          </div>
          */}
        </div>
      )

    }
  }
}

SbUsersProfile.propTypes = {
  document: PropTypes.object,
  currentUser: PropTypes.object
}

const options = {
  collection: Users,
  queryName: 'usersSingleQuery',
  fragmentName: 'UsersProfile',
  pollInterval: 0,
};

registerComponent('UsersProfile', SbUsersProfile, withCurrentUser, [withDocument, options]);