import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module'; 
import { ConfigModule } from '@nestjs/config'; 

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb+srv://tejasnagare99:X4c5bLuLAvdFtGXY@cluster0.aopybjl.mongodb.net/csvData'), 
    DataModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
