import * as dotenv from 'dotenv';
dotenv.config();
const mongoose = require('mongoose');
const URI: string = process.env.MONGO_URI || '';

const User = require('../models/userModel');

function main(){
    mongoose.connect(URI)
}

const utilisateur = new User({
    name: 'admin',
    email: 'test@gmail.com',
    password: 'azertyuiop',
    isAdmin: true
});

// utilisateur.save().then(() => console.log('utilisateur enregistré'));


export default main;