import moment from 'moment';
import { GraphQLSchema } from 'meteor/vulcan:core';

GraphQLSchema.addMutation('setSponsorshipDate(date: String, postId: String) : Post');

/*

Sponsored links are always scheduled for Monday 5AM, GMT

note: make sure to use UTC mode here  https://momentjs.com/docs/#/parsing/utc/

note 2: we're not double-checking that the date really is available again, 
  we'll trust the client on this one

*/
const resolver = {
  Mutation: {
    setSponsorshipDate(root, { date, postId }, { currentUser, Posts, Users }) {
      const fullDate = moment.utc(date, 'MMMM D, YYYY').hour(5).toDate();
      const post = Posts.findOne(postId);
      if (Users.owns(currentUser, post) && post.sponsoredCandidate) {
        Posts.update(postId, {$set: {postedAt: fullDate}});
        return {_id: postId, postedAt: fullDate};
      }
    },
  },
};
GraphQLSchema.addResolvers(resolver);