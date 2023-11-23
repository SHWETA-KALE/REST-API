const express = require('express')
const router = express.Router()
const Alien = require('../models/alien')

//creating endpoints
router.get('/', async(req,res)=>{
    try {
        const aliens = await Alien.find()
        res.json(aliens)
    } catch (error) {
      res.status(500).send('Internal erver error')  
      console.log(error)
    }
   res.status(200).send('Get Request')
})

//for getting one particular alien 
router.get('/:id', async(req,res)=>{
    try {
        const alien = await Alien.findById(req.params.id)
        res.json(alien)
    } catch (error) {
      res.status(500).send('alien with this id not found')  
      console.log(error)
    }
   res.status(200).send('Get Request')
})

router.post('/', async(req,res)=>{
    //created a obj
    const alien = new Alien ({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })

    try {
        const a1 = await alien.save()
        res.json(a1)
    } catch (error) {
        res.status(500).send('Internal server error')
    }
})


router.patch('/:id',async(req,res)=>{
    try {
        const alien = await Alien.findById(req.params.id)
        //here we are trying to patch(update) only one entity that is subscription
        alien.sub = req.body.sub
        // alien.name = req.body.name
        // alien.tech = req.body.tech
        const a1 = await alien.save()
        res.json(a1)
    } catch (error) {
        res.status(500).send('changes not made')
    }
})

router.delete('/:id', async(req,res)=>{
    try {
        const alien = await Alien.findById(req.params.id);
        if(!alien){
            return res.status(404).json({message: 'Alien not found'})
        }
        //const removedAlien = await alien.remove();
        const removedAlien = await Alien.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'Alien deleted successfully', data: removedAlien })
    } catch (error) {
        res.status(500).send('could not delete alien try again')
        console.log(error)
    }
})
module.exports = router;