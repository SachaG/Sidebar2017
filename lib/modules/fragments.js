import { extendFragment, registerFragment, removeFromFragment } from 'meteor/vulcan:core';

extendFragment('PostsList', `
  sponsored
  cloudinaryUrls
  featured
  createdAt
  sponsoredCandidate
  shortTitle
`);

extendFragment('PostsPage', `
  sponsorshipPrice
  sponsoredCandidate
  paidAt
  shortTitle
`);

removeFromFragment('PostsList', 'sticky');
removeFromFragment('PostsList', `downvoters {
      _id
    }
`);
removeFromFragment('PostsList', 'downvotes');
// removeFromFragment('PostsList', 'thumbnailUrl');

registerFragment(`
  fragment UsersProfile on User {
    # vulcan:users
    ...UsersMinimumInfo
    createdAt
    isAdmin
    # bio # comment out for Sidebar
    htmlBio
    twitterUsername
    # website # comment out for Sidebar
    groups
    karma
    # vulcan:posts
    postCount
    # vulcan:comments
    commentCount
    # vulcan:newsletter
    newsletter_subscribeToNewsletter
    # vulcan:notifications
    notifications_users
    # notifications_posts # comment out for Sidebar
    # vulcan:voting
    downvotedComments {
      ...VotedItem
    }
    downvotedPosts {
      ...VotedItem
    }
    upvotedComments {
      ...VotedItem
    }
    upvotedPosts {
      ...VotedItem
    }
  }
`);