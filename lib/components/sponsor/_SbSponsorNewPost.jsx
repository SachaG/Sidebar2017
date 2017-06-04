import React from 'react';
import { registerComponent, Components, getFragment, withCurrentUser } from 'meteor/vulcan:core';
import { withRouter } from 'react-router';
import Posts from "meteor/vulcan:posts";
import { FormattedMessage } from 'meteor/vulcan:i18n';

import SponsorProgress from './SbSponsorProgress.jsx';
import SponsorDrafts from './SbSponsorDrafts.jsx';

const SbSponsorNewPost = ({ router, routeParams, currentUser }) =>

  <div className="page sponsor-page">
    <h2 className="page-title">Submit Link</h2>
    <div className="page-contents">
      <SponsorProgress step="new"/>
      
      <Components.ShowIf
        check={Posts.options.mutations.new.check}
        failureComponent={<div><p className="posts-new-form-message"><FormattedMessage id="posts.sign_up_or_log_in_first" /></p><Components.AccountsLoginForm /></div>}
      >

        <div>

          {routeParams && routeParams.postId ? null : <SponsorDrafts terms={{userId: currentUser._id}} />}

          <Components.SmartForm
            collection={Posts}
            mutationFragment={getFragment('PostsPage')}
            submitLabel="Next: Preview & Pick Date"
            prefilledProps={{sponsoredCandidate: true}}
            documentId={routeParams && routeParams.postId}
            successCallback={post => {
              router.push({pathname: `/sponsor/date/${post._id}`});
            }}
          />
        </div>

      </Components.ShowIf>

    </div>
  </div>

registerComponent('SponsorNewPost', SbSponsorNewPost, withRouter, withCurrentUser);
