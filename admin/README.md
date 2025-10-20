# Portfolio Admin - React

A clean, pure React admin dashboard to manage your portfolio content via backend APIs.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` from `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:5175` and login with your admin credentials.

## Features

- **Login/Auth**: JWT-based authentication with httpOnly cookies
- **Projects**: Create, read, update, delete projects
- **Skills**: Manage your skills with levels and categories
- **Learning**: Track what you're learning
- **Experience**: Manage work experience
- **Certificates**: Add certificates and credentials
- **Media**: Manage gallery images and media
- **Profile**: Edit your profile info
- **About**: Update your about section
- **Contact**: View and manage contact messages

## Architecture

- `src/context/AuthContext.jsx` - Authentication state
- `src/api/client.js` - API client with fetch wrapper
- `src/pages/` - Page components (Login, Dashboard)
- `src/components/tabs/` - Tab components for each resource
- `src/components/forms/` - Reusable form components
- `src/components/lists/` - Reusable list components

## Extending

To add a new resource (e.g., Blog):

1. Add API methods to `src/api/client.js`
2. Create `src/components/tabs/BlogTab.jsx`
3. Create `src/components/forms/BlogForm.jsx`
4. Create `src/components/lists/BlogList.jsx`
5. Add to TABS array in `src/pages/DashboardPage.jsx`

## Build

```bash
npm run build
```

Output goes to `dist/`.
