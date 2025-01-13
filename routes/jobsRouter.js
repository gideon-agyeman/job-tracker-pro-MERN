import { Router } from 'express';
import {
  getAllJobs,
  getSingleJob,
  createJob,
  editJob,
  deleteJob,
  getApplicationStats,
} from '../controllers/jobsController.js';
import {
  validateIdParam,
  validateJobInput,
} from '../middlewares/validation.js';
import { checkDemoUser } from '../middlewares/authentication.js';

const router = Router();

router
  .route('/')
  .get(getAllJobs)
  .post(checkDemoUser, validateJobInput, createJob);

router.route('/stats').get(getApplicationStats);

router
  .route('/:id')
  .get(validateIdParam, getSingleJob)
  .patch(checkDemoUser, validateIdParam, validateJobInput, editJob)
  .delete(checkDemoUser, validateIdParam, deleteJob);

export default router;
