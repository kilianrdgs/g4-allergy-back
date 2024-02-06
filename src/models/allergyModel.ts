import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    createdBy: {
        type: String
    },
    isPrivate: {
        type: Boolean,
        required: true,
        default: true
    }
});

const Allergy = mongoose.model("allergies", schema, "allergies");

module.exports = Allergy;
