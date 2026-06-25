import React from 'react';
import './Header.css';

export default function Header({ onNewPost, view, onBack, postTitle, isEditing }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          {view !== 'dashboard' ? (
            <button className="back-btn" onClick={onBack}>
              ← Back
            </button>
          ) : (
            <div className="brand">
              <span className="brand-icon">✍️</span>
              <div>
                <h1 className="brand-name">The Desk</h1>
                <span className="brand-tagline">Your writing, organised</span>
              </div>
            </div>
          )}
          {view !== 'dashboard' && (
            <span className="breadcrumb">
              {view === 'editor'
                ? isEditing ? `Editing: ${postTitle}` : 'New Post'
                : postTitle}
            </span>
          )}
        </div>

        <div className="header-right">
          {view === 'dashboard' && (
            <button className="btn-primary" onClick={onNewPost}>
              + New Post
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
