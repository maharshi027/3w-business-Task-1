import { useEffect, useState } from "react";
import api from "../api/axios";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      <CreatePost refresh={loadPosts} />
      {posts.map(post => (
        <PostCard key={post._id} post={post} refresh={loadPosts} />
      ))}
    </>
  );
}

export default Feed
