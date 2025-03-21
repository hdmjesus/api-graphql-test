import { Query, Mutation, Resolver, Args, } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post-dto';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  newPost(@Args('postInput') post: CreatePostInput) {
    return this.postService.createPost(post);
  }
  @Query(() => [Post])
  getPosts() {
    return this.postService.getPosts();
  }

  @Query(() => Post)
  getPostById(@Args('postId', { type: () => String }) postId: string) {
    return this.postService.getPostById(postId);
  }
}
