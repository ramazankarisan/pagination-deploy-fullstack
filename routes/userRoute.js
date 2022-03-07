const express = require('express');
const { update } = require('../models/User');
const User = require('../models/User');

const router = express.Router();


router.post('/add',async(req ,res)=>{
    try {
       const result = await User.create({
          name :{ firstName:req.body.firstName,
                 lastName:req.body.lastName
         }, 
          address:{
              city:req.body.city,
              postcode:req.body.postcode,
              street:req.body.street
          },
          phone:req.body.phone,
          country:req.body.country,
          language:req.body.language,
          email:req.body.email
        });
        res.status(200).json({ msg:" User created" ,user: result} )
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:" server error" ,error} )
    }
});

router.get('/all' , async(req , res)=>{
    const allUsers = await User.find().lean();
    if(!allUsers){
        return res.status(404).json({ msg : 'No users yet'})
    }
    return res.status(200).json({ msg:'users found', allUsers});
})

router.get('/select' , async(req , res)=>{
    const allUsers = await User.find({ country:"Brazil"}).lean().select('country address name');
    if(!allUsers){
        return res.status(404).json({ msg : 'No users yet'})
    }
    return res.status(200).json({ msg:'users found', allUsers});
});

// limit 

router.get('/limit20' , async(req , res)=>{
    const allUsers = await User.find().lean().limit(20);
    if(!allUsers){
        return res.status(404).json({ msg : 'No users yet'})
    }
    return res.status(200).json({ msg:'users found', allUsers});
})

// sort 
router.get('/sort' , async(req , res)=>{
    const allUsers = await User.find().lean().sort({ "email":-1})
    if(!allUsers){
        return res.status(404).json({ msg : 'No users yet'})
    }
    return res.status(200).json({ msg:'users found',  count : allUsers.length, allUsers});
})

// the last 5 users created in the database 


// get the lat 100 user in the users collection
// limit = 100
    // page =  10
    // skip = (page -1) * limit 
    // skip =(10 - 1) * 100 = 900
router.get('/last100' , async(req , res)=>{
    
    const allUsers = await User.find().lean().skip(900).limit(100);
    if(!allUsers){
        return res.status(404).json({ msg : 'No users yet'})
    }
    return res.status(200).json({ msg:'users found',  count : allUsers.length, allUsers});
});

router.get('/paginate' , async(req, res)=>{
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page -1) * limit;
    const allUsers = await User.find().lean().skip(skip).limit(limit);
    if(!allUsers){
        return res.status(404).json({ msg : 'No users yet'})
    }
    return res.status(200).json({ msg:'users found',  count : allUsers.length, allUsers});
});

// updating user and add favorites to the document using findByIdandUpdate()
router.patch('/favorites/add/:id' , async (req,res)=>{
try {       
   
    const id  = req.params.id;
    console.log(req.body.favorite);
    const updatedUser = await User.findByIdAndUpdate(id, { $push : {favorites : req.body.favorite }},{new:true});
    if(!updatedUser){
        return res.status(404).json({ msg : ' User not found or not updated'})
    }
    return res.status(200).json({ msg :'user updated ' ,updatedUser});
} catch (error) {
    console.log(error);
    return res.status(500).json({ msg :'server error ' , error})
        


}
});

// $addtoset : add the value to the array if the value does not already exist

router.patch('/favorites/add/unique/:id', async(req, res)=>{
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id , { $addToSet : {favorites :req.body.favorite }} , { new:true});
    if(!updatedUser){
        return res.status(404).json({ msg : ' User not found or not updated'})
    }
    return res.status(200).json({ msg :"user updated" , updatedUser} )
} );

// $pop remove value from the array when we updtare 
// $pop:-1 delete the first item from the array
// $pop: 1 delete the last element

router.patch('/favorites/remove/one/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(id , { $pop : {favorites :-1}} , { new:true});
        if(!updatedUser){
            return res.status(404).json({ msg : ' User not found or not updated'})
        }
        return res.status(200).json({ msg :"user updated" , updatedUser} )
            
    } catch (error) {
        res.status(500).json({ msg :'server error' , error} )
    }
} );

// $set add new field to the document( update the document)
// req.body can have the new field value
// if the field exist it will update the value

router.patch('/update/:id' , async(req, res)=>{
    try {
        const {id} = req.params;
        const uname = req.body.uname;
        const updatedUser = await User.findByIdAndUpdate(id , { $set : {username : uname}} , { new:true});
        if(!updatedUser){
            return res.status(404).json({ msg : ' User not found or not updated'})
        }
    return res.status(200).json({ msg :"user updated" , updatedUser} );
        
    } catch (error) {
        res.status(500).json({ msg :'server error' , error} )
    }
});

// $unset remove field of the document 
router.patch('/update/removefield/:id' , async(req, res)=>{
    try {
        const {id} = req.params;
        const updatedUser = await User.findByIdAndUpdate(id , {$unset :{ username:""}} , {new : true});
        if(!updatedUser){
            return res.status(404).json({ msg : ' User not found or not updated'})
        }
        return res.status(200).json({ msg :"user updated" , updatedUser} );
        
    } catch (error) {
        res.status(500).json({ msg :'server error' , error} );
    }
});

// get user by firstName 
router.get('/firstname/:fname', async(req, res)=>{
    const firstName = req.params.fname;
    const foundUser = await User.find().where("name.firstName").equals(firstName);
    if(!foundUser || foundUser.length === 0 ){
        return res.status(404).json({ msg : ' User not found'})
    }
    return res.status(200).json({ msg :"user found" , foundUser} );
    
})

// get user by favorites
router.get('/favorites/', async(req, res)=>{
    const favoritesArr = req.body.favorites
    const foundUser = await User.find().where("favorites").in(favoritesArr);
    //const foundUser = await User.find().where("age").lt(50).gt(18);
    if(!foundUser || foundUser.length === 0 ){
        return res.status(404).json({ msg : ' User not found'})
    }
    return res.status(200).json({ msg :"user found" , foundUser} );
    
})


module.exports = router;
