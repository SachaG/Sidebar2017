import { Components, registerComponent, getFragment, withMessages } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { intlShape } from 'meteor/vulcan:i18n';
import Jobs from "meteor/jobs";
import { withRouter } from 'react-router'

class JobsEditForm extends Component {

  renderAdminArea() {
    return (
      <Components.ShowIf check={Jobs.options.mutations.edit.check} document={this.props.job}>
        <div className="jobs-edit-form-admin">
          <div className="jobs-edit-form-id">ID: {this.props.job._id}</div>
        </div>
      </Components.ShowIf>
    )
  }

  render() {

    return (
      <div className="jobs-edit-form">
        {this.renderAdminArea()}
        <Components.SmartForm
          collection={Jobs}
          documentId={this.props.job._id}
          mutationFragment={getFragment('JobsItem')}
          successCallback={job => {
            this.props.closeModal();
            this.props.flash('Job offer edited.', 'success');
          }}
          removeSuccessCallback={({documentId, documentTitle}) => {
            // job edit form is being included from a single job, redirect to index
            // note: this.props.params is in the worst case an empty obj (from react-router)
            if (this.props.params._id) {
              this.props.router.push('/my-jobs');
            }

            this.props.flash('Job offer deleted.', "success");
            // todo: handle events in collection callbacks
            // this.context.events.track("job deleted", {_id: documentId});
          }}
          showRemove={true}
        />
      </div>
    );

  }
}

registerComponent('JobsEditForm', JobsEditForm, withMessages, withRouter);
