// models/rule.model.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface RuleDocument extends Document {
  name: string;
  description: string;
  ruleString: string;
  ast: any; // `ast` can be typed more strictly if needed
}

const RuleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ruleString: { type: String, required: true },
  ast: { type: Object, required: true }, // Add ast field to the schema
});

export const Rule = mongoose.model<RuleDocument>('Rule', RuleSchema);
