import { Components, registerComponent, withMessages } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Users from 'meteor/vulcan:users';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import moment from 'moment';
import classNames from 'classnames';
import Jobs from 'meteor/jobs';
import Button from 'react-bootstrap/lib/Button';
// import { withSetJobAsPaid } from 'meteor/jobs';
import gql from 'graphql-tag';

const Marker = ({job}) => {

  const statuses = ['unpaid', 'paid', 'archived'];
  const tooltips = ['Unpaid', `Paid on ${moment(job.paidAt).format('YYYY/MM/DD')}`, `Archived on ${moment(job.archivedAt).format('YYYY/MM/DD')}`]
  const index = job.status - 1;

  return (
    <div className={classNames('jobs-item-status', `status-${statuses[index]}`)}>
      <OverlayTrigger placement="bottom" overlay={<Tooltip id="submitted-tooltip">{tooltips[index]}</Tooltip>}>
        <div>
          <Components.Icon name={statuses[index]}/>
        </div>
      </OverlayTrigger>
    </div>
  )
}

const JobsItem = ({job, currentUser, flash, client, showApply}) => {

  const {company, title, url, htmlBody, thumbnailUrl} = job;

  return (

    <div className="jobs-item">

      <Marker job={job} />

      <a className="jobs-item-thumbnail" href={url} target="_blank"><img src={thumbnailUrl} /></a>
    
      <div className="jobs-item-content">

        <h3 className="jobs-item-company"><a href={url} target="_blank">{company}</a></h3>

        <h3 className="jobs-item-title"><a href={url} target="_blank">{title}</a></h3>
      
        <div className="jobs-item-body">
          <span dangerouslySetInnerHTML={{__html: htmlBody}} />
          
          {Jobs.options.mutations.edit.check(currentUser, job) ?

            <Components.ModalTrigger title="Edit Post" component={<a className="jobs-action-edit"><Components.Icon name="edit"/></a>}>
              <Components.JobsEditForm job={job} />
            </Components.ModalTrigger>
            
          : null}
        
        </div>

        {showApply ? 
          <div className="jobs-item-apply">
            <Button href={url} target="_blank" className="jobs-item-apply-button" bsStyle="primary">Apply Now</Button>
          </div>
        : null}

        {job.status === 1 && Users.owns(currentUser, job) ?

          <Components.Checkout 
            productKey="jobPosting"
            associatedCollection={Jobs}
            associatedDocument={job}
            fragment={gql`
              fragment JobsSetAsPaid on Job {
                _id
                status
                paidAt
              }
            `}
            button={<Button className="buy-job-button" bsStyle="primary">Complete Payment</Button>}
          />

        : null}

      </div>

    </div>
    
  )

}

registerComponent('JobsItem', JobsItem, withMessages);
