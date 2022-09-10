const express = require('express');
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const multer = require('multer');
const path = require("path");

const userRoute = require('./routes/users.js');
const authRoute = require('./routes/auth.js');
const postRoute = require('./routes/posts.js');

const PORT = process.env.PORT || 5000

dotenv.config()

//local mongo compass db connection ==>
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


app.use("/images", express.static(path.join(__dirname, "public/images")));


// middleware ===============

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());

// UPLOAD FILE ===========================================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})


const upload = multer({ storage })

app.post('/api/upload', upload.single("file"), (req, res) => {
    try {
        return res.status(200).json('file uploaded successfully');
    } catch (error) {
        console.warn(error);
    }
})


// ROUTEs ============================>>

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.listen(5000, () => {
    console.log('server is listening at port 5000')
})