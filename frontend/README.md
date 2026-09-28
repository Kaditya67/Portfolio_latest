# Portfolio Frontend - React + Vite

The public-facing portfolio website built with React 19, Vite, and Tailwind CSS v4.

---

## Features

- **Sections & Pages**: Home, About, Projects, Experience, Learning, Certificates, Gallery/Media, Resume Viewer, and Contact.
- **Dynamic Content**: Connected to the backend API (`/api/v1`) with fallback data support.
- **Modern UI/UX**: Compact, proportional typography, dark/light theme switcher, and mobile drawer navigation.
- **Interactive Timelines & Filter Bars**: Filter and explore projects and experiences seamlessly.

---

## Tech Stack

- **Framework**: React 19 + Vite 7
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React (`lucide-react`)
- **PDF Viewer**: React-PDF for resume viewing

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in `frontend/`:
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### 3. Run Development Server
```bash
npm run dev
```
The site runs at `http://localhost:5173`.

---

## Production Build

```bash
npm run build
```
Outputs optimized production assets to `dist/`.