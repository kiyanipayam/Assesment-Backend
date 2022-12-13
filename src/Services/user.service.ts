
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { signUpDTO } from "./DTOs/user/sign-up.dto";
import { signUpResponseDTO } from "./DTOs/user/sign-up.responsedto";
import { loginResponseDTO } from "./DTOs/user/login-response.dto";
import { loginDTO } from "./DTOs/user/login.dto";
import { UserRepository } from "../DataAccess/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async signup(userDTO: signUpDTO): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(userDTO.password, salt);
    const foundUser = await this.userRepository.findUserByEmail(userDTO.email);
    if (foundUser == null) {
      const newUser = await this.userRepository.addUser(userDTO.fullName, userDTO.email, hash);
      return new signUpResponseDTO(newUser.email, newUser.fullname, newUser.registeredDate);
    }
    else {
      throw new HttpException('Email Is in Use :)', HttpStatus.BAD_REQUEST)
    }
  }

  async login(user: loginDTO, jwt: JwtService): Promise<any> {
    const foundUser = await this.userRepository.findUserByEmail(user.email);
    if (foundUser) {
      const { password } = foundUser;
      if (bcrypt.compare(user.password, password)) {
        const payload = { email: user.email };
        return new loginResponseDTO(jwt.sign(payload), foundUser.fullname, foundUser.email, foundUser.registeredDate);
      }
      throw new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
    }
    throw new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
  }


  async getall(): Promise<any> {
    return await this.userRepository.getAllUsers();
  }
}
