require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors  = require("cors");
const app = express();
//const mysql = require("mysql");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const db = require("./models/index.js");
const mongoose = require('mongoose')
const path = require('path')
const ejs = require('ejs')

//const app = express();
//app.use(express.urlencoded({extended: true}));

// EJS
app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'ejs');
// Public Folder
//app.use(express.static(__dirname + '/public'));
//app.use('/uploads', express.static('uploads'));
app.use(express.static('./public')); 

const URI = process.env.MONGODB_URL
mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if (err) throw err;
    console.log("Connected to MongoDB")
})
/*config = {
    host: "localhost",
    user: "root",
    password: "abut.13599",
    database: "ecommerce",
}
 
const connection = mysql.createConnection(config) */

/* connection.connect(function(err) {
    if (err) throw err;
    console.log("mysql connected");
}) */



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}));

//Routes
app.use('/user',require('./routes/userRoute'));
app.use('/api',require('./routes/brandRoute'));
app.use('/api',require('./routes/productRoute'));
app.use('/api', require('./routes/orderRoute'))
app.use('/api',require('./routes/upload'));


//db.sequelize.sync({ }).then(() => {

app.listen(3001, () => {
    console.log("running on port 3001");
});
//});

module.exports = db;
