# Backend Express API

A RESTful API built with Express.js, Prisma ORM, and PostgreSQL for managing movies and user watchlists.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5.2.1
- **Database:** PostgreSQL (via Neon)
- **ORM:** Prisma 6.19.0
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Environment Variables:** dotenv
- **Package Manager:** pnpm

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
| `PORT` | Server port | No | `5001` |
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
node scr/server.js
```

The server will start on `http://localhost:5001` (or your configured PORT).

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
├── scr/
│   ├── config/
│   │   └── db.js         # Database connection
│   ├── controllers/
│   │   ├── authController.js
│   │   └── watchlistController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── movieRoutes.js
│   │   └── watchlistRoutes.js
│   ├── utils/
│   │   └── generateToken.js
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

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. 

1. **Register/Login** to get a token
2. Include the token in the `Authorization` header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```
3. Protected routes require valid authentication

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
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error



## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support, open an issue in the repository.

