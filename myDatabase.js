

var express = require("express");
var mongoose = require("mongoose");
var Info = require("./models/Info");

let myDatabase = function() {}

//add or modify.  Complete getAllObjects function.
myDatabase.prototype.getAllObjects = function(res) {
    Info.find({},function(error,info) {
        if (error) {
            return res.json(null);
        } else {
            let objs = [];
            for (let i=0;i<info.length;i++) {
            objs.push({name:info[i].name,description:info[i].description,price:info[i].price,stock:info[i].stock,image:info[i].image});
            }
            return res.json(objs);
        }
    });
}


myDatabase.prototype.getObjectWithName = function(_name,res) {
  Info.find({name:_name},function(error,info) {
      if (error) {
          return res.json(null);
      }
      else if (info == null) {
          return res.json(null);
      }

      if (info.length == 1)
      {       
        return res.json({name:info[0].name,description:info[0].description,price:info[0].price,stock:info[0].stock,image:info[0].image});
      }
      else
      {
          return res.json(null);
      }
   });

}

myDatabase.prototype.addObject = function(obj,res) {

    Info.create(obj,function(error,info) {
        if (error) {
          console.log(error)
            return res.json(null);
        }
	  let obj2 = {ident:obj.ident,name:obj.name};
        return res.json(obj2);
    });
}


//add or modify.  Complete changeObject function.

myDatabase.prototype.changeObjectWithName = function(origName,obj,res) {
  console.log(origName);
Info.findOneAndUpdate({name:origName},{name:obj.name,description:obj.description,price:obj.price,stock:obj.stock},function(error,info) {
          if (error) {
              return res.json(null);
          }
          else if (info == null) {
              return res.json(null);
          }
          return res.json(obj);
      });
}


//add or modify.  Complete deleteObjectWithID function.
myDatabase.prototype.deleteObjectWithName = function(_name,res) {

    Info.remove({name:_name},function(error,removed) {
        if (error) {
            return res.json(null);
        }
        console.log(removed.result)
        return res.json(removed.result);
    });
}


module.exports = myDatabase;