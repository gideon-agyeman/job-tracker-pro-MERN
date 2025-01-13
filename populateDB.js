import dotenv from 'dotenv';
dotenv.config();

import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import Job from './models/jobModel.js';
import User from './models/userModel.js';

try {
  await mongoose.connect(process.env.MONGODB_URI);
  const user = await User.findOne({ email: 'demoUser@gmail.com' });

  const jobs = JSON.parse(
    await readFile(new URL('./utils/MOCK_DATA.json', import.meta.url))
  ).map((job) => ({ ...job, createdBy: user._id }));

  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);

  console.log('jobs added...');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
