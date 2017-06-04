import React from 'react';
import { registerComponent, Components } from 'meteor/vulcan:core';
import { Link } from 'react-router';

const SbSponsor = (props) =>

  <div className="page sponsor-page">
    <h2 className="page-title">Sponsor Sidebar</h2>
    <div className="page-contents">

      <Components.Markdown packageName="sidebar2017" path="lib/assets/markdown/sponsor1.md"/>
      
      <div className="sponsor-link-container">
        <Link className="sponsor-link btn btn-primary" to="/sponsor/new">Submit new link</Link>
      </div>
      
      <Components.Markdown packageName="sidebar2017" path="lib/assets/markdown/sponsor2.md"/>
    
    </div>
  </div>

registerComponent('Sponsor', SbSponsor);
