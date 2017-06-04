import React from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Link } from 'react-router';

const FooterLink = ({name, path, url}) => {
  return (
    <span className="footer-link" key={name}>
      {path ? <Link to={{pathname: path}}>{name}</Link> : <a href={url} target="_blank">{name}</a>}
    </span>
  )
}

const SbFooter = props => {

  const footerLinks = [
    {
      name: "About",
      path: "/about"
    },
    {
      name: "Guidelines",
      path: "/guidelines"
    },
    {
      name: "Sponsor",
      path: "/sponsor"
    },
    {
      name: "Jobs",
      path: "/jobs"
    },
    // {
    //   name: "Blog",
    //   url: "http://blog.com"
    // },
    {
      name: "Blog",
      url: "https://blog.sidebar.io"
    },
    {
      name: "Follow on Twitter",
      url: "https://twitter.com/SidebarIO"
    },
    {
      name: "Like on Facebook",
      url: "https://www.facebook.com/SidebarIO"
    },
    { 
      name: "Report Bugs",
      url: "https://github.com/SachaG/SidebarFeedback/issues/"
    },
    // {
    //   name: "T-shirt",
    //   url: "https://cottonbureau.com/products/sidebar"
    // }
  ]

  return (
    <div className="footer">
      {footerLinks.map(FooterLink)}
      <span className="footer-link">Sidebar is <a href="http://vulcanjs.org" target="_blank">open-source</a>! (v2.0)</span>
    </div>
  )
}

export default withCurrentUser(SbFooter);

registerComponent('Footer', SbFooter);
