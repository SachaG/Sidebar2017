import Newsletters from 'meteor/vulcan:newsletter';
import { Utils } from 'meteor/vulcan:core';

Newsletters.getSubject = posts => {
  const subject = posts.map((post, index) => index > 0 ? `, ${post.shortTitle}` : post.shortTitle).join('');
  return Utils.trimWords(subject, 15);
}
