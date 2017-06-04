import { addCallback, removeCallback } from 'meteor/vulcan:core';
import { createNotification } from 'meteor/vulcan:notifications';

/*

posts.charge.sync

*/
function setPostPaidAt (modifier, post, charge) {
  modifier.$set.paidAt = new Date();
  modifier.$set.sponsored = true;
  modifier.$unset.sponsoredCandidate = true;
  return modifier;
}
addCallback('posts.charge.sync', setPostPaidAt);

function sendPaidNotification (post) {
  createNotification(post.userId, 'sponsoredPaid', { post });
}
addCallback('posts.charge.async', sendPaidNotification);

/*

posts.approve.async

*/

function sidebarApprovedNotification (post) {
  if (post.sponsored) {
    createNotification(post.userId, 'sponsoredApproved', { post });
  } else {
    createNotification(post.userId, 'postApproved', { post });
  }
}
removeCallback('posts.approve.async', 'PostsApprovedNotification');
addCallback('posts.approve.async', sidebarApprovedNotification);

/*

posts.new.async

*/
removeCallback('posts.new.async', 'PostsNewNotifications');