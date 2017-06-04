import { Components } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import Tooltip from 'react-bootstrap/lib/Tooltip';
// import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Posts from 'meteor/vulcan:posts';
import SbLike from './SbLike.jsx';

class SbShare extends Component {

  constructor() {
    super();
    this.toggleShowShareOptions = this.toggleShowShareOptions.bind(this);
    this.state = {
      showShareOptions: false
    };
  }

  renderShareIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 800 800">
        <path d="M666.03 559.703c0 60.705-49.254 109.957-109.958 109.957H238.4c-60.71 0-109.962-49.252-109.962-109.957V242.03c0-60.71 49.252-109.96 109.96-109.96h97.364c6.487 0 12.218 5.345 12.218 12.217 0 6.106-4.2 11.07-9.93 12.218-19.09 6.492-36.27 14.125-50.78 22.91-1.907.76-3.82 1.526-6.106 1.526h-42.766c-33.6 0-61.09 27.49-61.09 61.09v317.673c0 33.596 27.49 61.085 61.09 61.085H556.07c33.598 0 61.086-27.49 61.086-61.085v-81.708c0-4.584 2.672-8.787 6.868-11.08 7.646-3.434 14.516-8.4 20.62-14.126 3.436-3.434 8.78-4.955 13.365-3.053s8.018 6.115 8.018 11.072v98.893zm-56.13-141.66c-4.586 4.966-10.693 7.258-17.18 7.258-3.052 0-6.487-.76-9.55-1.91-8.78-3.815-14.886-12.604-14.886-22.526v-73.307H507.2c-84.004 0-137.456 16.037-167.238 50.018-30.928 35.513-40.093 92.775-28.255 180.598.766 5.347-2.673 10.69-7.638 12.982-1.528.38-3.055.763-4.58.763-3.82 0-7.64-1.912-9.927-4.966-2.672-3.813-63.383-89.726-63.383-166.087 0-102.323 32.075-219.923 281.02-219.923h61.085v-73.31c0-9.925 6.105-18.708 14.886-22.527 3.063-1.142 6.5-1.907 9.55-1.907 6.487 0 12.595 2.673 17.18 7.252l146.615 146.616c9.55 9.546 9.55 24.822 0 34.367L609.9 418.043z"/>
      </svg>
    )
  }

  toggleShowShareOptions() {
    this.setState({
      showShareOptions: !this.state.showShareOptions
    });
  }

  render() {

    return (
      <div className="posts-item-share">
        <div className={classNames("posts-item-share-options", {show: this.state.showShareOptions})}>
          <SbLike collection={Posts} document={this.props.post} currentUser={this.props.currentUser}/>
          <a href={Posts.getEmailShareUrl(this.props.post)} target="_blank"><Components.Icon name="email"/></a>
          <a href={Posts.getTwitterShareUrl(this.props.post)} target="_blank"><Components.Icon name="twitter"/></a>
          <a href={Posts.getFacebookShareUrl(this.props.post)} target="_blank"><Components.Icon name="facebook"/></a>
        </div>
        <a href="javascript:void(0)" className="posts-item-share-icon" onClick={this.toggleShowShareOptions}><Components.Icon name="more"/></a>
      </div>
    )
  }

};

SbShare.propTypes = {
  post: PropTypes.object.isRequired
}

export default SbShare;