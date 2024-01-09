import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({
    timestamps:true
})

export class post extends Document{
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"users",requiredPaths:true })
    user_id: mongoose.Schema.Types.ObjectId
    @Prop({required:true})
    title: string
    @Prop({required:true})
    description: string
    @Prop({required:true})
    link: string
    @Prop({required:true})
    visibility: boolean
    @Prop({required:true})
    image : string
}

export const post_schema = SchemaFactory.createForClass(post)
export const post_model = post.name