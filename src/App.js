import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PostEditor from './components/PostEditor';
import BlogDetail from './components/BlogDetail';
import './App.css';

const SAMPLE_POSTS = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    content: `React Hooks revolutionized the way we write React components. Introduced in React 16.8, hooks let you use state and other React features without writing a class.

The most commonly used hooks are useState and useEffect. useState lets you add state to functional components, while useEffect handles side effects like data fetching, subscriptions, or manually changing the DOM.

Here's a simple example of useState:
const [count, setCount] = useState(0);

This line declares a state variable called count, initialized to 0. The setCount function lets you update it.

Custom hooks are one of the most powerful patterns in React. They allow you to extract component logic into reusable functions, keeping your code DRY and easy to test.`,
    category: "Technology",
    tags: ["React", "JavaScript", "Frontend"],
    status: "published",
    createdAt: "2024-12-01",
    updatedAt: "2024-12-05",
  },
  {
    id: 2,
    title: "The Art of Minimalist Writing",
    content: `Minimalist writing is about stripping away the unnecessary to reveal the essential. It is a discipline as much as a style — the deliberate removal of filler, hedging, and redundancy until only the core remains.

Ernest Hemingway popularized the iceberg theory: the dignity of movement of an iceberg is due to only one-eighth of it being above water. The writer knows what to leave out.

Three principles guide minimalist writing:
1. Every word must earn its place
2. Show, don't tell
3. Trust the reader

Start by cutting adverbs. Then cut adjectives. What remains is the skeleton of your idea — and often, it's stronger than the original.`,
    category: "Writing",
    tags: ["Writing", "Style", "Craft"],
    status: "published",
    createdAt: "2024-12-10",
    updatedAt: "2024-12-10",
  },
  {
    id: 3,
    title: "My Draft: The Future of Remote Work",
    content: `Remote work has fundamentally changed how we think about productivity, collaboration, and work-life balance. Since 2020, millions of workers discovered they could be just as productive — often more so — outside the traditional office.

But the picture is more nuanced. Some thrive in remote environments; others struggle with isolation and the blurred boundary between work and home. Companies are now experimenting with hybrid models that try to capture the best of both worlds.

[Draft note: Need to add statistics on remote work adoption rates and a section on async communication tools like Notion and Linear.]

The tools that enable remote work have matured rapidly. Video conferencing, project management software, and asynchronous communication platforms have created a new operating system for distributed teams.`,
    category: "Lifestyle",
    tags: ["Remote Work", "Productivity", "Future"],
    status: "draft",
    createdAt: "2024-12-15",
    updatedAt: "2024-12-18",
  },
  {
    id: 4,
    title: "Understanding CSS Grid vs Flexbox",
    content: `CSS Grid and Flexbox are both powerful layout systems, but they solve different problems. Knowing when to use each is a fundamental skill for any frontend developer.

Flexbox is one-dimensional — it works along a single axis (row or column). It's perfect for distributing items within a container: navigation bars, button groups, centering content.

Grid is two-dimensional — it controls both rows and columns simultaneously. Use it for overall page layout, card grids, and complex structures that need alignment across multiple axes.

A good rule of thumb: reach for Flexbox when you're laying out items in a line. Reach for Grid when you need to control the layout in two directions at once.`,
    category: "Technology",
    tags: ["CSS", "Frontend", "Web Design"],
    status: "draft",
    createdAt: "2024-12-20",
    updatedAt: "2024-12-21",
  },
];

export default function App() {
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'editor' | 'detail'
  const [editingPost, setEditingPost] = useState(null);
  const [viewingPost, setViewingPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'published' | 'draft'

  const handleNewPost = () => {
    setEditingPost(null);
    setView('editor');
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setView('editor');
  };

  const handleViewPost = (post) => {
    setViewingPost(post);
    setView('detail');
  };

  const handleSavePost = (postData) => {
    if (editingPost) {
      setPosts(prev => prev.map(p =>
        p.id === editingPost.id
          ? { ...p, ...postData, updatedAt: new Date().toISOString().split('T')[0] }
          : p
      ));
    } else {
      const newPost = {
        ...postData,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setPosts(prev => [newPost, ...prev]);
    }
    setView('dashboard');
    setEditingPost(null);
  };

  const handleDeletePost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    if (view === 'detail') setView('dashboard');
  };

  const handleToggleStatus = (postId) => {
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, status: p.status === 'published' ? 'draft' : 'published', updatedAt: new Date().toISOString().split('T')[0] }
        : p
    ));
  };

  const handleBack = () => {
    setView('dashboard');
    setEditingPost(null);
    setViewingPost(null);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || post.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">
      <Header
        onNewPost={handleNewPost}
        view={view}
        onBack={handleBack}
        postTitle={editingPost ? editingPost.title : viewingPost ? viewingPost.title : ''}
        isEditing={!!editingPost}
      />

      <main className="main-content">
        {view === 'dashboard' && (
          <Dashboard
            posts={filteredPosts}
            allPosts={posts}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onEdit={handleEditPost}
            onView={handleViewPost}
            onDelete={handleDeletePost}
            onToggleStatus={handleToggleStatus}
            onNewPost={handleNewPost}
          />
        )}

        {view === 'editor' && (
          <PostEditor
            post={editingPost}
            onSave={handleSavePost}
            onCancel={handleBack}
          />
        )}

        {view === 'detail' && viewingPost && (
          <BlogDetail
            post={posts.find(p => p.id === viewingPost.id) || viewingPost}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
            onToggleStatus={handleToggleStatus}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
}
