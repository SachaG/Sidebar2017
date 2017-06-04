import React from 'react';
import Tags from 'meteor/vulcan:forms-tags';
import Posts from "meteor/vulcan:posts";
import Users from "meteor/vulcan:users";

const formGroups = {
  admin: {
    name: "admin",
    order: 2
  }
};

const isOwnerOrAdmin = (user, document) => Users.owns(user, document) || Users.isAdmin(user);

Posts.addField([
  {
    fieldName: 'shortTitle',
    fieldSchema: {
      type: String,
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['guests'],
      group: formGroups.admin,
      control: "text"
    }
  },
  {
    fieldName: 'sponsored',
    fieldSchema: {
      type: Boolean,
      control: "checkbox",
      optional: true,
      defaultValue: false,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['guests'],
      group: formGroups.admin
    }
  },
  {
    fieldName: 'sponsoredCandidate',
    fieldSchema: {
      type: Boolean,
      optional: true,
      defaultValue: false,
      viewableBy: isOwnerOrAdmin,
      insertableBy: ['members'],
      editableBy: ['members'],
      hidden: true
    }
  },
  {
    fieldName: 'sponsorshipPrice',
    fieldSchema: {
      type: String,
      optional: true,
      viewableBy: isOwnerOrAdmin,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      group: formGroups.admin
    }
  },
  {
    fieldName: 'featured',
    fieldSchema: {
      type: Boolean,
      control: "checkbox",
      optional: true,
      defaultValue: false,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['guests'],
      group: formGroups.admin
    }
  },
  {
    fieldName: 'categories',
    fieldSchema: {
      type: Array,
      control: Tags,
      afterComponent: <a target="_blank" className="suggest-category-link" href="https://github.com/SachaG/SidebarFeedback/issues/1">Suggest new categories</a>
    }
  },

  {
    fieldName: 'paidAt',
    fieldSchema: {
      type: Date,
      optional: true,
      viewableBy: isOwnerOrAdmin,
      editableBy: ['admins'],
      control: 'datetime',
    }
  },

  {
    fieldName: 'chargeIds',
    fieldSchema: {
      type: Array,
      optional: true,
    }
  },

  {
    fieldName: 'chargeIds.$',
    fieldSchema: {
      type: String,
      optional: true,
    }
  },
  
]);

Posts.removeField("sticky");
Users.removeField("notifications_posts");
Users.removeField("bio");
Users.removeField("website");
