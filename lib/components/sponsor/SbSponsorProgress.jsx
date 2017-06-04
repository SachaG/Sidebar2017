import React from 'react';
import { registerComponent, Components } from 'meteor/vulcan:core';
import classNames from 'classnames';

const ProgressItem = ({ name, step, label, number }) =>
  <div className={classNames('sponsor-progress-item', `sponsor-progress-${name}`, {'active': step === name})}>
    <h3 className="sponsor-progress-number"><span><em>{number}</em></span></h3>
    <h4 className="sponsor-progress-label">{label}</h4>
  </div>

const SbSponsorProgress = ({ step }) =>

  <div className="sponsor-progress">
    <ProgressItem name="new" number="1" label="Submit Link" step={step} />
    <ProgressItem name="date" number="2" label="Pick Date" step={step} />
    <ProgressItem name="pay" number="3" label="Complete Payment" step={step} />
  </div>

registerComponent('SponsorProgress', SbSponsorProgress);

export default SbSponsorProgress