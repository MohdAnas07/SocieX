const mongoose = require('mongoose')
const URL = 'mongodb://localhost:27017/social';

mongoose.connect(URL, () => {
    console.log('local Database connected');
});