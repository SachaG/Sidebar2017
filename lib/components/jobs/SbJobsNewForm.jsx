import { Components, registerComponent, getRawComponent, getFragment, withMessages } from 'meteor/vulcan:core';
import Jobs from "meteor/jobs";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
// import { withRouter } from 'react-router'

const JobsNewForm = (props, context) => 
  <Components.ShowIf
      check={Jobs.options.mutations.new.check}
      failureComponent={<div><p className="jobs-new-form-message"><FormattedMessage id="posts.sign_up_or_log_in_first" /></p><Components.AccountsLoginForm /></div>}
    >
      <div className="jobs-new-form">
        <p className="jobs-new-form-notice">
          Posting a job offer to Sidebar costs <strong>$250 for 30 days</strong>. 
          Jobs are included on Sidebar's jobs page for the whole 30 days, as well as featured
          once in the daily Sidebar newsletter. 
        </p>
        <Components.SmartForm
          collection={Jobs}
          mutationFragment={getFragment('JobsItem')}
          successCallback={job => {
            props.closeModal();
            props.flash('Thanks for submitting a new job offer.', 'success');
          }}
        />
      </div>
    </Components.ShowIf>


JobsNewForm.displayName = "JobsNewForm";

registerComponent('JobsNewForm', JobsNewForm, withMessages);
