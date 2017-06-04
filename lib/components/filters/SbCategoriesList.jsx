import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/lib/Button';
// import DropdownButton from 'react-bootstrap/lib/DropdownButton';
// import MenuItem from 'react-bootstrap/lib/MenuItem';
// import Modal from 'react-bootstrap/lib/Modal';
import { Components, replaceComponent, getRawComponent, registerComponent, withList } from "meteor/vulcan:core";
import { Link, withRouter } from 'react-router';
import Categories from "meteor/vulcan:categories";
import classNames from 'classnames';

// note: cannot use ModalTrigger component because of https://github.com/react-bootstrap/react-bootstrap/issues/1808

class SbCategoriesList extends getRawComponent('CategoriesList') {

  renderCategory(category, index) {
    const classes = classNames("posts-category", {'posts-category-active': this.getCurrentCategoriesArray().includes(category.slug)});
    return (
      <li className="category-menu-item" key={index}>
        <Link className={classes} to={this.getCategoryLink(category.slug)}>{category.name}</Link>
      </li>
    )
  }

  render() {
    
    const categories = this.props.results;
    const currentCategorySlug = this.props.router.location.query && this.props.router.location.query.cat;
    
    return (
      <ul className="categories-list">
        {categories && categories.length > 0 ? _.sortBy(categories, "name").map((category, index) => this.renderCategory(category, index)) : null}
      </ul>
    )

  }
};

SbCategoriesList.contextTypes = {
  currentUser: PropTypes.object,
  scrollToTop: PropTypes.func,
  toggleFilters: PropTypes.func
}

const categoriesListOptions = {
  collection: Categories,
  queryName: 'categoriesListQuery',
  fragmentName: 'CategoriesList',
  limit: 0,
  pollInterval: 0,
};

registerComponent('CategoriesList', SbCategoriesList, withRouter, [withList, categoriesListOptions]);
