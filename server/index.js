import express from 'express';
import cors from 'cors';
import startServer from './db.js'; 
import { login, register } from './controllers/UserController.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Регистрация, логин, получение своего профиля
app.post("/auth/register", register);
app.post("/auth/login", login);


startServer(app);