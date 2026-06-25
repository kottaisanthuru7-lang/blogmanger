import React, { useState, useEffect } from 'react';
import './PostEditor.css';

const CATEGORIES = ['Technology', 'Writing', 'Lifestyle', 'Business', 'Health', 'Travel', 'Food', 'Other'];

export default function PostEditor({ post, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technology');
  const [tagsInput, setTagsInput] = useState('');
  const [status, setStatus] = useState('draft');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
      setTagsInput(post.tags.join(', '));
      setStatus(post.status);
    }
  }, [post]);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required.';
    if (!content.trim()) e.content = 'Content cannot be empty.';
    return e;
  };

  const handleSave = (saveStatus) => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    onSave({ title: title.trim(), content: content.trim(), category, tags, status: saveStatus || status });
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="editor-wrap">
      <div className="editor-main">
        <div className="editor-field">
          <input
            className={`title-input ${errors.title ? 'error' : ''}`}
            type="text"
            placeholder="Post title…"
            value={title}
            onChange={e => { setTitle(e.target.value); setErrors(p => ({ ...p, title: '' })); }}
          />
          {errors.title && <span className="error-msg">{errors.title}</span>}
        </div>

        <div className="editor-meta-row">
          <div className="editor-field field-inline">
            <label className="field-label">Category</label>
            <select
              className="field-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="editor-field field-inline">
            <label className="field-label">Tags <span className="hint">(comma-separated)</span></label>
            <input
              className="field-input"
              type="text"
              placeholder="React, JavaScript, Web…"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
            />
          </div>
        </div>

        <div className="editor-field">
          <div className="content-header">
            <label className="field-label">Content</label>
            <span className="word-count">{wordCount} words · ~{readTime} min read</span>
          </div>
          <textarea
            className={`content-textarea ${errors.content ? 'error' : ''}`}
            placeholder="Start writing your post here…"
            value={content}
            onChange={e => { setContent(e.target.value); setErrors(p => ({ ...p, content: '' })); }}
            rows={20}
          />
          {errors.content && <span className="error-msg">{errors.content}</span>}
        </div>
      </div>

      <aside className="editor-sidebar">
        <div className="sidebar-card">
          <h3 className="sidebar-title">Publish</h3>

          <div className="status-toggle">
            <span className="sidebar-label">Status</span>
            <div className="toggle-row">
              {['draft', 'published'].map(s => (
                <button
                  key={s}
                  className={`status-btn ${status === s ? 'active-' + s : ''}`}
                  onClick={() => setStatus(s)}
                >
                  {s === 'published' ? '● Published' : '○ Draft'}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-actions">
            <button
              className="save-btn save-draft"
              onClick={() => handleSave('draft')}
            >
              Save as Draft
            </button>
            <button
              className="save-btn save-publish"
              onClick={() => handleSave('published')}
            >
              ↗ Publish
            </button>
            <button className="cancel-link" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>

        <div className="sidebar-card preview-card">
          <h3 className="sidebar-title">Preview</h3>
          <div className="preview-title">{title || 'Post title…'}</div>
          <div className="preview-excerpt">
            {content.replace(/\n/g, ' ').slice(0, 100) || 'Start writing to see a preview…'}
            {content.length > 100 ? '…' : ''}
          </div>
          {tagsInput && (
            <div className="preview-tags">
              {tagsInput.split(',').map(t => t.trim()).filter(Boolean).slice(0, 3).map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
