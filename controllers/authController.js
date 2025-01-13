import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { UNAUTHENTICATED } from '../errors/customErrors.js';
import jwt from 'jsonwebtoken';

/**
 * REGISTER USER
 */
export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created', user });
};

/**
 * LOGIN USER
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const isValidUser = user && (await bcrypt.compare(password, user.password));
  if (!isValidUser) throw new UNAUTHENTICATED('invalid credentials');

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged in' });
};

/**
 * LOGOUT USER
 */
export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out' });
};
