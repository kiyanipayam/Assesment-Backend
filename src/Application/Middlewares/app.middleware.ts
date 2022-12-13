import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../../DataAccess/user.repository';
interface UserRequest extends Request {
    user: any
}
@Injectable()
export class isAuthenticated implements NestMiddleware {
    constructor(private readonly jwt: JwtService, private readonly userReposotory: UserRepository) { }
    async use(req: UserRequest, res: Response, next: NextFunction) {
        try {

            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer')
            ) {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = await this.jwt.verify(token);
                const user = await this.userReposotory.findUserByEmail(decoded.email)
                if (user) {
                    req.user = user
                    next()
                } else {
                    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)

                }
            } else {
                throw new HttpException('No token found', HttpStatus.NOT_FOUND)

            }
        } catch {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        }
    }
}