import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent, Components } from 'meteor/vulcan:core';

const SbPage = ({ name, title, packageName, path }) =>

  <div className={`page ${name}-page`}>
    <h2 className="page-title">{title}</h2>
    <div className="page-contents">
      <Components.Markdown packageName={packageName} path={path}/>
    </div>
  </div>

SbPage.propTypes = {
  name: PropTypes.string, // name of the page, used for the CSS class
  packageName: PropTypes.string, // name of the current package
  path: PropTypes.string, // path to file from the root of the package
  title: PropTypes.string // title of the page
}

export default SbPage;

registerComponent('Page', SbPage);