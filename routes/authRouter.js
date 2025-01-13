import { Router } from 'express';
import { login, register, logout } from '../controllers/authController.js';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middlewares/validation.js';

const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);

export default router;
