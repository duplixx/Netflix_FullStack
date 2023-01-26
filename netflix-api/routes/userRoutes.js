const {addTolikedMovies} = require('../controllers/userControllers'); 
const express = require('express');
const router = express.Router();
const userSchema = require('../models/userModel');

router.post("/add",addTolikedMovies);

router.get('/', async(req, res) => {
    try{
        const aliens = await userSchema.find({})
        res.json(aliens)

    }
    catch(err){
        res.send('Error ' + err)
    }
});


module.exports=router;



