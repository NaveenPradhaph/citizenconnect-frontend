import React, { useState } from 'react';

interface Comment {
  text: string;
  createdAt: string;
  userId: string;
  userName: string;
  userRole: 'citizen' | 'government' | 'admin';
}

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (comment: string) => void;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newComment.trim();
    if (trimmed) {
      onAddComment(trimmed);
      setNewComment('');
    }
  };

  return (
    <div className="mt-10 bg-white shadow rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          className="w-full border border-gray-300 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          placeholder="Write a comment..."
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-xl transition"
        >
          Add Comment
        </button>
      </form>

      <div className="space-y-4">
        {[...comments].reverse().map((comment, index) => (
          <div
            key={index}
            className="flex items-start justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start space-x-4">
              {/* Avatar or initials */}
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                {getInitials(comment.userName)}
              </div>

              {/* Comment content */}
              <div>
                <div className="text-sm font-semibold text-blue-600">
                  {comment.userName}{' '}
                  <span className="text-gray-400 font-normal">({comment.userRole})</span>
                </div>
                <p className="mt-1 text-sm text-gray-800 font-medium">{comment.text}</p>
                <div className="mt-2 text-xs text-gray-500 flex space-x-4">
                </div>
              </div>
            </div>

            {/* Timestamp */}
            <div className="text-xs text-gray-400 mt-1 whitespace-nowrap ml-4">
              {new Date(comment.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })}{' '}
              {new Date(comment.createdAt).toLocaleTimeString(undefined, {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
