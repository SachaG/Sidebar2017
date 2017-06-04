import { withCurrentUser, registerComponent, Components, getRawComponent, withMutation } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import Button from 'react-bootstrap/lib/Button';
// import Cookie from 'js-cookie';
// import classNames from 'classnames';
import Users from "meteor/vulcan:users";
import { compose } from 'react-apollo';
import SimpleSchema from 'simpl-schema';

const Input = FRC.Input;

const dataSchema = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  }
});
const dataContext = dataSchema.namedContext("newsletterForm");

class SbNewsletter extends Component {

  constructor(props, context) {
    super(props);
    this.subscribeEmail = this.subscribeEmail.bind(this);
    this.subscribeUser = this.subscribeUser.bind(this);

    const showBanner = 
      Users.getSetting(context.currentUser, 'newsletter_showBanner', true) &&
      !Users.getSetting(context.currentUser, 'newsletter_subscribeToNewsletter', false);

    this.state = {
      showBanner: showBanner,
      loading: false, 
      success: false
    };
  }

  subscribeEmail(data) {

    if (!dataContext.validate(data)) {
    
      this.setState({error: "Sorry, that doesn't look like a valid email."});
    
    } else {

      this.setState({loading: true});

      this.props.addEmailNewsletter({email: data.email}).then((result) => {
        this.setState({loading: false, success: true});
      }).catch(error => {
        this.setState({loading: false, error: error.message});
      });

    }
  }

  subscribeUser() {

    this.setState({loading: true});

    this.props.addUserNewsletter({userId: this.props.currentUser._id}).then((result) => {
      this.setState({loading: false, success: true});
    }).catch(error => {
      this.setState({loading: false, error: error.message});
    });
  }

  renderForm() {
    return (
      <Formsy.Form className="newsletter-form" onSubmit={this.subscribeEmail}>
        <Input
          name="email"
          value=""
          placeholder="Your Email"
          type="text"
          layout="elementOnly"
        />
        <Button className="newsletter-button" type="submit" bsStyle="primary">Subscribe</Button>
      </Formsy.Form>
    )
  }

  renderButton() {
    return (
      <Button className="newsletter-button" onClick={this.subscribeUser} bsStyle="primary">Subscribe</Button>
    )
  }

  renderError() {
    return (
      <div className="newsletter-message error">{this.state.error}</div>
    )
  }

  renderSuccess() {
    return (
      <div className="newsletter-success">Thanks for subscribing! Look for Sidebar in your inbox tomorrow morning :)</div>
    )
  }

  renderContent() {
    return (
      <div>
        <div className="newsletter-form-wrapper">
          <h4 className="newsletter-tagline">Get the five Sidebar picks in your inbox every day!</h4>
          {this.props.currentUser ? this.renderButton() : this.renderForm()}
        </div>
        {this.state.error ? this.renderError() : null}
        {this.state.loading ? <div className="newsletter-loading"><Components.Loading/></div> : null}
      </div>
    )
  }

  render() {

    if (this.state.showBanner) {
      return (
        <div className="newsletter-wrapper">
          <div className="newsletter">
            {this.state.success ? this.renderSuccess() : this.renderContent()}
            <a onClick={this.dismissBanner} className="newsletter-close"><Components.Icon name="close"/></a>
            {/*
            <p className="newsletter-subtagline">The five best design links of the day, right in time for your morning coffee.</p>
            */}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

SbNewsletter.contextTypes = {
  currentUser: PropTypes.object
};

const emailOptions = {name: 'addEmailNewsletter', args: {email: 'String'}};
const addOptions = {name: 'addUserNewsletter', args: {userId: 'String'}};

export default compose(
  withCurrentUser,
  withMutation(emailOptions),
  withMutation(addOptions),
)(SbNewsletter);

registerComponent('Newsletter', SbNewsletter, withCurrentUser, withMutation(emailOptions), withMutation(addOptions));