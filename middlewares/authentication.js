import {
  BADREQUEST,
  UNAUTHENTICATED,
  UNAUTHORIZED,
} from '../errors/customErrors.js';
import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UNAUTHENTICATED('authentication failed');

  try {
    const { userId, role } = jwt.verify(token, process.env.JWT_SECRET);
    const demoUser = userId === '677d1dad37295cab364a459a';
    req.user = { userId, role, demoUser };
    next();
  } catch (error) {
    throw new UNAUTHENTICATED('authentication failed');
  }
};

export const permissions =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UNAUTHORIZED('permission denied');
    next();
  };

export const checkDemoUser = (req, res, next) => {
  if (req.user.demoUser) throw new BADREQUEST('Demo user. Read Only...!');
  next();
};
