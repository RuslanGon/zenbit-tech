import express from 'express';
import cors from 'cors';
import startServer from './db.js'; 


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


startServer(app);