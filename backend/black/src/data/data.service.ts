import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data ,Key} from './data.schema'; // Define an interface for the data
import * as csv from 'csvtojson';
import * as fs from 'fs';




@Injectable()
export class DataService {
  constructor(
    @InjectModel(Data.name) private readonly dataModel: Model<Data>,
    @InjectModel(Key.name) private readonly uniquedata:Model<Key>
  
  ) {}

  async importData(filePath: string): Promise<void> {
    const jsonArray = await csv().fromFile(filePath);
    await this.dataModel.insertMany(jsonArray);
    await this.setValues(jsonArray)
    fs.unlinkSync(filePath); // Remove the file after processing
  }

  async getData(): Promise<any> {
    console.log('----1');
    return await this.dataModel.find().exec();
  }

  async filterData(filters: any): Promise<any> {
    const query: any = {};
    console.log("STart");
    

    // Add filter criteria to the query object
    if (filters.end_year) query.end_year = filters.end_year;
    if (filters.topic) query.topic = { $in: filters.topic };
    if (filters.sector) query.sector = filters.sector;
    if (filters.region) query.region = filters.region;
    if (filters.pest) query.pest = filters.pest;//
    if (filters.source) query.source = filters.source;
    if (filters.swot) query.swot = filters.swot;//
    if (filters.country) query.country = filters.country;
    if (filters.city) query.city = filters.city;
    console.log(query);
    
   
    return await this.dataModel.find(query).exec();
  }

  async getdropdownData():Promise<any>{
     return await this.uniquedata.findOne().exec();
  }


  isBlank(str:string){
    if(str.trim().length===0)
    {
      return false;
    }
    return true;
  }



  
  async setValues(data: any[]) {
    try {
      console.log("Start");

      const intensity = new Set<number>();
      const likelihood = new Set<number>();
      const relevance = new Set<number>();
      const end_year = new Set<number>();
      const start_year = new Set<number>();
      const topic = new Set<string>();
      const sector = new Set<string>();
      const region = new Set<string>();
      const countries = new Set<string>();
      const cities = new Set<string>();
      const pest = new Set<string>();
      const swot=new Set<string>();
      const source=new Set<string>();

      data.forEach((item) => {
        if (item.intensity) {
          intensity.add(item.intensity);
        }
        if (item.likelihood) {
          likelihood.add(item.likelihood);
        }
        if (item.relevance) {
          relevance.add(item.relevance);
        }
        if (item.end_year) {
          end_year.add(item.end_year);
        }
        if (item.start_year ) {
          start_year.add(item.start_year);
        }
        if (item.topic && this.isBlank(item.topic)) {
          topic.add(item.topic)
        }
        if (item.sector && this.isBlank(item.sector)) {
          sector.add(item.sector);
        }
        if (item.region && this.isBlank(item.region)) {
          region.add(item.region);
        }
        if (item.country  && this.isBlank(item.country )) {
          countries.add(item.country);
        }
        if (item.city && this.isBlank(item.city)) {
          cities.add(item.city);
        }
        if (item.pestle && this.isBlank(item.pestle)) {
         pest.add(item.pestle)
        }
        if (item.swot && this.isBlank(item.swot)) {
          swot.add(item.swot)
         }
         if (item.source && this.isBlank(item.source)) {
          source.add(item.source)
         }
      });
  

      const updateObject = {
        $addToSet: {
          intensity: { $each: Array.from(intensity) },
          likelihood: { $each: Array.from(likelihood) },
          relevance: { $each: Array.from(relevance) },
          end_year: { $each: Array.from(end_year) },
          start_year: { $each: Array.from(start_year)},
          topic: { $each: Array.from(topic) },
          sectors: { $each: Array.from(sector) },
          regions: { $each: Array.from(region) },
          countries: { $each: Array.from(countries) },
          cities: { $each: Array.from(cities) },
          pestle: { $each: Array.from(pest) },
          swot:{ $each: Array.from(swot) },
          source:{ $each: Array.from(source) },
        }
      };
  
      
      // Perform the update
      const result = await this.uniquedata.updateOne(
        {},  // Match the single document; adjust filter as needed
        updateObject,
        { upsert: true }  // Create a new document if one doesn't exist
      );
  
  
    } catch (error) {
      console.error("Error updating unique values:", error);
      throw error;  // Re-throw error after logging
    }
  }
  


}
