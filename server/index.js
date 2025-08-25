import express from 'express';
import cors from 'cors';
import startServer from './db.js'; 
import { login, register } from './controllers/UserController.js';
import { createApplication, deleteApplication, getApplicationById, getApplications } from './controllers/applicationController.js';
import { checkAuth } from './utils/checkAuth.js';


const app = express();


app.use(cors());
app.use(express.json());


app.post("/auth/register", register);
app.post("/auth/login", login);

app.post("/", checkAuth, createApplication);         
app.get("/", checkAuth, getApplications);           
app.get("/:id", checkAuth, getApplicationById);      
app.delete("/:id", checkAuth, deleteApplication);


startServer(app);