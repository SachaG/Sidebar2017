import React from 'react';
import { registerComponent, Components } from 'meteor/vulcan:core';
import moment from 'moment';
import { Link } from 'react-router';
import Users from 'meteor/vulcan:users';

const SbSponsorThanks = ({ post, currentUser }) =>

  <div className="sponsor-thanks">
    <h5 className="sponsor-thanks-paid-at">Payment processed on {moment(new Date(post.paidAt)).format('MMMM D YYYY, hh:mm')}</h5>
    <Components.Markdown packageName="sidebar2017" path="lib/assets/markdown/sponsor4.md"/>
    <p><Link to={Users.getProfileUrl(currentUser)}>View your links →</Link></p>
  </div>

registerComponent('SponsorThanks', SbSponsorThanks);

export default SbSponsorThanks;