Package.describe({
  name: "sidebar2017"
});

Package.onUse(function(api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'vulcan:core',
    'vulcan:posts',
    'vulcan:users',
    'vulcan:base-components',
    'vulcan:email-templates',
    'vulcan:newsletter',
    'vulcan:forms-tags',
    'vulcan:categories',
    'vulcan:email',
    'vulcan:notifications',
    'vulcan:voting',
    'vulcan:events',
    'vulcan:embedly',
    'vulcan:api',
    'vulcan:rss',
    'vulcan:forms-tags',
    'vulcan:cloudinary',

    'fourseven:scss',
    'static-html',

    'jobs',
    'vulcan:payments',
    
  ]);

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

  // api.addFiles([
  //   'lib/modules.js',
  //   // 'lib/client/webfonts.js',
    
  //   'lib/head.html'
  // ], ['server', 'client']);

  // api.addFiles([
  //   'lib/server/cdn.js',
  //   'lib/server/rss.js',
  //   'lib/server/emails/templates.js'
  // ], ['server']);

  api.addFiles([
    // 'lib/stylesheets/filters.css',
    'lib/stylesheets/bootstrap.css',
    'lib/stylesheets/main.scss',
  ], ['client']);

  api.addAssets([
    'lib/assets/logo.png',
    'lib/assets/markdown/about.md',
    'lib/assets/markdown/guidelines.md',
    'lib/assets/markdown/sponsor.md',
    'lib/assets/markdown/sponsor1.md',
    'lib/assets/markdown/sponsor2.md',
    'lib/assets/markdown/sponsor3.md',
    'lib/assets/markdown/sponsor4.md',

    'lib/assets/fonts/gt-eesti.css',

    'lib/assets/fonts/GT-Eesti-Text-Light-web/GT-Eesti-Text-Light.eot',
    'lib/assets/fonts/GT-Eesti-Text-Light-web/GT-Eesti-Text-Light.ttf',
    'lib/assets/fonts/GT-Eesti-Text-Light-web/GT-Eesti-Text-Light.woff',
    'lib/assets/fonts/GT-Eesti-Text-Light-web/GT-Eesti-Text-Light-2.eot',
    'lib/assets/fonts/GT-Eesti-Text-Light-web/GT-Eesti-Text-Light-2.ttf',
    'lib/assets/fonts/GT-Eesti-Text-Light-web/GT-Eesti-Text-Light-2.woff',

    'lib/assets/fonts/GT-Eesti-Text-Medium-web/GT-Eesti-Text-Medium.eot',
    'lib/assets/fonts/GT-Eesti-Text-Medium-web/GT-Eesti-Text-Medium.ttf',
    'lib/assets/fonts/GT-Eesti-Text-Medium-web/GT-Eesti-Text-Medium.woff',
    'lib/assets/fonts/GT-Eesti-Text-Medium-web/GT-Eesti-Text-Medium-2.eot',
    'lib/assets/fonts/GT-Eesti-Text-Medium-web/GT-Eesti-Text-Medium-2.ttf',
    'lib/assets/fonts/GT-Eesti-Text-Medium-web/GT-Eesti-Text-Medium-2.woff',

    'lib/assets/fonts/GT-Eesti-Text-ULight-web/GT-Eesti-Text-ULight.eot',
    'lib/assets/fonts/GT-Eesti-Text-ULight-web/GT-Eesti-Text-ULight.ttf',
    'lib/assets/fonts/GT-Eesti-Text-ULight-web/GT-Eesti-Text-ULight.woff',
    'lib/assets/fonts/GT-Eesti-Text-ULight-web/GT-Eesti-Text-ULight-2.eot',
    'lib/assets/fonts/GT-Eesti-Text-ULight-web/GT-Eesti-Text-ULight-2.ttf',
    'lib/assets/fonts/GT-Eesti-Text-ULight-web/GT-Eesti-Text-ULight-2.woff'

  ], ['server', 'client']);

  api.addAssets([
    'lib/server/emails/common/wrapper.handlebars',
    'lib/server/emails/common/test.handlebars',
    // 'lib/server/emails/comments/newComment.handlebars',
    // 'lib/server/emails/comments/newReply.handlebars',
    'lib/server/emails/posts/newPendingPost.handlebars',
    'lib/server/emails/posts/newPost.handlebars',
    'lib/server/emails/posts/postApproved.handlebars',
    // 'lib/server/emails/users/accountApproved.handlebars',
    // 'lib/server/emails/users/newUser.handlebars',
    'lib/server/emails/newsletter/newsletter.handlebars',
    // 'lib/server/emails/newsletter/newsletterConfirmation.handlebars',
    'lib/server/emails/newsletter/postItem.handlebars',
    'lib/server/emails/newsletter/jobItem.handlebars',

    'lib/server/emails/sponsored/sponsoredApproved.handlebars',
    'lib/server/emails/sponsored/sponsoredPaid.handlebars',
    
  ], ['server']);

});
