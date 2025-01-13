import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler.js';
import { authenticateUser } from './middlewares/authentication.js';
import jobsRouter from './routes/jobsRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './client/dist')));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/jobs', authenticateUser, jobsRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandler);

// Start Server
const port = process.env.PORT || 4000;

try {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
  });
} catch (error) {
  console.error('Failed to connect to MongoDB:', error.message);
  process.exit(1);
}
