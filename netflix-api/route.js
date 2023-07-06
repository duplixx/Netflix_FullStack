const express = require('express');
const router = express.Router();
const AlienSchema = require('../models/alien');


router.get('/', async(req, res) => {
    try{
        const aliens = await AlienSchema.find({})
        res.json(aliens)

    }
    catch(err){
        res.send('Error ' + err)
    }
});
router.get('/:id', async(req, res) => {
    try{
        const aliens = await AlienSchema.findById(req.params.id)
        res.json(aliens)

    }
    catch(err){
        res.send('Error ' + err)
    }
    
});

router.post('/', async(req, res) => {
    
    try {
        const newTodo = await AlienSchema.create({
            name: req.body.name,
            tech: req.body.tech,
            sub: req.body.sub,
        });
    
        await newTodo.save();
    
        return res.status(200).json(newTodo);
      } catch (error) {
        return res.status(500).json(error.message);
      }
});
router.patch('/:id', async(req, res) => {
    try{
        const aliens = await AlienSchema.findById(req.params.id)
        aliens.sub = req.body.sub
        const a1 = await aliens.remove()
        res.json(a1)

    }
    catch(err){
        res.send('Error ' + err)
    }
});

module.exports = router;