import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Get, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataService } from './data.service';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('Uploaded file:', file);

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const uploadDir = path.join(__dirname, '..', '..', 'uploads');
      console.log('Upload directory:', uploadDir);  

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      // Generate a unique filename using a timestamp and random bytes
      const uniqueFilename = `${Date.now()}_${crypto.randomBytes(6).toString('hex')}.csv`;
      const filePath = path.join(uploadDir, uniqueFilename);
      console.log('File path:', filePath);

      // Write buffer to the file
      fs.writeFileSync(filePath, file.buffer);

      await this.dataService.importData(filePath);
      // fs.unlinkSync(filePath); // Optionally remove the file after processing
      return { message: 'File uploaded successfully' };
    } catch (error) {
      console.error('Error during file upload:', error);
      throw new BadRequestException(`File upload failed: ${error.message}`);
    }
  }
  @Get('get-data')
  async getData() :Promise<any>{
    return await this.dataService.getData();
  }
  @Get('filter')
  async getFilteredData(
    @Query('endYear') endYear?: string,
    @Query('topic') topic?: string,
    @Query('sector') sector?: string,
    @Query('region') region?: string,
    @Query('pest') pest?: string,
    @Query('source') source?: string,
    @Query('swot') swot?: string,
    @Query('country') country?: string,
    @Query('city') city?: string
  ) {
    const filters = {
      endYear,
      topic,
      sector,
      region,
      pest,
      source,
      swot,
      country,
      city
    };
    console.log(filters);
    

    return this.dataService.filterData(filters);
  }
  
  @Get('drop-down-data')
  async getdropdownData():Promise<any>
  {
    return await this.dataService.getdropdownData()
  }
}
