import postcss from "postcss";
import { useState } from "react";
import { useEffect } from "react";

export default function PostSelector({ onSelectPost }) {
  const [posts, setPosts] = useState([]);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    setIsPostLoading(true);
    setPostError(null);
    const fetchedPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=15"
        );
        const data = await response.json();
        if (response.ok) {
          setIsPostLoading(false);
          setPosts(data);
        } else {
          setIsPostLoading(false);
          console.log(response.statusText, response.status);
          setPostError("There is an error fetching data.");
        }
      } catch (err) {
        console.log(err.message);
        setIsPostLoading(false);
        setPostError(err.message);
      }
    };
    fetchedPosts();
  }, []);

  console.log(posts);
  let postContent;
  if (isPostLoading) {
    postContent = (
      <div className="text-xl font-semibold">Loading data .....</div>
    );
  } else if (!isPostLoading && postError) {
    postContent = (
      <div className="text-xl text-red-400">
        Error fetching data.{postError}
      </div>
    );
  } else
    postContent = (
      <select onChange={onSelectPost} className="font-mono p-1">
        <option value="">Select post</option>
        {posts.length &&
          posts.map((post) => (
            <option key={post.id} value={post.id}>
              {post.title}
            </option>
          ))}
      </select>
    );
  return postContent;
}
