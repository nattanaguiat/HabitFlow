import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        default: ''
      },
      frequency: {
        type: String,
        enum: ['daily', 'weekly'],
        required: true
      },
      category: {
        type: String,
        default: 'General'
      },
},{
    timestamps: true
})

export default mongoose.model('Habit', habitSchema);
