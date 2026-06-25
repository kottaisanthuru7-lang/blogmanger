import React, { useState } from 'react';
import './BlogDetail.css';

export default function BlogDetail({ post, onEdit, onDelete, onToggleStatus, onBack }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const wordCount = post.content.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const paragraphs = post.content.split('\n').filter(p => p.trim());

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(post.id);
      onBack();
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <div className="detail-wrap">
      <article className="detail-article">
        <div className="detail-meta-top">
          <span className={`status-badge status-${post.status}`}>
            {post.status === 'published' ? '● Published' : '○ Draft'}
          </span>
          <span className="detail-category">{post.category}</span>
          <span className="detail-read-time">{readTime} min read · {wordCount} words</span>
        </div>

        <h1 className="detail-title">{post.title}</h1>

        <div className="detail-info-row">
          <span>Created {post.createdAt}</span>
          {post.updatedAt !== post.createdAt && <span>· Updated {post.updatedAt}</span>}
        </div>

        <div className="detail-tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>

        <div className="detail-divider" />

        <div className="detail-content">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      <aside className="detail-sidebar">
        <div className="sidebar-card">
          <h3 className="sidebar-title">Actions</h3>
          <div className="detail-actions">
            <button className="action-full edit-action" onClick={() => onEdit(post)}>
              ✏️ Edit Post
            </button>
            <button
              className="action-full toggle-action"
              onClick={() => onToggleStatus(post.id)}
            >
              {post.status === 'published' ? '↩ Move to Draft' : '↗ Publish Post'}
            </button>
            <button
              className={`action-full delete-action ${confirmDelete ? 'confirm' : ''}`}
              onClick={handleDelete}
            >
              {confirmDelete ? '⚠️ Confirm Delete?' : '🗑 Delete Post'}
            </button>
          </div>
        </div>

        <div className="sidebar-card">
          <h3 className="sidebar-title">Details</h3>
          <div className="detail-info">
            <div className="info-row">
              <span className="info-label">Category</span>
              <span className="info-value">{post.category}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Status</span>
              <span className={`info-value status-text-${post.status}`}>
                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Words</span>
              <span className="info-value">{wordCount}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Read Time</span>
              <span className="info-value">{readTime} min</span>
            </div>
            <div className="info-row">
              <span className="info-label">Created</span>
              <span className="info-value">{post.createdAt}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Updated</span>
              <span className="info-value">{post.updatedAt}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
