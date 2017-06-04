import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';

const UsersJobs = ({currentUser}) =>
  
  <div className="users-jobs">
    <h2 className="page-title">
      <span>My Jobs</span>
      <Components.ModalTrigger title="Submit New Job Offer" component={<a className="submit-job-link" to='/my-jobs'>Post a job ($250 for 30 days)</a>}>
        <Components.JobsNewForm />
      </Components.ModalTrigger>
    </h2>
    <div className="page-contents">
      <Components.JobsList terms={{view: 'usersJobs', userId: currentUser._id}}/>
    </div>
  </div>
  
registerComponent('UsersJobs', UsersJobs, withCurrentUser);
