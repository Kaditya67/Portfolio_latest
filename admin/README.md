# Portfolio Admin — React + Vite

A clean React admin dashboard to manage portfolio content via backend APIs.

---

## Environment

Create a `.env` file with:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Install dependencies:

```bash
npm install
```

Copy environment variables (if provided):

```bash
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

Visit http://localhost:5175 and log in with your admin credentials.

---

## Features

- Authentication: JWT-based auth with httpOnly cookies
- Projects: Create, read, update, delete projects
- Skills: Manage skills with categories and levels
- Learning: Track topics you are learning
- Experience: Add, edit, and remove work experience
- Certificates: Manage certificates and credentials
- Media / Gallery: Upload and manage images/media
- Profile: Update personal information
- About: Edit the about section
- Contact: View and manage messages

---

## Architecture

- src/context/AuthContext.jsx — Authentication state and hooks
- src/api/client.js — API client wrapper for backend requests
- src/pages/ — Pages (Login, Dashboard)
- src/components/tabs/ — Tab components for each resource
- src/components/forms/ — Reusable forms
- src/components/lists/ — Reusable list components

---

## Extending

To add a new resource (e.g., Blog):

1. Add API methods to `src/api/client.js`.
2. Create `src/components/tabs/BlogTab.jsx`.
3. Create `src/components/forms/BlogForm.jsx`.
4. Create `src/components/lists/BlogList.jsx`.
5. Add the new tab to the `TABS` array in `src/pages/DashboardPage.jsx`.

---

## Build

Generate production files:

```bash
npm run build
```

The production-ready files will be generated in the `dist/` folder.

---

## License

MIT (or your preferred license)

---

## Contact

Aditya Ojha — Portfolio

---

If you want, I can combine the frontend, backend, and admin READMEs into a single top-level README for the whole repo. Would you like that?
