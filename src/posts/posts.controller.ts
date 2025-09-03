import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/createpost.dto';

@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService) {}

    /*===============(Create User start)==================*/
    @Post('create')
    async createPost(@Body() createPostDto: CreatePostDto) {
        return this.postsService.createPost(createPostDto);
    }
    /*===============(Create User end)==================*/


    

}
