import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const SbPostsItemLoading = ({ index }) =>
  <div className="posts-item-loading">
    {index === 0 ? <div className="posts-item-loading-thumbnail"></div> : null}
    <div className="posts-item-loading-content">
      <div className="posts-item-loading-title" style={{width: `${_.random(40,100)}%`}}></div>
      <div className="posts-item-loading-description" style={{width: `${_.random(40,100)}%`}}></div>
      <div className="posts-item-loading-footer" style={{width: `${_.random(40,100)}%`}}></div>
    </div>
  </div>


registerComponent('PostsItemLoading', SbPostsItemLoading);
