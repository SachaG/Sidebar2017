import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent, withCurrentUser, Components, getRawComponent, withEdit } from "meteor/vulcan:core";
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Posts from "meteor/vulcan:posts";
// import Users from "meteor/vulcan:users";
// import gql from 'graphql-tag';

class SbPostsActions extends Component {

  constructor() {
    super();
    this.approve = this.approve.bind(this);
    this.makePending = this.makePending.bind(this);
  }

  approve(e) {
    e.preventDefault();
    // this.props.approve({postId: this.props.post._id});
    const set = {status: 2};
    if (!this.props.post.postedAt) {
      set.postedAt = new Date();
    }
    this.props.editMutation({
      documentId: this.props.post._id,
      set,
      unset: {},
    });
  }

  makePending(e) {
    e.preventDefault();
    // this.props.makePending({postId: this.props.post._id});
    this.props.editMutation({
      documentId: this.props.post._id,
      set: {status: 1},
      unset: {},
    });
  }
  
  renderMakePending() {
    return (
      <OverlayTrigger placement="bottom" overlay={<Tooltip id="reject-tooltip">Make Pending</Tooltip>}>
        <a title="Make Pending" onClick={this.makePending} className="posts-action-reject">
          <Components.Icon name="reject"/>
        </a>
      </OverlayTrigger>
    )
  }

  renderApprove() {
    return (
      <OverlayTrigger placement="bottom" overlay={<Tooltip id="approve-tooltip">Approve</Tooltip>}>
        <a title="Approve" onClick={this.approve} className="posts-action-approve">
          <Components.Icon name="approve"/>
        </a>
      </OverlayTrigger>
    )
  }

  renderFeature() {
    return (
      <OverlayTrigger placement="bottom" overlay={<Tooltip id="feature-tooltip">Feature</Tooltip>}>
        <a title="Feature" onClick={this.feature} className="posts-action-feature">
          <Components.Icon name="feature"/>
        </a> 
      </OverlayTrigger>
    )
  }

  renderUnfeature() {
    return (
      <OverlayTrigger placement="bottom" overlay={<Tooltip id="unfeature-tooltip">Unfeature</Tooltip>}>
        <a title="Unfeature" onClick={this.unfeature} className="posts-action-unfeature">
          <Components.Icon name="unfeature"/>
        </a> 
      </OverlayTrigger>
    )
  }

  renderAdminActions() {

    return (
      <span className="posts-item-admin-actions">
        {Posts.isPending(this.props.post) ? 
          this.renderApprove() : 
          this.renderMakePending()
        }
      </span>
    )
  }

  renderEditLink() {

    const editTrigger = (
      <OverlayTrigger placement="bottom" overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}>
        <a className="edit-link">
          <Components.Icon name="edit"/>
        </a>
      </OverlayTrigger>
    );

    return (
      <Components.ModalTrigger title="Edit Post" component={editTrigger}>
        <Components.PostsEditForm post={this.props.post}/>
      </Components.ModalTrigger>
    )
  }

  render() {

    return (
      <div className="posts-actions">

        {Posts.options.mutations.edit.check(this.props.currentUser, this.props.post) ? 
          this.renderEditLink()
        : null}

        {/*
        <a className="posts-action-share"><Components.Icon name="share"/></a>
        */}
        {/* Users.isAdmin(this.props.currentUser) ? this.renderAdminActions() : null */}
      </div>
    )
  }

};

SbPostsActions.propTypes = {
  post: PropTypes.object.isRequired
}

// const approveOptions = {
//   name: 'approve',
//   args: {postId: 'String'}
// }

// const makePendingOptions = {
//   name: 'makePending',
//   args: {postId: 'String'}
// }

const editOptions = {
  collection: Posts,
  fragmentName: 'PostsList',
}

registerComponent('SbPostsActions', SbPostsActions, withCurrentUser, [withEdit, editOptions]);

export default withEdit(editOptions)(withCurrentUser(SbPostsActions));