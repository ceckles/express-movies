# Backend Express API

A RESTful API built with Express.js, Prisma ORM, and PostgreSQL for managing movies and user watchlists. Features JWT authentication and Zod validation for request validation.

## 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E63DD?style=for-the-badge&logo=zod&logoColor=white)
![Doppler](https://img.shields.io/badge/Doppler-9f6afe?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkwxMy4wOSA4LjI2TDIwIDlMMTMuMDkgMTUuNzRMMTIgMjJMMTAuOTEgMTUuNzRMNCA5TDEwLjkxIDguMjZMMTIgMloiIGZpbGw9IndoaXRlIi8+PC9zdmc+)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

- **Runtime:** Node.js
- **Framework:** Express.js 5.2.1
- **Database:** PostgreSQL (via Neon)
- **ORM:** Prisma 6.19.0
- **Authentication:** JWT (jsonwebtoken)
- **Validation:** Zod
- **Password Hashing:** bcryptjs
- **Environment Variables:** dotenv / Doppler
- **Secrets Management:** Doppler
- **Package Manager:** pnpm

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)
- PostgreSQL database (Neon, local, or cloud)
- Git
- Doppler CLI (optional, for secrets management)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend-express
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   **Option A: Using Doppler (Recommended)**
   
   Install Doppler CLI:
   ```bash
   # Linux/macOS
   curl -L --tlsv1.2 --proto "=https" -sSf https://cli.doppler.com/install.sh | sh
   
   # Or using Homebrew (macOS)
   brew install doppler
   
   # Or using npm/pnpm
   pnpm add -g doppler-cli
   ```
   
   Authenticate with Doppler:
   ```bash
   doppler login
   ```
   
   Link your project to a Doppler config:
   ```bash
   doppler setup
   ```
   
   This will prompt you to select:
   - Your Doppler project
   - The config (e.g., `dev`, `staging`, `prod`)
   
   **Option B: Using .env file (Local Development)**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database"
   JWT_SECRET="your-secret-key-here"
   JWT_EXPIRES_IN="7d"
   PORT=5001
   NODE_ENV="development"
   ```

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

6. **Seed the database (optional)**
   ```bash
   pnpm run seed:movies
   ```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | - |
| `JWT_EXPIRES_IN` | JWT token expiration time | No | `7d` |
| `PORT` | Server port | No | `5001` (dev) / `3000` (production) |
| `NODE_ENV` | Environment mode | No | `development`/`production` |

### Secrets Management with Doppler

This project supports **Doppler** for secure secrets management. Doppler allows you to:
- Store secrets securely in the cloud
- Manage different configs (dev, staging, prod) per environment
- Sync secrets across team members
- Rotate secrets without code changes
- Audit secret access

**Setting up Doppler:**

1. **Create a Doppler account** at [doppler.com](https://doppler.com)

2. **Create a project** in the Doppler dashboard

3. **Add your secrets** to Doppler:
   - Go to your project → Config (e.g., `dev`)
   - Add all required environment variables:
     - `DATABASE_URL`
     - `JWT_SECRET`
     - `JWT_EXPIRES_IN`
     - `PORT`
     - `NODE_ENV`

4. **Authenticate with Doppler:**
   ```bash
   doppler login
   ```

5. **Verify secrets are loaded:**
   ```bash
   doppler secrets -p backend-express -c dev
   ```

**Using Doppler in different environments:**

The project is configured to use the `backend-express` Doppler project. The scripts automatically use the correct config:

```bash
# Development (uses dev config)
pnpm run dev
# Equivalent to: doppler run -p backend-express -c dev -- nodemon src/server.js

# Production (uses prod config)
pnpm run start
# Equivalent to: doppler run -p backend-express -c prod -- node src/server.js

