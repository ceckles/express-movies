# Backend Express API

A RESTful API built with Express.js, Prisma ORM, and PostgreSQL for managing movies and user watchlists. Features JWT authentication and Zod validation for request validation.

## 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E63DD?style=for-the-badge&logo=zod&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

- **Runtime:** Node.js
- **Framework:** Express.js 5.2.1
- **Database:** PostgreSQL (via Neon)
- **ORM:** Prisma 6.19.0
- **Authentication:** JWT (jsonwebtoken)
- **Validation:** Zod
- **Password Hashing:** bcryptjs
- **Environment Variables:** dotenv
- **Package Manager:** pnpm
- **Containerization:** Docker
- **Deployment:** Fly.io

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)
- PostgreSQL database (Neon, local, or cloud)
- Git

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
| `PORT` | Server port | No | `5001` (dev) / `3000` (production/Fly.io) |
| `NODE_ENV` | Environment mode | No | `development`/`production` |

### Database Setup

1. Create a PostgreSQL database (or use Neon)
2. Copy your connection string to `DATABASE_URL` in `.env`
3. Run migrations: `npx prisma migrate dev`

## 🏃 Running the Project

### Development Mode
```bash
pnpm run dev
```
Starts the server with nodemon for auto-reloading.

### Production Mode
```bash
node src/server.js
```

The server will start on `http://localhost:5001` (or your configured PORT).

## 🚀 Deployment

### Fly.io

The application is deployed on [Fly.io](https://fly.io) at: **https://express-movies.fly.dev**

#### Prerequisites
- Fly.io CLI installed (`flyctl`)
- Fly.io account

#### Deployment Steps

1. **Install Fly.io CLI** (if not already installed)
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login to Fly.io**
   ```bash
   fly auth login
   ```

3. **Set environment variables/secrets**
   ```bash
   fly secrets set DATABASE_URL="your-database-url"
   fly secrets set JWT_SECRET="your-jwt-secret"
   fly secrets set JWT_EXPIRES_IN="7d"
   fly secrets set PORT=3000
   fly secrets set NODE_ENV="production"
   ```

4. **Deploy**
   ```bash
   fly deploy
   ```

#### Fly.io Configuration

- **Internal Port:** 3000 (configured in `fly.toml`)
- **Auto-scaling:** Enabled (machines auto-start/stop)
- **Region:** dfw (Dallas)

**Note:** The app listens on `0.0.0.0` in production to allow external connections.

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
│   │   ├── movieController.js
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
│   │   ├── movieValidator.js
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
| `pnpm run dev` | Start development server with nodemon |
| `pnpm run seed:movies` | Seed database with movie data |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma migrate dev` | Run database migrations |
| `npx prisma studio` | Open Prisma Studio (database GUI) |

## 🔐 Authentication & Authorization

The API uses JWT (JSON Web Tokens) for authentication. 

1. **Register/Login** to get a token
2. Include the token in the `Authorization` header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```
3. Protected routes require valid authentication

### Authorization Rules

- **Movies**: Only the creator of a movie can update or delete it
- **Watchlist**: Users can only manage their own watchlist items
- **Public Endpoints**: GET requests for movies are public (no auth required)

## ✅ Request Validation

The API uses **Zod** for request validation. All incoming request bodies are validated against predefined schemas before processing.

### Validation Middleware

The `validateRequestMiddleware` validates request bodies using Zod schemas:

```javascript
router.post('/', authMiddleware, validateRequestMiddleware(schema), controller);
```

### Available Validators

- **authValidator.js** - Validates registration and login requests
  - `registerUserSchema` - Validates user registration
  - `loginUserSchema` - Validates user login
- **movieValidator.js** - Validates movie operations
  - `createMovieSchema` - Validates creating movies (title, releaseYear required)
  - `updateMovieSchema` - Validates updating movies (all fields optional)
- **watchlistValidator.js** - Validates watchlist operations
  - `addToWatchlistSchema` - Validates adding movies to watchlist
  - `updateWatchlistItemSchema` - Validates updating watchlist items

### Validation Features

- **Type Safety** - Ensures correct data types (UUID, string, number, enum)
- **Custom Error Messages** - Provides clear validation error messages
- **Automatic Coercion** - Converts compatible types (e.g., string to number)
- **Field Constraints** - Enforces min/max values, string lengths, and enum values

### Movie Validation Rules

- **title**: Required string (min 1 character)
- **overview**: Optional string
- **releaseYear**: Required integer (1888 to current year + 10)
- **genres**: Optional array of strings (defaults to empty array)
- **runtime**: Optional positive integer (in minutes)
- **posterUrl**: Optional valid URL string

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
- `400` - Bad Request (validation errors, invalid input)
- `401` - Unauthorized (invalid or missing authentication)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error (server/database errors)

**Validation Errors:**
When request validation fails (Zod), the API returns a `400 Bad Request` with a message containing all validation errors.



## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support, open an issue in the repository.

