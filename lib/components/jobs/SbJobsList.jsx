import { Components, registerComponent, withList, withCurrentUser, Utils } from 'meteor/vulcan:core';
import React from 'react';
import Jobs from 'meteor/jobs';
import Alert from 'react-bootstrap/lib/Alert';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const Error = ({error}) => <Alert className="flash-message" bsStyle="danger"><FormattedMessage id={error.id} values={{value: error.value}}/>{error.message}</Alert>

const JobsList = ({results, loading, count, totalCount, loadMore, showHeader = true, showLoadMore = true, networkStatus, currentUser, error, terms}) => {

  const loadingMore = networkStatus === 2;

  if (results && results.length) {

    const hasMore = totalCount > results.length;

    return (
      <div className="jobs-list">
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        <div className="jobs-list-content">
          {results.map(job => <Components.JobsItem job={job} key={job._id} currentUser={currentUser} terms={terms} />)}
        </div>
        {showLoadMore ? hasMore ? (loadingMore ? <Components.PostsLoading/> : <Components.PostsLoadMore loadMore={loadMore} count={count} totalCount={totalCount} />) : <Components.PostsNoMore/> : null}
      </div>
    )
  } else if (loading) {
    return (
      <div className="jobs-list">
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        <div className="jobs-list-content">
          <Components.PostsLoading/>
        </div>
      </div>
    )
  } else {
    return (
      <div className="jobs-list">
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        <div className="jobs-list-content">
          <Components.PostsNoResults/>
        </div>
      </div>
    )  
  }
  
};

JobsList.displayName = "JobsList";

const options = {
  collection: Jobs,
  fragmentName: 'JobsItem',
  pollInterval: 0,
};

registerComponent('JobsList', JobsList, withCurrentUser, [withList, options]);
