const {addTolikedMovies,getLikedMovies,removeFromLikedMovies} = require('../controllers/userControllers'); 
const express = require('express');
const router = express.Router();
const userSchema = require('../models/userModel');

router.post("/add",addTolikedMovies);

router.get("/liked/:email",getLikedMovies);
router.put("/delete",removeFromLikedMovies);


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



