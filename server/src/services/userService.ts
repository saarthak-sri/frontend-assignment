import { User } from '../models/User';
import { AppError } from '../utils/AppError';

export interface UpdateProfileInput {
  name?: string;
  email?: string;
}

export const userService = {
  async updateProfile(userId: string, input: UpdateProfileInput) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (input.email !== undefined) {
      const existing = await User.findOne({ email: input.email.toLowerCase(), _id: { $ne: userId } });
      if (existing) {
        throw new AppError('Email already in use', 400);
      }
      user.email = input.email.toLowerCase().trim();
    }
    if (input.name !== undefined) {
      user.name = input.name.trim();
    }
    await user.save();
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
};
