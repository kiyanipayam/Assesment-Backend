import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Post, PostDocument } from "../Domain/post.schema";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, ObjectId } from "mongoose";
@Injectable()
export class PostRepository {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>,
    ) { }

    async findById(id: string): Promise<Post> {
        return await this.postModel.findOne({ _id: id }).populate("user").exec();
    }

    async createPost(title: string, body: string, user: ObjectId): Promise<Post> {
        var temp = await new this.postModel({
            title: title,
            body: body,
            createdDate: Date.now(),
            user: user
        })
        await temp.save();
        return temp;
    }

    async findByUserId(userId: string): Promise<Array<Post>> {
        return (await this.postModel.find({ user: userId }).populate('user').exec());
    }

    async deletePost(id: string, userId: string): Promise<string> {
        try {
            await this.postModel.deleteOne({ _id: id, user: userId }).exec()
            return id;
        } catch (error) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
        }
    }

    async updatePost(id: string, title: string, body: string, userId: ObjectId): Promise<Post> {

        await this.postModel.updateOne({ _id: id, user: userId }, { title: title, body: body });
        return this.findById(id);
    }

    async findAll(): Promise<Array<Post>> {
        return await this.postModel.find().populate('user').populate('viewedBy').exec();

    }

    async updateViews(ids: Array<ObjectId>, userId: ObjectId): Promise<boolean> {
        await this.postModel.updateMany({ _id: { $in: ids } }, { $addToSet: { viewedBy: userId } })
        return true;
    }

}