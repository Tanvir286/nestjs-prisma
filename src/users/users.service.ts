import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/createuser.dto';
import { UpdateUserDto } from './dtos/updateuser.dto';
import { UpdateUserSettingsDto } from './dtos/updateuser_setting.dto';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}


    /*===============(Create User start)==================*/
   async createUser(data: CreateUserDto) {
    const user = await this.prisma.user.create({
        data: {
        username: data.username,
        displayName: data.displayName,
        userSetting: {
            create: { 
            notification: true,  
            smsEnabled: false, 
            },
        },
        },
        // include:false হলে শুধু User রিটার্ন হবে, true দিলে UserSetting সহ রিটার্ন হবে
        include: { userSetting: true }, 
    });
    return user;
   }

    /*===============(Create User end)==================*/
    /*===============(GetAll User start)==================*/
    async getAllUsers() {
      const users = await this.prisma.user.findMany({
        include: { userSetting: true },
      });
      return users;
    }
    /*===============(GetAll User end)==================*/
    /*===============(Get User by ID start)==================*/
    async getUserById(id: number) {

      const user = await this.prisma.user.findUnique({
        where: { id },
        include: { 
            userSetting:{
                select:{
                    smsEnabled: true,
                }
            } },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    }
    /*===============(Get User by ID end)==================*/

    /*===============(Update User by ID start)==================*/
    /*===============(Update User by ID start)==================*/
    async updateUser(id: number, data: UpdateUserDto) {

        // Check if the user exists
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Check if username already exists in other users
        if (data.username) {
            const existingUser = await this.prisma.user.findUnique({
                where: { username: data.username },
            });

            if (existingUser && existingUser.id !== id) {
                throw new Error(`Username "${data.username}" is already taken`);
            }
        }

        // Update the user
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                username: data.username,
                displayName: data.displayName,
            },
        });

        return {
            message: 'User updated successfully',
            user: updatedUser,
        };
    }

    /*===============(Update User by ID end)==================*/
    /*===============(Delete User by ID Start)==================*/
    async deleteUser(id: number) {

        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        await this.prisma.user.delete({
            where: { id },
        });

        return {
            message: 'User deleted successfully',
        };
    }

    /*===============(Delete User by ID end)==================*/
    /*===============(Update User Settings by ID start)==================*/
    async updateUserSettings(userId: number, updateUserSettingsDto: UpdateUserSettingsDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    

        const existingSetting = await this.prisma.userSetting.findUnique({
            where: { userId: userId },
        });
 
        if (existingSetting) {
            return this.prisma.userSetting.update({
            where: { userId: userId },
            data: updateUserSettingsDto,
            });
        } 
        else {
           return this.prisma.userSetting.create({
           data:{
                userId: userId,
                notification: updateUserSettingsDto.notification ?? true,
                smsEnabled: updateUserSettingsDto.smsEnabled ?? false,
            },
        });

        }
    }
    /*===============(Update User Settings by ID end)==================*/


}
