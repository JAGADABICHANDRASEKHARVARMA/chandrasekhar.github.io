var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var mongoose = require("mongoose");
var Set = require("./models/shows");
var Contact = require("./models/contact");

mongoose.connect("mongodb://localhost/chandfolio_v4",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const {json} = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");
app.use(express.static("public"));


///////////////////////////
//         routes       //
/////////////////////////


app.get("/", function (req, res) {
    res.render("index");
})

app.get("/blog", function (req, res) {
    res.render("blog");
})

app.get("/about", function (req, res) {
    res.render("about");
})

app.get("/pages", function (req, res) {
    res.render("pages");
})

app.get("/portfolio", function (req, res) {
    res.render("portfolio");
})

app.get("/services", function (req, res) {
    res.render("services");
})

app.get("/contact", function (req, res) {
    res.render("contact");
})

app.post("/methpos", function(req,res){
    var contact = {
        name: req.body.name,
        email: req.body.email,
        service: req.body.service,
        budget: req.body.budget,
        message: req.body.message
    }
    Contact.create(contact, function(error, contact){
        if(error){
            console.log(error);
        }else{
            console.log(contact);
            res.redirect("/contact");
        }
    })
})

app.get("/collect", function (req, res) {
    res.render("collect");
})


app.post("/shows", function (req, res) {
    var set = req.body.set;
    set = JSON.parse(set);
    // console.log(set);
    // res.send(set);
    var show = {
        company: req.body.compName,
        set: set
    }
    Set.create(show, function(err, set){
        if(err){
            console.log(err);
        }else{
            console.log(set);
            res.redirect("/shows");
        }
    })
})

app.get("/shows", function (req, res) {
    Set.find({}, function(err, sets){
        if(err){
            console.log("find error");
            console.log(err);
        }else{
            console.log(sets);
            res.render("show",{
                sets: sets
            })
        }
    })
})

app.listen(3000, function () {
    console.log("app is running");
})