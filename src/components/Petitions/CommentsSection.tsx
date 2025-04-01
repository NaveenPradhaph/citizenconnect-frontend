// CommentsSection.tsx
import React, { useState } from 'react';

interface Comment {
  author: string;
  text: string;
  createdAt: string;
}

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (comment: string) => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full border rounded p-2"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded">
          Add Comment
        </button>
      </form>
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold">{comment.author}</p>
            <p className="text-gray-700">{comment.text}</p>
            <p className="text-sm text-gray-500">{comment.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
