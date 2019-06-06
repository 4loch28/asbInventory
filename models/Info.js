

var mongoose = require("mongoose");

//Schema is a decription (the definition) of the mongoDB document.
var infoSchema = mongoose.Schema({
	name: {
		required: true,
		unique: true,
		type:String
	},
	description: String,
	price: Number,
	stock: Number,
	image: String
});



//var Info = mongoose.model("Info",{
//	ident: {
//		required: true,
//		unique: true,
//		type:String
//	},
//	name: String
//});

var Info = mongoose.model("Info", infoSchema);



module.exports = Info;



