import React from 'react';
import { replaceComponent, getSetting, Components } from 'meteor/vulcan:core';
import SbNav from './SbNav.jsx';
import SbFilters from '../filters/SbFilters.jsx';

const SbHeader = ({currentUser}, context) => {
  
  const logoUrl = getSetting("logoUrl");
  const siteTitle = getSetting("title", "My App");
  const tagline = getSetting("tagline");

  return (
    <div className="header-wrapper">

      <header className="header">

        <div className="logo">
          <Components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
          {tagline ? <h2 className="tagline">{tagline}</h2> : "" }
        </div>
        
        <SbNav currentUser={currentUser}/>

      </header>

      <Components.Filters />
    </div>
  )
}


replaceComponent('Header', SbHeader);
