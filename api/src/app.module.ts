import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';

if (!process.env.dbConnString) {
  process.env.dbConnString = 'mongodb://127.0.0.1:27017/test-db-2';
}
console.error(
  'Staring app with db connection string ' + process.env.dbConnString,
);

@Module({
  imports: [
    MongooseModule.forRoot(process.env.dbConnString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
