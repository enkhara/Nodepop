'use strict';

//load modules
const mongoose = require('mongoose');
const { dropCollection, get } = require('./lib/connectToMongoose');
const testAdvertisements = require('./advertisements.json');
//load model
const Advertisement = require('./model/Advertisement')

function getAdvertisements(){
    
    testAdvertisements.advertisements.forEach(testAdvertisement =>{
        //console.log(`este es el anuncio ${testAdvertisement}`)
        let advertisementToAdd = new Advertisement(testAdvertisement);
        try{
            advertisementToAdd.save(function(err, advertisementCreated){
                if(err) {
                    return console.log(err);
                };
                console.log(`Advertisement ${advertisementCreated} created`);
            })
        }catch(err){
            console.log(err)
        }
    });

}
function disconnectDB(){
    
    try{
        mongoose.connection.close()
    }catch(err){
        console.log('err');
    }
}
async function seedDB(){
    
    try{
        //connect to db
        await mongoose.connection.dropCollection('advertisements', function(){
            console.log('dropCollection success');
        });

        await getAdvertisements()
        await disconnectDB();
    }catch(err){
        console.log(`An error success ${err}`);
        return err;
    }
    
}

seedDB()
//disconnectDB()



