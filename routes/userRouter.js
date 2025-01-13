import { Router } from 'express';
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middlewares/validation.js';
import { checkDemoUser, permissions } from '../middlewares/authentication.js';
import upload from '../middlewares/multer.js';

const router = Router();

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', permissions('admin'), getApplicationStats);
router.patch(
  '/update-user',
  checkDemoUser,
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser
);

export default router;
