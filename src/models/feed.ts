import mongoose, { Document, Schema } from 'mongoose';

interface feed extends Document {
  user: mongoose.Types.ObjectId;
  text: string;
}

const feedSchema: Schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  text: String,
},
{ timestamps: true });

const feedModel = mongoose.model<feed>('feed', feedSchema);

export default feedModel;