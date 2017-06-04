import NovaEmail from 'meteor/vulcan:email';

NovaEmail.addTemplates({
  test:                     Assets.getText("lib/server/emails/common/test.handlebars"),
  wrapper:                  Assets.getText("lib/server/emails/common/wrapper.handlebars"),
  newPost:                  Assets.getText("lib/server/emails/posts/newPost.handlebars"),
  newPendingPost:           Assets.getText("lib/server/emails/posts/newPendingPost.handlebars"),
  postApproved:             Assets.getText("lib/server/emails/posts/postApproved.handlebars"),
  // newComment:               Assets.getText("lib/server/emails/comments/newComment.handlebars"),
  // newReply:                 Assets.getText("lib/server/emails/comments/newReply.handlebars"),
  // accountApproved:          Assets.getText("lib/server/emails/users/accountApproved.handlebars"),
  // newUser:                  Assets.getText("lib/server/emails/users/newUser.handlebars"),
  newsletter:               Assets.getText("lib/server/emails/newsletter/newsletter.handlebars"),
  // newsletterConfirmation:   Assets.getText("lib/server/emails/newsletter/newsletterConfirmation.handlebars"),
  postItem:                 Assets.getText("lib/server/emails/newsletter/postItem.handlebars"),
  jobItem:                  Assets.getText("lib/server/emails/newsletter/jobItem.handlebars"),
  sponsoredApproved:                  Assets.getText("lib/server/emails/sponsored/sponsoredApproved.handlebars"),
  sponsoredPaid:                  Assets.getText("lib/server/emails/sponsored/sponsoredPaid.handlebars"),
});