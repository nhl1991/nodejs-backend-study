
import { readFile, writeFile } from 'fs/promises';
import { PostDto } from './blog.model';
import { Injectable } from '@nestjs/common';
// monngose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';

export interface BlogRepository {
  getAllPost(): Promise<PostDto[]|Blog[]>;
  createPost(postDto: PostDto): void;
  getPost(id: string): Promise<PostDto|null>;
  deletePost(id: string): Promise<void>;
  updatePost(id: string, postDto: PostDto): Promise<void>;
}

// @Injectable()
// export class BlogFileRepository implements BlogRepository {
//   FILE_NAME = './src/blog.data.json';

//   async getAllPost(): Promise<PostDto[]> {
//     const datas = await readFile(this.FILE_NAME, 'utf8');
//     const posts = JSON.parse(datas);
//     return posts;
//   }

//   async createPost(postDto: PostDto): Promise<void> {
//     const posts = await this.getAllPost();
//     const index = posts.length === 0 ? 0 : Number(posts[posts.length-1].id)
//     const id = index + 1;
//     const createPost = { ...postDto, id: id.toString(), createdDt: new Date() };
//     posts.push(createPost);
//     await writeFile(this.FILE_NAME, JSON.stringify(posts));
//   }

//   async getPost(id: string): Promise<PostDto|undefined> {
//     const posts = await this.getAllPost();
//     const result = posts.find((post) => post.id === id);
    
//     return result; // find()가 undefined
//   }

//   async deletePost(id: string) {
//     const posts = await this.getAllPost();
//     const filteredPosts = posts.filter((post) => post.id !== id);
//     await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
//   }

//   async updatePost(id: string, postDto: PostDto) {
//     const posts = await this.getAllPost();
//     const index = posts.findIndex((post) => post.id === id);
//     const updatePost = { ...postDto, id, updatedDt: new Date() };
//     posts[index] = updatePost;
//     await writeFile(this.FILE_NAME, JSON.stringify(posts));
//   }
// }


// Mongo Repository


@Injectable()
export class BlogMongoRepository implements BlogRepository {

    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>){}

    async getAllPost(): Promise<Blog[]> {
      return await this.blogModel.find().exec()
    }

    createPost(postDto: PostDto): void {
      const createPost = {
        ...postDto,
        createdDt: new Date(),
        updatedDt: new Date(),
      }

      this.blogModel.create(createPost)
    }

    async getPost(id: string): Promise<PostDto|null>{
      return await this.blogModel.findById(id);
    }

    async deletePost(id: string): Promise<void> {
      await this.blogModel.findByIdAndDelete(id);
    }

    async updatePost(id: string, postDto: PostDto): Promise<void> {
      const udpatePost = {...postDto, id, updatedDt: new Date()};
      await this.blogModel.findByIdAndUpdate(id, this.updatePost)
    }

}