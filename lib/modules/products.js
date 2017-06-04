import { addProduct } from 'meteor/vulcan:payments';

addProduct('sponsorship', post => ({
  'name': 'Sidebar Sponsorship',
  'amount': post.sponsorshipPrice * 100 || 95000,
  'currency': 'USD',
  'description': post.title
}));

addProduct('jobPosting', job => ({
  'name': 'Job Posting',
  'amount': 25000,
  'currency': 'USD',
  'description': `${job.company}: ${job.title}`
}));