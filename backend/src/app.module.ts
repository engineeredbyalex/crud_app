import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal:true,
    }),
    MongooseModule.forRoot(process.env.db_url, {
      dbName:'task-app'
    }),
    AuthModule,
    PostModule,

  ],
})
export class AppModule {}
