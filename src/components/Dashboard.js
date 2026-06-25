import React from 'react';
import PostCard from './PostCard';
import './Dashboard.css';

export default function Dashboard({
  posts, allPosts, searchQuery, onSearchChange,
  activeFilter, onFilterChange, onEdit, onView,
  onDelete, onToggleStatus, onNewPost
}) {
  const totalPosts = allPosts.length;
  const publishedCount = allPosts.filter(p => p.status === 'published').length;
  const draftCount = allPosts.filter(p => p.status === 'draft').length;

  const categories = [...new Set(allPosts.map(p => p.category))];

  return (
    <div className="dashboard">
      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-value">{totalPosts}</span>
          <span className="stat-label">Total Posts</span>
        </div>
        <div className="stat-card stat-published">
          <span className="stat-value">{publishedCount}</span>
          <span className="stat-label">Published</span>
        </div>
        <div className="stat-card stat-draft">
          <span className="stat-value">{draftCount}</span>
          <span className="stat-label">Drafts</span>
        </div>
        <div className="stat-card stat-cat">
          <span className="stat-value">{categories.length}</span>
          <span className="stat-label">Categories</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search posts by title, content, tag…"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => onSearchChange('')}>✕</button>
          )}
        </div>

        <div className="filter-tabs">
          {['all', 'published', 'draft'].map(f => (
            <button
              key={f}
              className={`filter-tab ${activeFilter === f ? 'active' : ''}`}
              onClick={() => onFilterChange(f)}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Results info */}
      <div className="results-info">
        {searchQuery
          ? `${posts.length} result${posts.length !== 1 ? 's' : ''} for "${searchQuery}"`
          : activeFilter !== 'all'
          ? `${posts.length} ${activeFilter} post${posts.length !== 1 ? 's' : ''}`
          : `${posts.length} post${posts.length !== 1 ? 's' : ''}`
        }
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="posts-grid">
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={onEdit}
              onView={onView}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h3>No posts found</h3>
          <p>
            {searchQuery
              ? `No posts match "${searchQuery}". Try a different search.`
              : activeFilter !== 'all'
              ? `You have no ${activeFilter} posts yet.`
              : 'Start writing your first post.'}
          </p>
          {!searchQuery && (
            <button className="btn-primary" onClick={onNewPost}>
              + Create Your First Post
            </button>
          )}
        </div>
      )}
    </div>
  );
}
