import React, { useEffect, useState } from 'react';
import StoryReel from './StoryReel';
import MessageSender from './MessageSender';
import Post from './post/Post';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import db from '../../firebase';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsQuery = query(
      collection(db, "posts"),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='flex-1 w-full px-4 md:px-8 py-4 md:py-6'
     id='feed'
     >
      <div className='max-w-[600px] w-full mx-auto flex flex-col space-y-4 md:space-y-6'>
        <MessageSender />
        <div className='w-full overflow-x-hidden'>
          <StoryReel />  
        </div>
        
        
        {posts.map(post => (
          <Post 
            key={post.id}
            id={post.id}
            profilePic={post.profilePic}
            message={post.message}
            timestamp={post.timestamp}
            username={post.username}
            image={post?.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
