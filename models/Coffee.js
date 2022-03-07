const { Schema , model } = require('mongoose');
const validator = require('validator');
// enum : the accepted values only: ['Arabica','Robusta','Bio Arabica' ,'Bio Robusta']
// trim : to delete spaces
const coffeeSchema = new Schema({
    name : {  type:String , required:[true , 'please provide coffee name'] ,trim :true,
      //validate : [validator.isAlpha , 'not Alpha ']
    },
    description : {  type:String , required:true ,lowercase: true ,maxlength:100 },
    price: { type : Number , required:true, min:2 , default : 2},
    category : { type : String , required :true , enum:{ 
        values:['Arabica','Robusta','Bio Arabica' ,'Bio Robusta'],
        message:'{VALUE} value are not accepted'
      }},
    createDate : { type : Date, required : true, default :Date.now},
    keywords : [ String]   // ["cold drink","sugar free drink"]
   // keywords :  [   { keyword : String, color:String   }]
} );

const Coffee = model('coffee', coffeeSchema);

module.exports = Coffee;