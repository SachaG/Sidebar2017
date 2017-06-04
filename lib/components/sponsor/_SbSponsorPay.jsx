import React from 'react';
import { registerComponent, Components, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import { Link } from 'react-router';
import Posts from "meteor/vulcan:posts";
import gql from 'graphql-tag';
import Button from 'react-bootstrap/lib/Button';
import mapProps from 'recompose/mapProps';

import SponsorProgress from './SbSponsorProgress.jsx';
import SponsorPreview from './SbSponsorPreview.jsx';
import SponsorThanks from './SbSponsorThanks.jsx';

const SbSponsorPay = ({ document, loading, currentUser }) =>

  <div className="page sponsor-page">
    <h2 className="page-title">Complete Payment</h2>
    <div className="page-contents">
      {loading ? <Components.Loading/> : 

        <div>
          <SponsorProgress step="pay"/>

          <SponsorPreview post={document} />

          <div className="sponsor-pay">
            {document.paidAt ?
              
              <SponsorThanks post={document} currentUser={currentUser}/> :

              <Components.Checkout 
                productKey="sponsorship"
                associatedCollection={Posts}
                associatedDocument={document}
                properties={{
                  title: document.title,
                  url: document.url,
                }}
                fragment={gql`
                  fragment PostSetAsPaid on Post {
                    _id
                    status
                    paidAt
                  }
                `}
                button={<Button className="buy-sponsored-post-link"  type="submit" bsStyle="primary">Complete Payment (${document.sponsorshipPrice ? document.sponsorshipPrice : '950'})</Button>}
              />
            }
          </div>

          <div className="sponsor-footer">
            <Link to={`/sponsor/date/${document._id}`}>Previous: Pick Date</Link>
          </div>

        </div>
      }
    </div>
  </div>

const options = {
  collection: Posts,
  fragmentName: 'PostsPage'
}

const mapPropsFunction = props => ({...props, documentId: props.routeParams && props.routeParams.postId});

registerComponent('SponsorPay', SbSponsorPay, mapProps(mapPropsFunction), [withDocument, options], withCurrentUser);
