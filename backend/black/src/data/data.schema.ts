// import { Schema, Document } from 'mongoose';

// export interface Data extends Document {
//   intensity?: number;
//   likelihood?: number;
//   relevance?: number;
//   year?: number; // Make optional
//   country?: string; // Make optional
//   topics?: string[];
//   region?: string; // Make optional
//   city?: string; // Make optional
// }

// export const DataSchema = new Schema({
//   intensity: { type: Number, required: false },
//   likelihood: { type: Number, required: false },
//   relevance: { type: Number, required: false },
//   year: { type: Number, required: false }, // Changed to optional
//   country: { type: String, required: false }, // Changed to optional
//   topics: [String],
//   region: { type: String, required: false }, // Changed to optional
//   city: { type: String, required: false } // Changed to optional
// });

// export const Key=new Schema({
//   intensity: [{ type: Number, required: false }],
//   likelihood: [{ type: Number, required: false }],
//   relevance: [{ type: Number, required: false }],
//   year: [{ type: Number, required: false }], // Changed to optional
//   country: [{ type: String, required: false }], // Changed to optional
//   topics: [String],
//   region: [{ type: String, required: false }], // Changed to optional
//   city: [{ type: String, required: false }] // Changed to optional
// })

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the Data class
@Schema({ timestamps: true })
export class Data extends Document {
  @Prop({ type: Number, required: false })
  intensity?: number;

  @Prop({ type: Number, required: false })
  likelihood?: number;

  @Prop({ type: Number, required: false })
  relevance?: number;

  @Prop({ type: Number, required: false })
  end_year?: number;  // Added end_year field

  @Prop({ type: Number, required: false })
  start_year?: number;  // Added start_year field

  @Prop({ type: String, required: false })
  sector?: string;  // Added sector field

  @Prop({ type: String, required: false })
  topic?: string;  // Added topic field

  @Prop({ type: String, required: false })
  insight?: string;  // Added insight field

  @Prop({ type: String, required: false })
  swot?: string;  // Added swot field

  @Prop({ type: String, required: false })
  region?: string;  // Added region field

  @Prop({ type: String, required: false })
  city?: string;  // Added city field

  @Prop({ type: String, required: false })
  country?: string;  // Added country field

  @Prop({ type: String, required: false })
  pestle?: string;  // Added pestle field

  @Prop({ type: String, required: false })
  source?: string;  // Added source field

  @Prop({ type: String, required: false })
  title?: string;  // Added title field
}



// Define the Key class
@Schema({ timestamps: true })
export class Key extends Document {
  @Prop([{ type: Number, required: false }])
  intensity?: number[];

  @Prop([{ type: Number, required: false }])
  likelihood?: number[];

  @Prop([{ type: Number, required: false }])
  relevance?: number[];

  @Prop([{ type: Number, required: false }])
  end_year?: any;  // Added end_year field

  @Prop([{ type: Number, required: false }])
  start_year?: any;  // Added start_year field

  @Prop([{ type: String, required: false }])
  countries?: string[];

  @Prop([{ type: String, required: false }])
  topics?: string[];

  @Prop([{ type: String, required: false }])
  regions?: string[];

  @Prop([{ type: String, required: false }])
  cities?: string[];

  @Prop([{ type: String, required: false }])
  pestle?: string;  // Added pestle field

  @Prop([{ type: String, required: false }])
  sectors?: string;  // Added sector field

  @Prop([{ type: String, required: false }])
  swot?: string;  // Added sector field

  @Prop([{ type: String, required: false }])
  source?: string;  // Added sector field
}

export const KeySchema = SchemaFactory.createForClass(Key);

export const DataSchema = SchemaFactory.createForClass(Data);


