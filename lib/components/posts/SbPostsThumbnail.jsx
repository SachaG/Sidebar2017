import React from 'react';
import classNames from 'classnames';
import Posts from "meteor/vulcan:posts";

const SbPostsThumbnail = ({post, clickHandler, size}) => {

  const pseudoRandomIndex = post.postedAt && post.postedAt.getTime ? [1,2,3,4,1,2,3,4,1,2][post.postedAt.getTime().toString().slice(-1)] : 1;
  const thumbnailClass = classNames("posts-thumbnail", "v"+pseudoRandomIndex);
  const cloudinaryUrl = post.cloudinaryUrls && _.findWhere(post.cloudinaryUrls, {name: size});
  const thumbnailUrl = cloudinaryUrl && cloudinaryUrl.url;

  return (
    <a onClick={clickHandler} className={thumbnailClass} href={Posts.getLink(post)} target={Posts.getLinkTarget(post)}>
      {post.thumbnailUrl ? <img src={thumbnailUrl} /> : null}
    </a>
  )
}

SbPostsThumbnail.defaultProps = {
  size: "medium"
}

module.exports = SbPostsThumbnail;
export default SbPostsThumbnail;