import dotenv from 'dotenv';
import express from 'express';


//Routes Imports
import movieRoutes from './routes/movieRoutes.js';

//ENV Variables
const PORT = process.env.PORT || 5001;


const app = express();

//API Routes
app.use("/movies", movieRoutes);


//Health Check
app.get('/health', (req, res)=>{
    res.status(200).json({message: 'Server is running'});
});

const server = app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