# For other configs, run directly:
doppler run -p backend-express -c staging -- node src/server.js
```

**Note:** The default scripts (`pnpm run dev`, `pnpm run start`) use Doppler with the `backend-express` project. Use `dev:local` or `start:local` scripts if you prefer using `.env` files.

### Database Setup

1. Create a PostgreSQL database (or use Neon)
2. Add `DATABASE_URL` to your Doppler config or `.env` file
3. Run migrations: `npx prisma migrate dev`

## 🏃 Running the Project

### Development Mode

**With Doppler (Recommended):**
```bash
pnpm run dev
```
This uses Doppler to inject environment variables and starts the server with nodemon for auto-reloading.

**With .env file (Local):**
```bash
pnpm run dev:local
```

### Production Mode

**With Doppler:**
```bash
pnpm run start
```

**With .env file:**
```bash
pnpm run start:local
```

The server will start on `http://localhost:5001` (or your configured PORT).

**Note:** Make sure you have either:
- Doppler configured (`doppler setup`) and authenticated (`doppler login`), OR
- A `.env` file in the root directory with all required variables

## 🚀 Deployment

The application can be deployed to any platform that supports Node.js applications (e.g., Heroku, Railway, Render, AWS, DigitalOcean, etc.).

### Deployment with Doppler

Doppler provides seamless integration with most deployment platforms:

1. **Install Doppler CLI** in your deployment environment
2. **Authenticate** using a service token:
   ```bash
   doppler configure set token <service-token>
   ```
3. **Update your start command** to use Doppler with the project and config:
   ```bash
   doppler run -p backend-express -c prod -- node src/server.js
   ```
   
   Or use the npm script:
   ```bash
   pnpm run start
   ```

