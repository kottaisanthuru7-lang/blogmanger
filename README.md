# 📝 Content Creator Blog Manager

A React-based blog management application built as part of the **Project-Based React Development & Career Readiness** program.

## 📋 Project Description

A freelance writer wants a simple app to manage blog drafts before publishing.

## ✅ Features

- **Create / Edit / Delete Posts** – Full CRUD functionality for blog posts
- **Draft vs Published Status** – Toggle between Draft and Published with visual indicators
- **Search Posts** – Real-time search by title, content, tags, or category
- **View Detailed Blog Page** – Full reading view with word count and estimated read time
- **Dashboard Summary** – Stats showing total, published, and draft counts
- **Filter by Status** – Filter all/published/draft posts
- **Category & Tags** – Organise posts with categories and comma-separated tags

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or above)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/content-creator-blog-manager.git

# Navigate into the project
cd content-creator-blog-manager

# Install dependencies
npm install

# Start the development server
npm start
```

The app runs at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Header.js / Header.css
│   ├── Dashboard.js / Dashboard.css
│   ├── PostCard.js / PostCard.css
│   ├── PostEditor.js / PostEditor.css
│   └── BlogDetail.js / BlogDetail.css
├── App.js / App.css
├── index.js
└── index.css
```

## 🛠️ Tech Stack

- **React 18** (Hooks – useState, useEffect)
- **CSS Custom Properties** for theming
- **Google Fonts** – Playfair Display + Inter

## 📚 React Concepts Used

- `useState` for state management
- `useEffect` for loading initial data
- Component-based architecture
- Props and callbacks for parent-child communication
- Conditional rendering
- List rendering with `.map()`
- Controlled form inputs
- CSS Modules / scoped CSS

## 📸 Screenshots

> Dashboard with stats, search, and filter  
> Post editor with live preview sidebar  
> Detailed blog reading view

## 👨‍💻 Author

Built as a college project for AdroIT Technologies – React Development Course.
