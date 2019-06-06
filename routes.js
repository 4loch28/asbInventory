
let path = require("path");
let express = require('express');
const fs = require('fs');
var formidable = require('formidable');
var passport = require("passport");
var User = require("./models/user");
var Info = require("./models/Info");
var mv = require('mv')
var nodemailer = require('nodemailer');
let router = express.Router();

const myDatabase = require('./myDatabase');
let db = new myDatabase;
let infoList = [];

let tempProductName = "";

router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/edit",function(req,res){
	res.sendFile(path.resolve(__dirname + "/public/views/login.html"));
});
router.get("/addProduct",function(req,res){
  if (req.isAuthenticated())
	  res.sendFile(path.resolve(__dirname + "/public/views/admin.html"));
  else
    res.sendFile(path.resolve(__dirname + "/public/views/homePage.html"));
});
router.get("/",function(req,res){
	res.sendFile(path.resolve(__dirname + "/public/views/homePage.html"));
});
router.get("/details",function(req,res){
	res.sendFile(path.resolve(__dirname + "/public/views/details.html"));
});
router.get("/restrictedAccess",function(req,res){
	res.sendFile(path.resolve(__dirname + "/public/views/restricted.html"));
});
router.get("/about",function(req,res){
	res.sendFile(path.resolve(__dirname + "/public/views/about.html"));
});
router.get("/tyler",function(req,res){
	res.sendFile(path.resolve(__dirname + "/public/views/tyler.html"));
});
router.get("/lochlin",function(req,res){
	res.sendFile(path.resolve(__dirname + "/public/views/lochlin.html"));
});
router.get("/ben",function(req,res){
	res.sendFile(path.resolve(__dirname + "/public/views/ben.html"));
});
router.get("/reed",function(req,res){
	res.sendFile(path.resolve(__dirname + "/public/views/reed.html"));
});
router.get("/successlogin", function(req, res) {
	console.log("get successsignup");
    res.json({redirect:"/"});
});
router.get("/faillogin", function(req, res) {
console.log("get failsignup");
	res.json({redirect:""});	

});


/*router.post("/login",function(req,res){
	if (req.body.username == "test" && req.body.password == "test123") {
		res.json({admin:true});
	} else {
		res.json({admin:false});
	}
});*/

router.post('/sendEmail', function(req, res){
  transporter.sendMail({
    from: 'mvhsasbstudentstore@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: 'One of your products is out of stock!', // Subject line
    html: '<h1 style="background-color: #006635;text-align:center;color:white">' + req.body.name + ' is out of stock!</h1><br><h3 style="text-align:center;">' + req.body.name + ' is out of stock in the ASB Student Store. You may want to consider reordering this item so it will be available for future sales. </h3>'// plain text body
  }, function (err, info) {
     if(err)
       console.log(err)
     else
       console.log(info);
  });
  res.json(null);
});

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
  //Sender must allow google to accept non secure app access https://myaccount.google.com/lesssecureapps
        user: 'mvhsasbstudentstore@gmail.com',
        pass: 'sTudenTsTore!' //password
    }
});

router.post('/fileupload', function(req, res){

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    	console.log("here")
      var oldpath = files.filetoupload.path;
      var newpath = __dirname + '/public/images/' + files.filetoupload.name;
      //form.on('fileBegin',function(name,file){
      //  file.path=newpath;
      //});
      if(files.filetoupload.size > 0){ 
      mv(oldpath, newpath, function (err) {
        if (err) throw err;

console.log("fileupload " + files.filetoupload.name);

	    //res.sendFile(__dirname + "/public/images/" + files.filetoupload.name);
      //res.sendFile(__dirname + "/public/views/homepage.html");
      	});
		}
    });
});

router.get("/logout", function(req, res) {
  if (req.isAuthenticated()) {
    req.logout();
    res.json({redirect:"/edit"});
  } else {
    res.json({redirect:"/"});
  }
});
router.get("/checkAuth", function(req, res) {
  if (req.isAuthenticated()) {
  	console.log("authenticated");
    console.log(req.user.email)
    res.json({auth:true, email: req.user.email})
  } else {
  	console.log("NOT authenticated");
    res.json({auth:false})
  }
});

router.post("/signup", function(req, res, next) {
console.log("post signup");

 
  var username = "admin";
  var password = "AsB";

  User.findOne({ username: username }, function(err, user) {

    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/faillogin"); //change to failsignup
    }

    var newUser = new User({
      username: username,
      password: password,
      email: ""
    });
    newUser.save(next);    //this line has to be called.
  }); 


}, passport.authenticate("login", {
  successRedirect: "/successLogin",
  failureRedirect: "/failLogin",
  failureFlash: true
}));

router.post("/updateEmail", function(req, res, next) {
  User.findOneAndUpdate({username:req.user.username},{email:req.body.email},function(error,info) {
      if (error) {
          return res.json(null);
      }
      else if (info == null) {
          return res.json(null);
      }
      return res.json({success:true});
  });
})



router.post("/login", passport.authenticate("login", {
  successRedirect: "/successLogin",
  failureRedirect: "/failLogin",
  failureFlash: true
}));
router.get('/getAllProducts', function(req, res){

	 return (db.getAllObjects(res));
	
});


router.get('/getProduct', function(req, res){

  return (db.getObjectWithName(req.query.name,res));

});

router.post('/newProduct', function(req, res){
  if (!req.isAuthenticated) {
    return(null);
  }
  console.log("post newProduct")
  if (req.body.username == "") {
    console.log("post newProduct user fail")
    res.json(null);
    return;
  }
  if (req.body.image != undefined && req.body.image != "") {
		console.log("check" + req.body.image + " end")
	     temppath = req.body.image.replace("C:\\fakepath\\", "");
	} else {
		 console.log("but")
		 temppath = 'srHEryDfgRTdhTRyDHrrthTHRTYhdr6Ur6yfthRy5qererCDh.jfif' ;
	}
  let obj = {name:req.body.name,description:req.body.description,price:req.body.price,stock:req.body.stock,image:temppath};
  return(db.addObject(obj,res));


});

router.put('/updateProduct', function(req, res){
  if (!req.isAuthenticated) {
    return(null);
  }
  if (req.body.name == "") {
    res.json(null);
    return;
  }

  //console.log(req.body.ident)
  let obj = {name:req.body.name,description:req.body.description,price:req.body.price,stock:req.body.stock,image:req.body.image};
  return(db.changeObjectWithName(req.body.origName,obj,res));
});

router.delete('/deleteProduct', function(req, res){
  console.log("deleteProduct")
  return(db.deleteObjectWithName(req.body.name,res));


});
router.post('/setTempProductName', function(req, res){
	tempProductName = req.body.productName;
	res.json({});
});
router.get('/tempProductData', function(req, res){
	console.log(tempProductName)
	return(db.getObjectWithName(tempProductName,res));
});
module.exports = router;




