import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import { Components, getRawComponent, withMessages, replaceComponent } from 'meteor/vulcan:core';
import { withVote, hasUpvoted } from 'meteor/vulcan:voting';

class SbLike extends getRawComponent('Vote') {

  render() {

    const loggedOutIcon = (
      <OverlayTrigger placement="bottom" overlay={<Tooltip id="like-tooltip">Add to My Likes</Tooltip>}>
        <a className="like-button" href="javascript:void(0)">
          <Components.Icon name="like" />
        </a>
      </OverlayTrigger>
    )

    const likeIcon = (
      <OverlayTrigger placement="bottom" overlay={<Tooltip id="like-tooltip">Add to My Likes</Tooltip>}>
        <a className="like-button" href="javascript:void(0)" onClick={this.upvote}>
          <Components.Icon name="like" />
        </a>
      </OverlayTrigger>
    )
    
    const likedIcon = (
      <OverlayTrigger placement="bottom" overlay={<Tooltip id="like-tooltip">Remove from My Likes</Tooltip>}>
        <a className="like-button" href="javascript:void(0)" onClick={this.upvote}>
          <Components.Icon name="liked" />
        </a>
      </OverlayTrigger>
    )

    return (
      <div className={`like ${this.getActionClass()}`}>
        {this.props.currentUser ?
          (hasUpvoted(this.props.currentUser, this.props.document) ? likedIcon : likeIcon) : 
          <Components.ModalTrigger size="small" title="Please Log In" component={loggedOutIcon}>
            <div className="log-in-message">
              <Components.AccountsLoginForm/>
            </div>
          </Components.ModalTrigger>
        }
      </div>
    )
  }

}

export default withMessages(withVote(SbLike));

replaceComponent('Vote', SbLike);