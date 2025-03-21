/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    @InjectModel(Post.name)
    private userModel: Model<UserDocument>,
  ) {}
  async create(createUserInput: CreateUserInput) {
    return this.userModel.create(createUserInput);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findById(id).populate('posts').exec();

    if (!user) {
      throw new NotFoundException('Post not found');
    }
    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserInput, { new: true }) // `new: true` retorna el documento actualizado
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found after update');
    }

    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userModel.deleteOne({ _id: id }).exec();
  }

  async deleteAllPostsFromUser(id: string) {
    await this.userModel.updateOne(
      { _id: '67dd5cf91be31b37a583ddbb' },
      { $set: { posts: [] } },
    );
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.posts = [];
    return await user.save();
  }
}
