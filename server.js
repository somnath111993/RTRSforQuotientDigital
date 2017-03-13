var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path')
var route = require('./router')

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/rtrs");

mongoose.set("debug", true);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'webapp')));


app.use('/',route) //when browser encounters '/'; it will call route object

app.listen(7000, function () {
  console.log('RTRS app listening on port 7000!')
})

module.exports = app
module.exports.c1 = require("./c1");
module.exports.c2 = require("./c2");
