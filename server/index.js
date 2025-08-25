import express from 'express';
import cors from 'cors';
import startServer from './db.js'; 
import { login, register } from './controllers/UserController.js';
import { createApplication, deleteApplication, getApplicationById, getApplications } from './controllers/applicationController.js';
import { checkAuth } from './utils/checkAuth.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Регистрация, логин, получение своего профиля
app.post("/auth/register", register);
app.post("/auth/login", login);

app.post("/", checkAuth, createApplication);          // создать заявку
app.get("/", checkAuth, getApplications);            // получить все
app.get("/:id", checkAuth, getApplicationById);      // получить одну
app.delete("/:id", checkAuth, deleteApplication);


startServer(app);