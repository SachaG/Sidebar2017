import { Components, registerComponent, replaceComponent, getRawComponent, ModalTrigger } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SbPostsDay extends getRawComponent('PostsDay') {

  renderNoLinks() {
    return (
      <div className="posts-no-results">
        <div>No links yet. Why not </div>
        <Components.ModalTrigger title="New Post" component={<a>submit one</a>}>
          <Components.PostsNewForm/>
        </Components.ModalTrigger>
        <div>?</div>
      </div>
    )
  }

  render() {

    const {date, posts, loading} = this.props;

    // sort posts by featured and then sponsored
    const sortedPosts = _.sortBy(_.sortBy(posts, 'featured'), 'sponsored').reverse();

    let dateHeading;

    const monthDay = date.format('MM/DD');

    // easter eggs
    if (monthDay === '01/01') {
      dateHeading = 
        <h4 className="posts-day-heading posts-day-heading-01-01">
          <span className="posts-day-heading-date">Happy</span>
          <span className="posts-day-heading-day">New Year</span>
        </h4>    
    } else if (monthDay === '03/08') {
      dateHeading = 
        <h4 className="posts-day-heading posts-day-heading-03-08">
          <span className="posts-day-heading-date">Women's Day</span>
          <span className="posts-day-heading-day">International</span>
        </h4>
    } else if (monthDay === '05/04') {
      dateHeading = 
        <h4 className="posts-day-heading posts-day-heading-05-04">
          <span className="posts-day-heading-date">May</span>
          <span className="posts-day-heading-day">The Fourth</span>
          <span className="posts-day-heading-third">Be With You</span>
        </h4>
    } else if (monthDay === '12/25') {
      dateHeading = 
        <h4 className="posts-day-heading posts-day-heading-12-25">
          <span className="posts-day-heading-date">Merry</span>
          <span className="posts-day-heading-day">Christmas</span>
        </h4>
    } else {
      dateHeading = 
        <h4 className="posts-day-heading">
          <span className="posts-day-heading-date">{date.format("MM/DD")}</span>
          <span className="posts-day-heading-day">{date.format("dddd")}</span>
        </h4>
    }

    return (
      <div className="posts-day">
        <div className="posts-day-heading-wrapper">
          {dateHeading}
        </div>
        <div className="posts-list">
          <div className="posts-list-content">
            {loading ? _.range(0,4).map(index => <Components.PostsItemLoading key={index} index={index}/>) : sortedPosts.map((post, index) => <Components.PostsItem post={post} key={post._id} index={index} currentUser={this.props.currentUser} />)}
          </div>
        </div>
      </div>
    )

  }

}


replaceComponent('PostsDay', SbPostsDay);
