'use strict';

const express = require ('express');
const { get } = require('../../lib/connectToMongoose');
const router = express.Router();
const Advertisement = require('../../model/Advertisement')
const { route } = require('..');

module.exports = router;

/**
 * GET 
 */

//api/advertisements

router.get('/', async function(req, res, next)  {
    try{
        const name = req.query.name;
        const sale = req.query.sale;
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const fields = req.query.fields;
        const sort = req.query.sort;
        const price = req.query.price;

        const filter = {};

        if(name){
            //filter.name = name;
            filter.name = new RegExp ('^'+ name)
        }

        if(sale){
            filter.sale = sale;
        }

        if(price){
            filter.price = price;
        }

        const result = await Advertisement.lista(filter, limit, skip, fields, sort)
        res.json(result)
        //console.log(res, result)
    }catch(err){
        next(err);
    }
})

router.get('/tags', async (req, res, next)=>{
    try {
        const result = await Advertisement.tagsList()
        res.json(result)
    } catch (error) {
        next(error)
    }
})
// advertisement by id
router.get('/:id', async (req, res, next)=>{
    try {
        const _id = req.params.id;

        const advertisement = await Advertisement.findOne({ _id: _id });

        if(!advertisement){
            return res.status(404).json({ error: 'Not Found'});
        }
        res.json({ result: advertisement });
    } catch (error) {
        next(error)
    }
})

/**
 * POST
 */

 //Created new Advertisement

router.post('/', async (req, res, next)=>{
    try {
        const advertisementData = req.body;
        
        const advertisement = new Advertisement(advertisementData);
        const advertisementCreated = await advertisement.save();

        res.status(201).json({ result: advertisementCreated });
    } catch (err) {
        next(err)
    }
})

/**
 * PUT
 */
//Update Advertisement
router.put('/:id', async (req, res, next)=>{
    try {
        const _id = req.params.id;
        const advertisementData = req.body;

        const advertisementUpdate = await Advertisement.findOneAndUpdate( { _id: _id}, advertisementData, { 
            useFindAndModify: false,
            new: true 
        });
        if(!advertisementUpdate){
            res.status(404).json({ error: 'Not Found'});
        }

        res.json( { result: advertisementUpdate});
    } catch (error) {
        next(error)
    }
})

/**
 * DELETE
 */
//delete an advertisement
router.delete('/:id', async (req, res, next) =>{
    try {
        const _id = req.params.id;

        await Advertisement.deleteOne( {_id: _id});

        res.json();
    } catch (error) {
        next(error)
    }

})
module.exports = router;