import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res, HttpException } from '@nestjs/common';
import { UserService } from '../../Services/user.service';
import { JwtService } from '@nestjs/jwt'
import { signUpDTO } from '../../Services/DTOs/user/sign-up.dto';
import { loginDTO } from '../../Services/DTOs/user/login.dto';
import { response } from 'express';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService,
    private jwtService: JwtService) { }

  @Post('/signup')
  async Signup(@Res() response, @Body() user: signUpDTO) {
    const returnValue = await this.userService.signup(user);

    return response.status(HttpStatus.CREATED).json({
      returnValue
    })
  }

  @Post('/login')
  async SignIn(@Res() response, @Body() user: loginDTO) {
    const temp = await this.userService.login(user, this.jwtService);

    return response.status(HttpStatus.OK).json(temp)
  }

  @Get("getall")
  async getAll(@Res() response) {
    return response.status(HttpStatus.OK).json(await this.userService.getall())
  }

}

