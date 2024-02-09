import mongoose, {Schema} from 'mongoose';

const schema = new mongoose.Schema({
    method: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true
    },
    statusCode: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    responseTime: {
        type: Number
    }
});

const Log = mongoose.model("logs", schema, "logs");

module.exports = Log;
