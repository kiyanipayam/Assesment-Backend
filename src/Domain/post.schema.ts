import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schema";


export type PostDocument = Post & Document;


@Schema()
export class Post {
    _id: mongoose.Schema.Types.ObjectId
    @Prop({ required: true })
    title: string;
    @Prop({ required: true, })
    body: string;
    @Prop({ default: Date.now() })
    createdDate: Date
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    viewedBy: Array<User>
}
export const PostSchema = SchemaFactory.createForClass(Post)