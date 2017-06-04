import Posts from "meteor/vulcan:posts";

// Posts.addDefaultView(terms => ({
//   selector: {
//     status: Posts.config.STATUS_APPROVED
//   }
// }));

Posts.addView("featured", function (terms) {
  return {
    selector: {status: 2, isFuture: {$ne: true}},
    options: {sort: {postedAt: -1}} // note: sponsored sort is added later
  };
});

Posts.addView("top", function (terms) {
  return {
    selector: {status: 2, isFuture: {$ne: true}},
    options: {sort: {postedAt: -1}} // note: sponsored sort is added later
  };
});

Posts.addView("approved", function (terms) {
  return {
    selector: {status: 2, isFuture: {$ne: true}},
    options: {sort: {sponsored: -1, featured: -1, postedAt: -1}}
  };
});

Posts.addView("uncategorized", function (terms) {
  return {
    selector: {categories: {$exists: false}},
    options: {sort: {postedAt: -1}}
  };
});

Posts.addView("newsletter", function (terms) {
  return {
    selector: {
      status: 2,
      isFuture: null,
      scheduledAt: {$exists: false}
    },
    options: {
      sort: {postedAt: -1, sponsored: -1, order: 1},
      limit: terms.limit
    }
  };
});

Posts.addView("userPosts", terms => ({
  selector: {
    userId: terms.userId,
    status: Posts.config.STATUS_APPROVED,
    isFuture: {$ne: true}
  },
  options: {
    limit: 5,
    sort: {
      postedAt: -1
    }
  }
}));

Posts.addView("allUserPosts", terms => ({
  selector: {
    userId: terms.userId,
    status: {$in: [Posts.config.STATUS_APPROVED, Posts.config.STATUS_PENDING]},
    isFuture: {$ne: true}
  },
  options: {
    limit: 5,
    sort: {
      postedAt: -1
    }
  }
}));