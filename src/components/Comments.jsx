import { useEffect, useState } from "react";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState("");

  useEffect(() => {
    setIsCommentsLoading(true);
    setCommentsError(null);
    const fetchedComments = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        const data = await response.json();
        if (response.ok) {
          setIsCommentsLoading(false);
          setComments(data);
        } else {
          setIsCommentsLoading(false);
          setCommentsError(true);
        }
      } catch (err) {
        setIsCommentsLoading(false);
        setCommentsError(err.message);
      }
    };
    fetchedComments();
  }, [postId]);
  console.log(comments);
  let postComment;
  if (isCommentsLoading)
    postComment = (
      <div className="text-xl font-semibold">Loading comments ...</div>
    );
  else if (!isCommentsLoading && commentsError)
    postComment = <div>Errors in fetching comments. {commentsError}</div>;
  else {
    postComment = (
      <ul className="list-disc px-2 font-mono">
        {comments.map((comment) => (
          <li key={comment.id}>{comment.name}</li>
        ))}
      </ul>
    );
  }
  return <div>{postComment}</div>;
}
