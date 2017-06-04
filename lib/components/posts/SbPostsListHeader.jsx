import React from 'react';
import { Components, registerComponent, withList } from 'meteor/vulcan:core';
import { withRouter } from 'react-router';
import Categories from 'meteor/vulcan:categories';
import moment from 'moment';

const CategoriesNames = ({results, slugs}) => 
  <h2 className="posts-list-title">
    {_.pluck(_.filter(results, cat => slugs.includes(cat.slug)), 'name').join(' + ')}
  </h2>;
const options = { collection: Categories, fragmentName: 'CategoriesList', limit: 0, pollInterval: 0 };
const CategoriesNamesWithCategories = withList(options)(CategoriesNames);

const SbPostsListHeader = ({location, client}) => {

  if (location.query && location.query.cat) {

    return <CategoriesNamesWithCategories slugs={Array.isArray(location.query.cat) ? location.query.cat : [location.query.cat]} />;

  } else if (location.query && location.query.after) {

    const title = moment(location.query.after, 'YYYY-MM-DD').format('MMMM Do YYYY');
    return <h2 className="posts-list-title smaller">{title}</h2>

  } else if (location.query && location.query.query) {

    return <h2 className="posts-list-title smaller">{location.query.query}</h2>
    
  }

  return null;
}


registerComponent('PostsListHeader', SbPostsListHeader, withRouter)