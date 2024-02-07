import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    isPrivate: {
        type: Boolean,
        required: true,
        default: true
    }
});

const Allergy = mongoose.model("allergies", schema, "allergies");

module.exports = Allergy;
