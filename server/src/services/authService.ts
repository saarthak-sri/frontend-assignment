import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { config } from '../config';
import { AppError } from '../utils/AppError';

const SALT_ROUNDS = 12;

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthPayload {
  userId: string;
  email: string;
}

export const authService = {
  async register(input: RegisterInput) {
    const existing = await User.findOne({ email: input.email.toLowerCase() });
    if (existing) {
      throw new AppError('Email already registered', 400);
    }
    const hashed = await bcrypt.hash(input.password, SALT_ROUNDS);
    const user = await User.create({
      name: input.name.trim(),
      email: input.email.toLowerCase().trim(),
      password: hashed,
    });
    const token = generateToken({ userId: user._id.toString(), email: user.email });
    return { user: toUserResponse(user), token };
  },

  async login(input: LoginInput) {
    const user = await User.findOne({ email: input.email.toLowerCase() }).select('+password');
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }
    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) {
      throw new AppError('Invalid email or password', 401);
    }
    const token = generateToken({ userId: user._id.toString(), email: user.email });
    return { user: toUserResponse(user), token };
  },

  async getMe(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return toUserResponse(user);
  },
};

function generateToken(payload: AuthPayload): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  } as jwt.SignOptions);
}

function toUserResponse(user: { _id: unknown; name: string; email: string; createdAt: Date; updatedAt: Date }) {
  return {
    id: (user as { _id: { toString: () => string } })._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
