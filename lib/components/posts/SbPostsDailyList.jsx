/*

Extend PostsDailyList to remove post list header and change
withList options

*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components, getRawComponent, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { withList } from 'meteor/vulcan:core';
import Posts from 'meteor/vulcan:posts';
import { FormattedMessage } from 'meteor/vulcan:i18n';

class SbPostsDailyList extends getRawComponent('PostsDailyList') {
  render() {

    const posts = this.props.results;

    let dates = this.getDateRange(this.state.afterLoaded, this.state.before);

    // if we're done loading, remove dates with no posts
    // note: we can't know if a date has posts or not until we're done loading…
    dates = this.props.loading ? dates : _.reject(dates, date => this.getDatePosts(posts, date).length === 0);

    const getDate = index => dates.length > index ? <Components.PostsDay loading={this.props.loading} key={index} number={index} date={dates[index]} posts={this.getDatePosts(posts, dates[index])} networkStatus={this.props.networkStatus} currentUser={this.props.currentUser} /> : null;

    return (
      <div className="posts-daily">
        {getDate(0)}
        <Components.Newsletter />
        {getDate(1)}
        <Components.JobsBanner />
        {_.range(2, dates.length).map(index => getDate(index))}
        {this.state.loading ? <Components.PostsLoading/>:<a href="javascript:void(0)" className="posts-load-more posts-load-more-days" onClick={this.loadMoreDays}><FormattedMessage id="posts.load_more_days"/></a>}
      </div>
    )
  }
}

const options = {
  collection: Posts,
  queryName: 'SBPostsDailyListQuery',
  fragmentName: 'PostsList',
  limit: 0,
  pollInterval: 120000 + _.random(120000),
};

registerComponent('PostsDailyList', SbPostsDailyList, withCurrentUser, [withList, options]);