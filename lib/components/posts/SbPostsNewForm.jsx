import { Components, replaceComponent, getRawComponent, getFragment } from 'meteor/vulcan:core';
import Posts from 'meteor/vulcan:posts';
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'meteor/vulcan:i18n';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';

const md = `

#### Before Your Post          

Please make sure the content you're submitting is **design-related** 
and **recent** (from the last 30 days), and that you take the time to properly format
your title and description. Submitting your own content is 
fine, but any content requiring payment will *not* be accepted. 

`

const SbPostsNewForm = (props, context) => 
  <Components.ShowIf
      check={Posts.options.mutations.new.check}
      failureComponent={<div><p className="posts-new-form-message"><FormattedMessage id="posts.sign_up_or_log_in_first" /></p><Components.AccountsLoginForm /></div>}
    >
      <div className="posts-new-form">

        <div className="posts-new-form-guidelines">
          <ReactMarkdown source={md}/>
          <Link onClick={props.closeModal} to="/guidelines">View the full posting guidelines →</Link>
        </div>

        <Components.SmartForm
          collection={Posts}
          mutationFragment={getFragment('PostsPage')}
          successCallback={post => {
            props.closeModal();
            props.router.push({pathname: props.redirect || Posts.getPageUrl(post)});
            props.flash(context.intl.formatMessage({id: "posts.created_message"}), "success");
          }}
        />
      </div>
    </Components.ShowIf>

SbPostsNewForm.contextTypes = {
  closeCallback: PropTypes.func,
  intl: intlShape
};


replaceComponent('PostsNewForm', SbPostsNewForm);
