import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createuser.dto';
import { UpdateUserDto } from './dtos/updateuser.dto';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  /*===============(Create User start)==================*/
  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
  /*===============(Create User end)==================*/

  /*===============(GetAll User start)==================*/
  @Get('getallusers')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
  /*===============(Get User end)==================*/

  /*===============(Get User by ID start)==================*/
  @Get('getbyid/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }
  /*===============(Get User by ID end)==================*/
  /*===============(Update User by ID end)==================*/
  @Put('update/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(Number(id), updateUserDto);
  }

}
