const express = require('express');
const { config } = require('dotenv');
const { connectDB, disconnectDB } = require('./config/db');

//Routes Imports
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');

//ENV Variables
const PORT = process.env.PORT || 3000;


config();
connectDB();

const app = express();

// Body parsing middlwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/watchlist", watchlistRoutes);

//Health Check
app.get('/health', (req, res)=>{
    res.status(200).json({message: 'Server is running'});
});

const server = app.listen(process.env.PORT || 5001, "0.0.0.0", () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});

//Disconnect from database
// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
      await disconnectDB();
      process.exit(1);
    });
  });
  
  // Handle uncaught exceptions
  process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception:", err);
    await disconnectDB();
    process.exit(1);
  });
  
  // Graceful shutdown
  process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  });