**Platform-specific guides:**
- [Railway + Doppler](https://docs.doppler.com/docs/railway)
- [Render + Doppler](https://docs.doppler.com/docs/render)
- [Heroku + Doppler](https://docs.doppler.com/docs/heroku)
- [AWS + Doppler](https://docs.doppler.com/docs/aws)
- [Docker + Doppler](https://docs.doppler.com/docs/docker)

### Deployment with Environment Variables

**Note:** Make sure to set all required environment variables when deploying. The app listens on `0.0.0.0` in production to allow external connections.

For platforms that don't support Doppler, set environment variables directly in your platform's dashboard or configuration.

## 📡 API Endpoints

### Authentication (`/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/logout` | Logout user | No |

**Register Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Movies (`/movies`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/movies` | Get all movies | No |
| GET | `/movies/:id` | Get movie by ID | No |
| POST | `/movies` | Create a new movie | Yes |
| PUT | `/movies/:id` | Update a movie (creator only) | Yes |
| DELETE | `/movies/:id` | Delete a movie (creator only) | Yes |

**Create Movie Request Body:**
```json
{
  "title": "The Matrix",
  "overview": "A computer hacker learns about the true nature of reality",
  "releaseYear": 1999,
  "genres": ["Action", "Sci-Fi"],
  "runtime": 136,
  "posterUrl": "https://example.com/poster.jpg"
}
```

**Update Movie Request Body:**
```json
{
  "title": "The Matrix Reloaded",
  "overview": "Neo continues his journey",
  "releaseYear": 2003,
  "genres": ["Action", "Sci-Fi"],
  "runtime": 138,
  "posterUrl": "https://example.com/poster2.jpg"
}
```

**Delete Movie Response:**
```json
{
  "status": "success",
  "message": "Movie deleted successfully"
}
```

**Note:** All fields in the update request are optional. Only the creator of a movie can update or delete it.

### Watchlist (`/watchlist`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/watchlist` | Add movie to watchlist | Yes |
| PUT | `/watchlist/:id` | Update watchlist item | Yes |
| DELETE | `/watchlist/:id` | Remove movie from watchlist | Yes |

**Add to Watchlist Request Body:**
```json
{
  "movieId": "uuid",
  "status": "PLANNED",
  "rating": 5,
  "notes": "Looking forward to watching this"
}
```

**Update Watchlist Request Body:**
```json
{
  "status": "COMPLETED",
  "rating": 8,
  "notes": "Great movie!"
}
```

**Watchlist Status Values:**
- `PLANNED`
- `WATCHING`
- `COMPLETED`
- `DROPPED`

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |

## 📁 Project Structure

```
backend-express/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Database migrations
│   └── seed.js           # Database seed file
├── src/
│   ├── config/
│   │   └── db.js         # Database connection
│   ├── controllers/
│   │   ├── authController.js
│   │   └── watchlistController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validateRequestMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── movieRoutes.js
│   │   └── watchlistRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── validators/
│   │   ├── authValidator.js
│   │   └── watchlistValidator.js
│   └── server.js         # Application entry point
├── .env                  # Environment variables (not in git)
├── .gitignore
├── package.json
└── README.md
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm run dev` | Start development server with nodemon (uses Doppler) |
| `pnpm run dev:local` | Start development server with nodemon (uses .env file) |
| `pnpm run start` | Start production server (uses Doppler) |
| `pnpm run start:local` | Start production server (uses .env file) |
| `pnpm run seed:movies` | Seed database with movie data (uses Doppler) |
| `pnpm run seed:movies:local` | Seed database with movie data (uses .env file) |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma migrate dev` | Run database migrations |
| `npx prisma studio` | Open Prisma Studio (database GUI) |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. 

1. **Register/Login** to get a token
2. Include the token in the `Authorization` header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```
3. Protected routes require valid authentication

## ✅ Request Validation

The API uses **Zod** for request validation. All incoming request bodies are validated against predefined schemas before processing.

### Validation Middleware

The `validateRequestMiddleware` validates request bodies using Zod schemas:

```javascript
router.post('/', authMiddleware, validateRequestMiddleware(schema), controller);
```

### Available Validators

- **authValidator.js** - Validates registration and login requests
- **watchlistValidator.js** - Validates watchlist operations
  - `addToWatchlistSchema` - Validates adding movies to watchlist
  - `updateWatchlistItemSchema` - Validates updating watchlist items

### Validation Features

- **Type Safety** - Ensures correct data types (UUID, string, number, enum)
- **Custom Error Messages** - Provides clear validation error messages
- **Automatic Coercion** - Converts compatible types (e.g., string to number)
- **Field Constraints** - Enforces min/max values, string lengths, and enum values

Invalid requests return a `400 Bad Request` with detailed error messages.

## 🗄️ Database Schema

### Models

- **User** - User accounts with authentication
  - `id` (UUID)
  - `name` (String)
  - `email` (String, unique)
  - `password` (String, hashed)
  - `createdAt` (DateTime)

- **Movie** - Movie information
  - `id` (UUID)
  - `title` (String)
  - `overview` (String, optional)
  - `releaseYear` (Int)
  - `genres` (String array)
  - `runtime` (Int, optional)
  - `posterUrl` (String, optional)
  - `createdBy` (String, foreign key to User)
  - `createdAt` (DateTime)

- **WatchlistItem** - User's watchlist entries
  - `id` (UUID)
  - `userId` (String, foreign key to User)
  - `movieId` (String, foreign key to Movie)
  - `status` (WatchlistStatus enum)
  - `rating` (Int, optional)
  - `notes` (String, optional)
  - `createdAt` (DateTime)
  - `updatedAt` (DateTime)

See `prisma/schema.prisma` for full schema details.

## 🛠️ Development

### Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View database in browser
npx prisma studio
```

### Error Handling

The API uses try/catch blocks for error handling and returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors, invalid input, missing required fields)
- `401` - Unauthorized (invalid or missing authentication)
- `403` - Forbidden (insufficient permissions, e.g., not the creator)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (resource cannot be deleted due to foreign key constraints)
- `500` - Internal Server Error (server/database errors)

**Validation Errors:**
When request validation fails (Zod), the API returns a `400 Bad Request` with a message containing all validation errors.



## 🤝 Contributing

Contributions, issues, and feature requests are welcome!