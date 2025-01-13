import { StatusCodes } from 'http-status-codes';
import Job from '../models/jobModel.js';
import User from '../models/userModel.js';
import cloudinary from 'cloudinary';
import { formatImage } from '../middlewares/multer.js';

export const getCurrentUser = async (req, res) => {
  const user = (await User.findOne({ _id: req.user.userId })).toJSON();
  res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    req.body.avatar = response.secure_url;
    req.body.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body);
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: 'user info updated' });
};
