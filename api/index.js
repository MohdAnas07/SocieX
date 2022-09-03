const express = require('express');
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const userRoute = require('./routes/users.js');
const authRoute = require('./routes/auth.js');
const postRoute = require('./routes/posts.js');

const PORT = process.env.PORT || 5000

dotenv.config()

// local mongo compass db connection ==============>>
require('./db/config')


//mongo atlas db connection ====================>>

// mongoose.connect(`${process.env.MONGO_URL}`,
//     {
//         useNewUrlParser: true, useUnifiedTopology: true
//     },
//     () => {
//         console.log('database connected successfully ');
//     }
// )

// middleware ===============

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());

// ROUTEs ============================>>

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.listen(5000, () => {
    console.log('server is listening at port 8800')
})