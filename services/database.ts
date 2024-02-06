import * as dotenv from 'dotenv';
dotenv.config();
const mongoose = require('mongoose');
const URI: string = process.env.MONGO_URI || '';

function main(){
    mongoose.connect(URI)
}

    
// const Cat = mongoose.model('Cat', { name: String }, 'cats');
// const kitty = new Cat({ name: 'Zildjian' });

// kitty.save().then(() => console.log('meow'));


export default main;