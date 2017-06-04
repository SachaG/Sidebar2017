import { Components, replaceComponent } from 'meteor/vulcan:core';
import React from 'react';

const SbLayout = ({currentUser, children}) =>
  <div className="wrapper" id="wrapper">

    <Components.HeadTags />

    {currentUser ? <Components.UsersProfileCheck currentUser={currentUser} documentId={currentUser._id} /> : null}
  
    <div className="main">
    

      <h1 className="title">Sidebar</h1>

      <Components.Header />

      <Components.FlashMessages />

      {children}

    </div>
  
    <Components.Footer />
  
  </div>

replaceComponent('Layout', SbLayout);