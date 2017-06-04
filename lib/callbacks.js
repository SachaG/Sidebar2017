import { addCallback, removeCallback } from 'meteor/vulcan:core';

removeCallback("posts.edit.sync", "PostsEditForceStickyToFalse");
removeCallback("posts.new.sync", "PostsNewUpvoteOwnPost");
removeCallback("posts.new.async", "PostsNewNotifications");

// Strip Medium hashtag to prevent duplicate links
function StripMediumHashtag (post, user) {
  if (post.url && post.url.indexOf('medium.com') !== -1 && post.url.indexOf("#") !== -1) {
    post.url = post.url.slice(0, post.url.indexOf("#"));
  }
  return post;
}
addCallback("posts.new.validate", StripMediumHashtag);