var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var EnrollRouter=require('./routes/enroll');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views',path.join(__dirname,'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));


app.use("/", EnrollRouter);
var msg = 'Hello World';
console.log(msg);

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0' );