import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post.entity';
import { Model } from 'mongoose';
import { CreatePostInput } from './dto/create-post-dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<Post>,
  ) {}
  async createPost(createPostDto: CreatePostInput): Promise<Post> {
    const createdPost = await this.postModel.create(createPostDto);
    return createdPost.toObject();
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
