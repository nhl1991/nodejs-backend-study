import { Controller, Param, Body, Delete, Get, Post, Put } from "@nestjs/common";
import { BlogService } from "./blog.service";
@Controller('blog') // /blog 이하의 모든 주소에 대한 처리를 담당.
export class BlogController {
    constructor(private blogService: BlogService){}

    @Get()
    getAllPost(){
        console.log('모든 게시글 가져오기');
        return this.blogService.getAllPosts();
    } 


    @Post()
    createPost(@Body() postDto){
        console.log('게시글 작성');
        this.blogService.createPost(postDto);
        return 'success';
    }

    @Get('/:id')
    async getPost(@Param('id') id: string){
        console.log(`[id: ${id}]게시글 하나 가져오기`);
        const post = await this.blogService.getPost(id);
        return post;
    }

    @Delete('/:id')
    deletePost(@Param('id') id: string){
        console.log('게시글 삭제')
        this.blogService.delete(id);
        return 'success'
    }

    @Put('/:id')
    updatePost(@Param('id') id:string, @Body() postDto){
        console.log(`[${id}] 게시글 업데이트`);

        return this.blogService.updatePost(id, postDto);
    }
}