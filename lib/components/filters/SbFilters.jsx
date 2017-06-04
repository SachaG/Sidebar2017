import { withCurrentUser, Components, Utils, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Calendar from 'rc-calendar';
// import SbSearchForm from './SbSearchForm.jsx';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import { Link } from 'react-router';
import { withRouter } from 'react-router'
import moment from 'moment';
import SidebarHelpers from '../../modules/helpers.js';
import withUI from '../../containers/withUI.js';

class SbFilters extends Component {

  constructor(props) {
    super(props);
    this.toggleCategories = this.toggleCategories.bind(this);
    this.goToDate = this.goToDate.bind(this);
    this.state ={
      showCategories: false
    };
    // if (SidebarHelpers.containsFilteringOptions(props.router.location.query)) {
    //   props.toggleFilters();
    // }
  }

  // componentDidMount() {
  //   if (SidebarHelpers.containsFilteringOptions(this.props.router.location.query)) {
  //     this.props.toggleFilters();
  //   }
  // }

  toggleCategories(e) {
    e.preventDefault();
    this.setState({
      showCategories: !this.state.showCategories
    });
  }

  renderView(view) {

    const location = this.props.router.location;
    const query = location.query;
    const currentView = query.view || this.props.defaultView;

    return (
      <li key={view} className={location.path === '/' && currentView === view ? 'post-view-active' : 'post-view-inactive'}>
        <OverlayTrigger container={this} placement='bottom' overlay={<Tooltip id={`${view}-tooltip`}>{Utils.capitalize(view)}</Tooltip>}>
          <Link onClick={() => {this.props.toggleFilters();}} to={{pathname: '/', query: {...query, view: view}}}>
            <Components.Icon name={view}/>
          </Link>
        </OverlayTrigger>
      </li>
    )
  }

  renderViews() {
    const views = ['pending', 'rejected', 'scheduled', 'uncategorized'];

    return (
      <div className='sidebar-block sidebar-views'>
        <h4 className='sidebar-heading'>Views</h4>
        <ul>
          {views.map(view => this.renderView(view))}
        </ul>
      </div>
    )
  }

  renderCategories() {

    const className = classNames('block', 'sidebar-categories', {'sidebar-categories-expanded': this.state.showCategories})
    
    return (
      <div className={className}>
        <Components.CategoriesList />
        {/*
        <a onClick={this.toggleCategories} className='toggle-categories'>{this.state.showCategories ? 'Show Less' : 'Show All'}</a>
        */}
      </div>
    )
  }

  goToDate(date) {
    const day = date.format('YYYY-MM-DD');
    this.props.router.push({pathname: '/', query: {after: day, before: day}});
  }

  renderCalendar() {
    const currentDate = this.props.router.location.query && this.props.router.location.query.after;

    const mDate = currentDate ? moment(currentDate) : null;

    return (
      <div className='block'>
        <Calendar
          selectedValue={mDate}
          showDateInput={false}
          showToday={false}
          onSelect={this.goToDate}
          formatter='YYYY-MM-DD'
          disabledDate={date => {
            return date && date.isAfter(moment());
          }}
        />
      </div>
    )
  }

  renderClear() {

    const showClear = SidebarHelpers.containsFilteringOptions(this.props.router.location.query);
    const clearClass = classNames('sidebar-block', 'sidebar-clear', {'sidebar-clear-show': showClear});
    
    return (
      <div className={clearClass}>
        <Link onClick={() => {this.props.toggleFilters();}} className='sidebar-clear-button' to={{pathname: '/'}}>Clear Filters</Link>
      </div>
    )
  }

  render() {

    return (
      <div className={classNames('filters', {'filters-show': this.props.ui.showFilters})}>
        <div className='filters-search'>
          <Components.SearchForm/>
        </div>
        <div className='filters-other'>
          {this.renderCategories()}
          {this.renderCalendar()}
        </div>

      </div>
    )

  }
}


SbFilters.propTypes = {
  defaultView: PropTypes.string
}

SbFilters.defaultProps = {
  defaultView: 'new'
}

registerComponent('Filters', SbFilters, withUI, withCurrentUser, withRouter);
