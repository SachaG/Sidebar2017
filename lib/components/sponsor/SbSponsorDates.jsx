import React, { Component } from 'react';
import { registerComponent, Components } from 'meteor/vulcan:core';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';
import compose from 'recompose/compose';

const format = 'MMMM D, YYYY';

/*

Component mutation

*/
class SbSponsorDates extends Component {

  constructor(props){
    super(props);
    this.onChanged = this.onChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getDates = this.getDates.bind(this);
    this.state = {
      date: props.post.postedAt && moment(new Date(props.post.postedAt)).format(format)
    }
  }

  onChanged(e) {
    this.setState({
      date: e.currentTarget.value
    });
  }

  onSubmit() {
    this.props.setSponsorshipDate({date: this.state.date, postId: this.props.post._id}).then(result => {
      this.props.router.push(`/sponsor/pay/${this.props.post._id}`)
    });
  }

  getDates() {
    const currentDay = moment().day();
    const nextMonday = moment().add(8-currentDay, 'days');
    const sponsoredDates = this.props.data.sponsoredDates.map(date => moment(new Date(date)).format(format));

    // get next 15 available dates
    let index = 0;
    let availableDates = [];
    while(availableDates.length < 15) {
      // get next Monday
      const date = nextMonday.clone().add(index * 7, 'days').format(format);
      // if next Monday is available, add it to availableDates array
      if (!sponsoredDates.includes(date)) {
        availableDates.push(date);
      }
      index++;
    }

    return availableDates;
  }

  render() {
    
    const data = this.props.data;

    if (data.loading) {
      return <Components.Loading />
    }

    return (
      <div className="sponsor-dates">

        <h3>Available Dates:</h3>

        <ul className="sponsor-dates-available">
          {this.getDates().map((date, index) => 
            <li key={index}>
              <label>
                <input type="radio" name="date" value={date} checked={date === this.state.date} onChange={this.onChanged} />
                {date}
              </label>
            </li>
          )}
        </ul>

        <div className="form-submit">
          <Button onClick={this.onSubmit} type="submit" bsStyle="primary">Next: Review & Pay</Button>
          <Link to={`/sponsor/new/${this.props.post._id}`}>Previous: Submit Link</Link>
        </div>

      </div>
    )
  }
}

/*

withSetSponsorshipDate mutation

*/
const withSetSponsorshipDate = (WrappedComponent) => {

  const mutation = gql`
    mutation setSponsorshipDate($date: String, $postId: String) {
      setSponsorshipDate(date: $date, postId: $postId) {
        __typename
        _id
        postedAt
      }
    }
  `;

  return graphql(mutation, {
    alias: 'withSetSponsorshipDate',
    props: ({ownProps, mutate}) => ({
      setSponsorshipDate: (vars) => {
        return mutate({ 
          variables: vars,
        });
      }
    }),
  })(WrappedComponent);
}

/*

withDates query

*/
const withDates = graphql(gql`
  query sponsoredDates {
    sponsoredDates
  }
`);

/*

registerComponent/export

*/
registerComponent('SponsorDates', SbSponsorDates, withDates, withSetSponsorshipDate);

export default compose(
  withSetSponsorshipDate,
  withDates
)(SbSponsorDates);