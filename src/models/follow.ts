import mongoose, { Document, Schema } from 'mongoose';

interface follow extends Document {
  userId: mongoose.Types.ObjectId;
  follows: mongoose.Types.ObjectId;
}

const followSchema: Schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  follows: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

const followModel = mongoose.model<follow>('follow', followSchema);

export default followModel;