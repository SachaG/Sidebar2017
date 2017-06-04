import Posts from 'meteor/vulcan:posts';
import Users from 'meteor/vulcan:users';
import VulcanEmail from 'meteor/vulcan:email';
import moment from 'moment';
import { Charges } from 'meteor/vulcan:payments';

const getTestPost = postId => typeof Posts.findOne(postId) === 'undefined' ? {post: Posts.findOne({sponsored: true, paidAt: {$exists: true}})} : {post: Posts.findOne(postId)};

const formatDate = date => moment(new Date(date)).format('dddd, MMMM D YYYY');

const getSponsoredProperties = data => {
  const post = data.post;
  const user = Users.findOne(post.userId);
  const charge = Charges.findOne({_id: {$in: post.chargeIds}});
  return {
    ...Posts.getNotificationProperties(data),
    description: post.htmlBody,
    paidAt: formatDate(post.paidAt),
    postedAt: formatDate(post.postedAt),
    profileUrl: Users.getProfileUrl(user),
    fee: charge.data.amount / 100
  }
}

VulcanEmail.addEmails({
  
  sponsoredPaid: {
    template: 'sponsoredPaid',
    path: '/email/sponsored-paid/:_id?',
    getProperties: getSponsoredProperties,
    subject: 'Thanks for submitting a sponsored link',
    getTestObject: getTestPost,
  },

  sponsoredApproved: {
    template: 'sponsoredApproved',
    path: '/email/sponsored-approved/:_id?',
    getProperties: getSponsoredProperties,
    subject: 'Your sponsored link has been approved',
    getTestObject: getTestPost,
  },

});