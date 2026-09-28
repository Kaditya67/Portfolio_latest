# Portfolio Admin - React + Vite

A clean, responsive React admin dashboard to manage portfolio content with live backend synchronization.

---

## Tech Stack

- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4 (Compact, proportional typography and card density)
- **Icons**: React Icons (`react-icons/fi`)
- **Authentication**: JWT client-side token storage with automatic request headers

---

## Environment Setup

Create an `.env` file in the `admin/` folder:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Visit `http://localhost:5175` to log in with your admin credentials.

---

## Features

- **Authentication**: Secure JWT token authentication with change password & password reset support.
- **Projects**: Create, edit, version, and delete projects with tags and live URLs.
- **Experience**: Manage work roles, date ranges, current status, and key achievements.
- **Skills**: Add and categorize technical competencies with proficiency levels.
- **Learning**: Track ongoing topics, progress statuses, and skill categories.
- **Certificates**: Record credentials, issue dates, and validation links.
- **Media**: Showcase screenshots, links, and video resources.
- **About & Profile**: Customize biography, headline, avatar, and social media handles.
- **Messages**: Review contact submissions, toggle saved/starred state, mark as read, or delete.

---

## Production Build

```bash
npm run build
```
Generates optimized static assets in `dist/`.