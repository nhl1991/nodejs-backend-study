import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller'
import { BlogService } from './blog.service';
import { BlogMongoRepository } from './blog.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blog.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://laslark1991:Wlsrud!!20@test-my-app.z6ysuct.mongodb.net/?retryWrites=true&w=majority&appName=test-my-app/blog"
    ),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema}])
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogMongoRepository],
})
export class AppModule {}
