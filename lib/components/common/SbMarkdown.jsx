/*

This component fetches a .md file and renders it as an HTML page.

Dependencies: react, react-markdown

Note: a package file can only access assets in the same package. This means 
this component needs to be live in the same package as your assets, 
which means it can't be distributed as a separate package. 

Usage example:

<SbMarkdown packageName="sidebar" path="lib/assets/markdown/about.md"/>

*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { registerComponent } from 'meteor/vulcan:core';

class SbMarkdown extends Component {

  constructor(props) {
    super(props);
    this.fetchMarkdown = this.fetchMarkdown.bind(this);
    if (Meteor.isServer) {
      // on the server, we can retrieve the assets synchronously
      this.state = {
        markdown: Assets.getText(props.path)
      }
    } else {
      // on the client, we can't so we initialize the state to be empty
      this.state = {}
    }
  }

  fetchMarkdown() {
    // make an HTTP request to retrieve the markdown file and store it in the component's state
    HTTP.get(`/packages/${this.props.packageName.replace(":", "_")}/${this.props.path}`, (error, result) => {
      this.setState({
        markdown: result.content
      });
    });
  }
  
  componentDidMount() {
    // fetch the file when component mounts
    this.fetchMarkdown();
  }

  componentWillReceiveProps() {
    // fetch the file when props change
    this.fetchMarkdown();
  }

  render() {
    return (
      <div className="markdown-contents">
        {this.state.markdown ? <ReactMarkdown source={this.state.markdown}/> : null}
      </div>
    )
  }
}

SbMarkdown.propTypes = {
  packageName: PropTypes.string, // name of the current package
  path: PropTypes.string, // path to file from the root of the package
}

export default SbMarkdown;

registerComponent('Markdown', SbMarkdown);