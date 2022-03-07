const express = require('express');
const { findByIdAndUpdate } = require('../models/Coffee');
const Coffee = require('../models/Coffee');

const router = express.Router();

router.get('/' , async(req , res)=>{
    //res.send(' get all coffee products')
    try {
        const allCoffee = await Coffee.find().sort({ "createDate":-1});
        if(!allCoffee){
           return res.status(200).json({ msg :"no coffee found"})
        }
        return res.status(200).json({ msg :"coffee found" , allCoffee})
    } catch (error) {
        return res.status(500).json({ msg :"we have an error" , error})
    }

});

router.post('/add' , async(req , res)=>{
 try {
     console.log(req.body);
    const result = await Coffee.create({
        name :req.body.name,
        description:req.body.description,
        category:req.body.category,
        price:req.body.price,
        keywords:req.body.keywords
   
    });
    return res.status(201).json({msg:" Coffee was created" ,createdCoffee:result});
     
 } catch (error) {
     //console.log(error);
     return res.status(500).json({ msg :' we have an error' , error});
 }
})


// get coffee using name 
router.get('/byname/:name' , async(req,res)=>{
    const foundCoffee = await Coffee.findOne({'name' : req.params.name});
    if(!foundCoffee) {
        return res.status(404).json({ msg : 'no coffee found'})
    }
    return res.status(200).json({result : foundCoffee});
});

router.get('/:id' , async(req, res)=>{
    const { id } = req.params
    const foundCoffee = await Coffee.findById(id);
    if(!foundCoffee) {
        return res.status(404).json({ msg : 'no coffee found'})
    }
    return res.status(200).json({result : foundCoffee});
});

router.patch('/update/:id' , async(req,res)=>{
    try {        
    
    const updatedCoffee = await Coffee.findByIdAndUpdate(req.params.id,{
        name :req.body.name,
        description:req.body.description,
        category:req.body.category,
        price:req.body.price,
        keywords:req.body.keywords
    },{new:true});
    if(!updatedCoffee){
        res.status(404).json({ msg : 'coffee not found'})
    }
    res.status(200).json({ msg : 'coffee updated' , updatedCoffee})
} catch (error) {
    res.status(404).json({ msg : 'server error', errormsg:error})   
}

});

module.exports = router;