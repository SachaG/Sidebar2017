import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Users from 'meteor/vulcan:users';

const JobsHome = ({currentUser}) => {

  const jobsTerms = Users.isAdmin(currentUser) ? {view: 'allJobs'} : {view: 'paidJobs'};

  return (
  
    <div className="jobs-home">

      <Components.HeadTags title="Sidebar – Jobs" />

      <h2 className="page-title">
        <span>Jobs</span>
        <Components.ModalTrigger title="Submit New Job Offer" component={<a className="submit-job-link" to='/my-jobs'>Post a job ($250 for 30 days)</a>}>
          <Components.JobsNewForm />
        </Components.ModalTrigger>
      </h2>
      <div className="page-contents">
        <Components.JobsList terms={jobsTerms} />
      </div>
    </div>

  )
 
} 
registerComponent('JobsHome', JobsHome, withCurrentUser);
