import express from 'express';
import { validateRegister, validateLogin, validateRefresh } from '../middlewares/validation.js';
import { AuthController } from '../controllers/authController.js';

const router = express.Router();

// Register a user 
router.post('/register', validateRegister, AuthController.register);

// Login a user 
router.post('/login', validateLogin, AuthController.login)

// Refresh User's Access Token 
router.post('/refresh', validateRefresh, AuthController.refresh);

// Log out a user
router.post ('/logout', AuthController.logout);

export default router;


