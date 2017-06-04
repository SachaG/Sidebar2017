import { addRoute, Components, getComponent } from 'meteor/vulcan:core';
import React from 'react';
import SbPage from '../components/common/SbPage.jsx';

addRoute([
  {name:'about',                path: '/about',                     component: () => <SbPage name="about" title="About" packageName="sidebar2017" path="lib/assets/markdown/about.md"/>},
  {name:'guidelines',           path: '/guidelines',                component: () => <SbPage name="guidelines" title="Guidelines" packageName="sidebar2017" path="lib/assets/markdown/guidelines.md"/>},

  {name:'usersJobs',            path: '/my-jobs',                   componentName: 'UsersJobs'},
  {name:'jobs',                 path: '/jobs',                      componentName: 'JobsHome'},

  {name:'sponsor',              path: '/sponsor',                   componentName: 'Sponsor'},
  {name:'sponsorNewPost',       path: '/sponsor/new(/:postId)',     componentName: 'SponsorNewPost'},
  {name:'sponsorPickDate',      path: '/sponsor/date/:postId',      componentName: 'SponsorPickDate'},
  {name:'sponsorPay',           path: '/sponsor/pay/:postId',       componentName: 'SponsorPay'},

]);


