import Posts from 'meteor/vulcan:posts';

/**
 * @summary Check if a post is approved
 * @param {Object} post
 */
Posts.isFeatured = function (post) {
  return post.featured === true;
};

const SidebarHelpers = {
  containsFilteringOptions(query) {
    const filteringOptions = ['view', 'after', 'before', 'cat', 'cat[]', 'query'];
    return  _.intersection(_.keys(query), filteringOptions).length > 0;
  }
};

export default SidebarHelpers;
