import React from 'react';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import ShareButton from './ShareButton';
import ExpandMenu from './ExpandMenu';

export default function PostActions(props) {
  return (
    <div className="pt-1.5 border-t border-gray-200 flex justify-evenly text-md text-gray-500 cursor-pointer px-3.5 pb-2">
      <LikeButton
        liked={props.liked}
        animateLike={props.animateLike}
        setAnimateLike={props.setAnimateLike}
        handleLike={props.handleLike}
      />

      <CommentButton />

      <ShareButton
        shareButtonRef={props.shareButtonRef}
        handleShare={props.handleShare}
        showCopied={props.showCopied}
        fireworks={props.fireworks}
        Particle={props.Particle}
      />

      <ExpandMenu
        user={props.user}
        postData={props.postData}
        profilePic={props.profilePic}
        isAccountOpen={props.isAccountOpen}
        setIsAccountOpen={props.setIsAccountOpen}
        expandMenuRef={props.expandMenuRef}
        handleDelete={props.handleDelete}
        setUpdatedMessage={props.setUpdatedMessage}
        setUpdatedImage={props.setUpdatedImage}
        setIsUpdateOpen={props.setIsUpdateOpen}
      />
    </div>
  );
}
