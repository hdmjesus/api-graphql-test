import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post.entity';
import { Model } from 'mongoose';
import { CreatePostInput } from './dto/create-post-dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async createPost(createPostDto: CreatePostInput): Promise<Post> {
    const createdPost = (await this.postModel.create(createPostDto)).toObject();
    const user = await this.userModel.findById(createPostDto.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.posts.push(createdPost._id);
    await user.save();
    return createdPost;
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).exec();

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post.toObject();
  }
}
