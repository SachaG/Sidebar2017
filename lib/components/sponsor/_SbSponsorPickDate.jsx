import React from 'react';
import { registerComponent, Components, withDocument } from 'meteor/vulcan:core';
import { withRouter } from 'react-router';
import Posts from 'meteor/vulcan:posts';
import mapProps from 'recompose/mapProps';

import SponsorProgress from './SbSponsorProgress.jsx';
import SponsorPreview from './SbSponsorPreview.jsx';
import SponsorDates from './SbSponsorDates.jsx';

const SbSponsorPickDate = ({ router, routeParams, loading, document }) =>

  <div className="page sponsor-page">
    <h2 className="page-title">Pick Date</h2>
    <div className="page-contents">
      {loading ? <Components.Loading/> : 
        <div>
          <SponsorProgress step="date"/>
          
          <SponsorPreview post={document} />

          <SponsorDates post={document} router={router}/>

        </div>
      }
    </div>
  </div>

const options = {
  collection: Posts,
  fragmentName: 'PostsPage'
}

const mapPropsFunction = props => ({...props, documentId: props.routeParams && props.routeParams.postId});

registerComponent('SponsorPickDate', SbSponsorPickDate, withRouter, mapProps(mapPropsFunction), [withDocument, options] );
