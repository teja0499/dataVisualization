import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { DataSchema, KeySchema } from './data.schema'; // Import the schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Data', schema: DataSchema }]),
    MongooseModule.forFeature([{ name: 'Key', schema: KeySchema }])
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
