# Backend — Portfolio

This backend powers the portfolio site: API endpoints, authentication, data persistence, and an admin panel.

---

## Tech stack

- Runtime: Node.js >= 18  
- Framework: Express.js  
- Database: MongoDB (Atlas / Local)  
- Authentication: JWT  
- Other: Mongoose, dotenv, CORS  
- Optional: Docker & Docker Compose

---

## Prerequisites

- Node.js and npm installed  
- MongoDB Atlas or local MongoDB instance  
- Optional: Docker & Docker Compose

---

## Quickstart

1. Clone the repo and change directory:

```bash
git clone https://github.com/Kaditya67/Portfolio_latest.git
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Copy example env and edit values:

```bash
cp .env.example .env
```

Edit `.env` and set values (do not commit secrets):

```
PORT=3000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<a_long_random_secret>
FRONTEND_URLS=http://localhost:5173,http://localhost:3000
ADMIN_URLS=http://localhost:5175
NODE_ENV=development
COOKIE_DOMAIN=localhost

# Optional
ADMIN_SETUP_TOKEN=admin-setup-token-2025
PASSWORD_MIN_LENGTH=8
RESET_TOKEN_EXPIRES_MIN=15
```

4. Run dev server:

```bash
npm run dev
```

The API will be available at http://localhost:3000 (or the PORT you set).

---

## Common scripts

- Start dev server: npm run dev  
- Start production server: npm start  
- Lint: npm run lint  
- Format: npm run format  
- Test: npm test

---

## API endpoints

| Method | Path                 | Description                     |
|--------|----------------------|---------------------------------|
| GET    | /health              | Health check (returns 200)      |
| GET    | /api/projects        | List all projects               |
| POST   | /api/contact         | Send contact message            |
| POST   | /api/auth/login      | Login user / admin              |
| POST   | /api/auth/register   | Register new user / admin       |

Consider adding OpenAPI/Swagger docs (e.g. at /docs) for easier testing.

---

## Database & migrations

- Use MongoDB Atlas or local MongoDB.  
- Mongoose schemas and models live in src/models/  
- Optional seeders/scripts in src/scripts/

---

## Recommended folder structure

```
backend/
├─ src/
│  ├─ controllers/
│  ├─ services/
│  ├─ models/
│  ├─ routes/
│  ├─ middlewares/
│  ├─ config/
│  └─ utils/
├─ tests/
├─ scripts/
├─ .env.example
├─ package.json
├─ Dockerfile
└─ docker-compose.yml
```

---

## Docker (optional)

Build and run:

```bash
docker build -t portfolio-backend .
docker-compose up
```

---

## Contributing

- Open issues for bugs/features  
- Use feature branches and PRs  
- Follow code style, run lint/tests before PR

---

## License

MIT (or choose your preferred license)

---

## Contact

Aditya Ojha — Portfolio