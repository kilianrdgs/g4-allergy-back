import mongoose from 'mongoose';
import {Int32} from "mongodb";

const schema = new mongoose.Schema({
    method: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    statusCode: {
        type: Number,
        required: true,
    },
});

const Log = mongoose.model("logs", schema, "logs");

module.exports = Log;
