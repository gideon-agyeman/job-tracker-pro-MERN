import mongoose from 'mongoose';
import { ROLE } from '../utils/constants.js';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  location: {
    type: String,
    default: 'your city',
  },
  role: {
    type: String,
    enum: Object.values(ROLE),
    default: ROLE.USER,
  },
  avatar: String,
  avatarPublicId: String,
});

UserSchema.methods.toJSON = function () {
  let userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model('User', UserSchema);
