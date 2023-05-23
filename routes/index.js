import express from 'express';
import indexController from '../controllers/indexController.js';
import auth from '../lib/auth.js';

const router = express.Router();

app.get("/", auth, indexController.startView);
app.get("/login", indexController.loginView);
app.get("/signup", indexController.signupView);

app.post("/login", indexController.login);
app.post("/signup", indexController.signup);
app.post("/logout", auth, indexController.logout);

export default router;