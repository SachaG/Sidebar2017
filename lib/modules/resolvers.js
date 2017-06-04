import { addGraphQLQuery, addGraphQLResolvers } from 'meteor/vulcan:core';

const sponsoredDates = async (root, args, context) => {
  const dates = _.pluck(context.Posts.find({sponsored: true, isFuture: true}).fetch(), 'postedAt');
  return dates;
};

addGraphQLQuery(`sponsoredDates: [String]`);
addGraphQLResolvers({ Query: { sponsoredDates } });
