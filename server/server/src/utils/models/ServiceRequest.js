import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: String, required: true },
    details: { type: String },
    status: { type: String, enum: ['pending', 'in-progress', 'done'], default: 'pending' },
    payment: { type: String, enum: ['cod'], default: 'cod' }
  },
  { timestamps: true }
);

export default mongoose.model('ServiceRequest', serviceRequestSchema);
