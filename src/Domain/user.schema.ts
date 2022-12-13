import { Type } from "@nestjs/common/interfaces";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Post } from "./post.schema"

export type UserDocument = User & Document;

@Schema()
export class User {
    _id: mongoose.Schema.Types.ObjectId
    @Prop({ required: true })
    fullname: string;
    @Prop({ required: true, unique: true, lowercase: true })
    email: string;
    @Prop({ required: true })
    password: string
    @Prop({ default: Date.now() })
    registeredDate: Date
}
export const UserSchema = SchemaFactory.createForClass(User)