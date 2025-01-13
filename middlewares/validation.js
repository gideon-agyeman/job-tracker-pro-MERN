import { body, param, validationResult } from 'express-validator';
import { BADREQUEST, NOTFOUND, UNAUTHORIZED } from '../errors/customErrors.js';
import mongoose from 'mongoose';
import { JOB_STATUS, JOB_TYPE, ROLE } from '../utils/constants.js';
import Job from '../models/jobModel.js';
import User from '../models/userModel.js';

const withValidationErrors = (validationData) => {
  return [
    validationData,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('no job')) {
          throw new NOTFOUND('no item matches your search');
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw UNAUTHORIZED('not authorized to access this resource');
        }
        throw new BADREQUEST(errorMessages);
      }
      next();
    },
  ];
};

/**
 * JOB INPUT VALIDATION MIDDLEWARE
 */
export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('Company name must be provided'),
  body('position').notEmpty().withMessage('Position must be provided'),
  body('jobLocation').notEmpty().withMessage('Job location must be provided'),
  body('jobStatus') // Fixed typo
    .isIn(Object.values(JOB_STATUS))
    .withMessage('Invalid status value'),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('Invalid type value'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BADREQUEST('invalid input');
    const job = await Job.findById(value);
    if (!job) throw new NOTFOUND('no item matches your search');
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UNAUTHORIZED('not authorized to access this resource');
  }),
]);

/**
 * USER VALIDATION MIDDLEWARE
 */
export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name must be provided'),
  body('lastName').notEmpty().withMessage('last name must be provided'),
  body('email')
    .notEmpty()
    .withMessage('email must be provided')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BADREQUEST('email already exist');
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  body('location').notEmpty().withMessage('location must be provided'),
  // body('role').isIn(Object.values(ROLE)).withMessage('invalid role value'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name must be provided'),
  body('lastName').notEmpty().withMessage('last name must be provided'),
  body('email')
    .notEmpty()
    .withMessage('email must be provided')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId)
        throw new BADREQUEST('email already exist');
    }),
]);
