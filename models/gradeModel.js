import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    lastModified: {
        type: String,
        default: Date.now,
    },
});

const gradeModel = mongoose.model('grade', gradeSchema, 'grades');

export default gradeModel;
