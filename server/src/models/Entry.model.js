import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({

    habitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true,
    }
}, {
    timestamps: true
});

export default mongoose.model('Entry', entrySchema);