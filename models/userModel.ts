import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    allergies: {
        type: Array,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
});

const User = mongoose.model("users", schema, "users");

module.exports = User;
