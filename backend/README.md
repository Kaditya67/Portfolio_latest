# Portfolio Backend API

The Node.js and Express RESTful API powering the portfolio public site and admin control panel.

---

## Tech Stack & Architecture

- **Runtime**: Node.js >= 18 (ECMAScript Modules)
- **Framework**: Express.js v5
- **Database**: MongoDB via Mongoose v8
- **Authentication**: Stateless JWT token authentication with bcrypt password hashing
- **Validation**: Strict schema validation with Zod v4
- **Performance**: In-memory response caching (`node-cache`), response compression (`compression`)
- **Security**: Helmet, CORS origin whitelisting, rate limiting (`express-rate-limit`)

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URLS=http://localhost:5173
ADMIN_URLS=http://localhost:5175
COOKIE_DOMAIN=localhost
ADMIN_SETUP_TOKEN=admin-setup-token-2025
PASSWORD_MIN_LENGTH=8
RESET_TOKEN_EXPIRES_MIN=15
```

### 3. Seed Admin Account (Optional)
To generate an initial admin credential:
```bash
node scripts/seed-admin.js
```

### 4. Run Development Server
```bash
npm run dev
```
The server will start at `http://localhost:5000`.

---

## API Endpoints (`/api/v1`)

| Domain | Method | Path | Auth Required | Description |
|---|---|---|---|---|
| **Health** | `GET` | `/health` | No | Health check and timestamp |
| **Auth** | `POST` | `/auth/login` | No | Login with email and password |
| **Auth** | `GET` | `/auth/me` | Yes (Admin) | Check current authenticated session |
| **Auth** | `POST` | `/auth/change-password`| Yes (Admin) | Change admin password |
| **Projects** | `GET` | `/projects` | No | List published projects |
| **Projects** | `GET` | `/projects/all` | Yes (Admin) | List all projects including versions |
| **Projects** | `POST` | `/projects` | Yes (Admin) | Create a new project |
| **Projects** | `PUT` | `/projects/:slug` | Yes (Admin) | Update an existing project |
| **Projects** | `DELETE`| `/projects/:slug` | Yes (Admin) | Delete project and subversions |
| **Experience**| `GET` | `/experience` | No | List work experiences |
| **Experience**| `POST` | `/experience` | Yes (Admin) | Add work experience |
| **Experience**| `PUT` | `/experience/:id` | Yes (Admin) | Edit work experience |
| **Experience**| `DELETE`| `/experience/:id` | Yes (Admin) | Remove work experience |
| **Skills** | `GET` | `/skills` | No | List all skills |
| **Skills** | `POST` | `/skills` | Yes (Admin) | Add a new skill |
| **Skills** | `PUT` | `/skills/:id` | Yes (Admin) | Edit a skill |
| **Skills** | `DELETE`| `/skills/:id` | Yes (Admin) | Remove a skill |
| **Learning** | `GET` | `/learning` | No | List ongoing & completed learning |
| **Certificates**| `GET`| `/certificates` | No | List certificates |
| **Media** | `GET` | `/media` | No | List media, screenshots, and links |
| **About** | `GET` | `/about` | No | Fetch about sections |
| **Profile** | `GET` | `/profile` | No | Fetch profile information |
| **Contact** | `POST` | `/contact` | No | Submit a new contact message |
| **Contact** | `GET` | `/contact` | Yes (Admin) | List submitted contact messages |
| **Contact** | `PATCH`| `/contact/:id/read` | Yes (Admin) | Mark message as read/unread |
| **Contact** | `PATCH`| `/contact/:id/save` | Yes (Admin) | Bookmark or save contact message |
| **Contact** | `DELETE`| `/contact/:id` | Yes (Admin) | Delete contact message |

---

## Deployment

The backend contains `vercel.json` for seamless serverless deployment or can be deployed to Node.js hosts (Render, Railway, Fly.io, DigitalOcean).