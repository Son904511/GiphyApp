// filepath: c:\Users\hp\giphy\giphy-app\src\components\CommentSection.jsx
import React, { useState } from "react";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div>
      <h3 className="font-bold text-lg">Comments</h3>
      <div>
        {comments.map((comment, index) => (
          <p key={index} className="text-gray-400">{comment}</p>
        ))}
      </div>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        className="border rounded p-2 w-full"
      />
      <button onClick={addComment} className="bg-blue-500 text-white p-2 mt-2">
        Post Comment
      </button>
    </div>
  );
};

export default CommentSection;