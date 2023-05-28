import express from 'express';
import indexController from '../controllers/indexController.js';
import auth from '../lib/auth.js';

const router = express.Router();

router.get("/", auth, indexController.startView);
router.get("/login", indexController.loginView);
router.get("/signup", indexController.signupView);

router.post("/login", indexController.login);
router.post("/signup", indexController.signup);
router.get("/logout", auth, indexController.logout);

export default router;