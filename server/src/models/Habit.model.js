import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      title: {
        type: String,
        required: true
      },
      frequency: {
        type: String,
        enum: ['daily', 'weekly'],
        default: 'daily',
        required: true
      },
},{
    timestamps: true
})

export default mongoose.model('Habit', habitSchema);
