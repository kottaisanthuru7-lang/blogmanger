import React, { useState } from 'react';
import './PostCard.css';

export default function PostCard({ post, onEdit, onView, onDelete, onToggleStatus }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const excerpt = post.content.replace(/\n/g, ' ').slice(0, 140) + (post.content.length > 140 ? '…' : '');

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(post.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <div className={`post-card ${post.status}`}>
      <div className="card-header">
        <span className={`status-badge status-${post.status}`}>
          {post.status === 'published' ? '● Published' : '○ Draft'}
        </span>
        <span className="card-category">{post.category}</span>
      </div>

      <h3 className="card-title" onClick={() => onView(post)}>{post.title}</h3>

      <p className="card-excerpt">{excerpt}</p>

      <div className="card-tags">
        {post.tags.slice(0, 3).map(tag => (
          <span key={tag} className="tag">#{tag}</span>
        ))}
      </div>

      <div className="card-meta">
        <span>Updated {post.updatedAt}</span>
      </div>

      <div className="card-actions">
        <button className="action-btn read-btn" onClick={() => onView(post)}>
          Read
        </button>
        <button className="action-btn edit-btn" onClick={() => onEdit(post)}>
          Edit
        </button>
        <button
          className="action-btn toggle-btn"
          onClick={() => onToggleStatus(post.id)}
          title={post.status === 'published' ? 'Move to Draft' : 'Publish'}
        >
          {post.status === 'published' ? '↩ Unpublish' : '↗ Publish'}
        </button>
        <button
          className={`action-btn delete-btn ${confirmDelete ? 'confirm' : ''}`}
          onClick={handleDelete}
        >
          {confirmDelete ? 'Confirm?' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
