import React from 'react';
import { registerComponent, Components, withList } from 'meteor/vulcan:core';
import Posts from 'meteor/vulcan:posts';
import { Link } from 'react-router';
import compose from 'recompose/compose';
import moment from 'moment';

const SbSponsorDrafts = ({ results, loading }) => {

  if (loading || !results || results.length === 0) {
    return null;
  } else {

    return (
      <div className="sponsor-drafts">
        <h3>Your Drafts</h3>
        <ul>
          {results.map(post => 
            <li key={post._id}>
              <Link to={`/sponsor/new/${post._id}`}>
                {post.title}
              </Link>
              {post.postedAt ? <span className="sponsor-drafts-date">{moment(new Date(post.postedAt)).format('MMMM D, YYYY')}</span> : null}
              {post.sponsorshipPrice ? <span className="sponsor-drafts-price">${post.sponsorshipPrice}</span>: null}
            </li>
          )}
        </ul>
      </div>
    )

  }
}

const options = {
  collection: Posts,
  fragmentName: 'PostsPage',
  terms: {view: 'userSponsoredCandidatePosts'}
}

registerComponent('SponsorDrafts', SbSponsorDrafts, [withList, options]);

export default compose(
  withList(options)
)(SbSponsorDrafts);