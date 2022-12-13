
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { User, UserDocument } from "../Domain/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email: email }).exec();
    }

    async addUser(fullName: string, email: string, password: string): Promise<User> {
        let newUser = new this.userModel({
            fullname: fullName,
            email: email,
            password: password,
            registeredDate: Date.now()
        }).save();
        return newUser;
    }

    async getAllUsers(): Promise<Array<User>> {
        return await this.userModel.find().exec();
    }
}