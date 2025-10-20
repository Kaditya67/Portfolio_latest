# Frontend - Portfolio

This is the frontend application for the portfolio site, built with React + Vite. It powers public pages like Home, About, Projects, Experience, Learning, Certificates, Gallery, Resume, and Contact.

---

## Features

- Responsive design (desktop & mobile)
- Dark / light theme toggle
- Interactive project & learning timelines
- Built with Tailwind CSS
- Animations via Framer Motion
- Optional dynamic content from backend APIs

---

## Project structure

```
frontend/
├─ src/
│  ├─ api/          # API calls to backend
│  ├─ components/   # Reusable UI components
│  ├─ pages/        # Page components
│  ├─ data/         # Static fallback data (skills, projects, learning)
│  ├─ main.jsx      # App entry point
│  └─ index.css     # Tailwind & global styles
├─ public/          # Static assets (favicons, images)
├─ vite.config.js   # Vite config
└─ package.json
```

---

## Setup

### Prerequisites
- Node.js 16+ (or your project's supported version)
- npm or pnpm/yarn

### Install dependencies
```bash
cd frontend
npm install
```

### Run development server
```bash
npm run dev
```
The app will typically run at http://localhost:5173 (or the port Vite assigns).

### Build for production
```bash
npm run build
```
Production assets will be output to the `dist/` folder.

### Linting & formatting
```bash
npm run lint     # if configured (ESLint)
npm run format   # if a formatter script is available (Prettier)
```

---

## Environment & configuration

- Use an `.env` file (or `.env.local`) to set environment variables. Example for Vite:
```
VITE_API_URL=https://api.example.com
```
- Ensure the backend API URL is set correctly for production.

---

## Deployment

- Can be deployed to Vercel, Netlify, GitHub Pages, or any static host.
- Build locally (`npm run build`) and upload the `dist/` folder or connect your repo to the hosting service.

---

## Notes & Extensions

- ESLint is recommended for code quality. Consider adding TypeScript with `typescript` + `typescript-eslint` if you want static typing.
- React Fast Refresh is supported via `@vitejs/plugin-react` or `@vitejs/plugin-react-swc`.
- Data can be fetched from backend APIs; `src/data/` provides static fallback content.

---

## Resources

- React docs
- Vite docs
- Tailwind CSS
- Framer Motion

---

This README is frontend-focused. If you want, I can also create a similar README for an admin panel with instructions to connect it to the backend.
