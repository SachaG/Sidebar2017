import React from 'react';
import { registerComponent, Components } from 'meteor/vulcan:core';
import moment from 'moment';

const SbSponsorPreview = ({ post }) =>

  <div className="sponsor-preview">
    <h3 className="sponsor-preview-title">
      Preview 
      {post.postedAt ? <span>– Scheduled for {moment(new Date(post.postedAt)).format('dddd, MMMM D YYYY')}</span>: null}
    </h3>
    <Components.PostsItem post={post} index={0} />
  </div>

registerComponent('SponsorPreview', SbSponsorPreview);

export default SbSponsorPreview;