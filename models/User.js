const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    name : {
        firstName:{ type:String , required:true ,default:'test'},
        lastName:{ type:String , required:true ,default:'test lastname'}
    },
    address: {
        city:{type : String, required:true},
        postcode: {type : String, required:true},
        street:   {type : String, required:true}
    },
    phone: { type:String },
    country : { type:String , required:true},
    language : { type:String , 
        //enum:["de","en","ru","fr","ar"]
     },
    email : { type : String , required:true},
    favorites:[{ type : String,required:false}] ,
    username : { type : String },

})
const User = model('user' , userSchema);

module.exports = User;