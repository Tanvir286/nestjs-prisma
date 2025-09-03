import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dtos/createpost.dto';

@Injectable()
export class PostsService {

    constructor(private prisma: PrismaService) {}
    
   /*===============(Create Post start)==================*/
    async createPost(createPostDto: CreatePostDto) {
        // Destructure DTO
        const { title, description, userId } = createPostDto;

        // Check if user exists
        const user = await this.prisma.user.findUnique({
           where: { id: userId },
        });

        if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
        }

        // Create post
        return this.prisma.post.create({
            data: {
                title,
                description,
                authorId: userId,
            },
        });
   }

  /*===============(Get All Posts)==================*/

}
