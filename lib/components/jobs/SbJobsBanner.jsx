import { Components, registerComponent, getFragment } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const SbJobsBanner = ({ data }) => {
  
  const { jobsRandom: job, loading } = data;

  return(  
    <div className="jobs-banner-wrapper">
      <h4 className="jobs-banner-title"><Link to="/jobs">From the Job Board</Link></h4>
      <div className="jobs-banner">
        {loading ? <Components.Loading /> : <Components.JobsItem job={job} showApply={true}/>}
      </div>
      <div className="jobs-banner-post-link">
        Looking for talent? <Link to="/my-jobs">Share your job offer with over 40,000 designers →</Link>
      </div>
    </div>
  )
}

const withJob = graphql(gql`
  query jobsRandom {
    jobsRandom {
      ...JobsItem
    }
  }
  ${getFragment('JobsItem')}
`);

registerComponent('JobsBanner', SbJobsBanner, withJob);