const express = require('express')

const router = express.Router({mergeParams:true});
/**
 * This routes are used for testing that your  server is workng fine
 * You can do anything here from ping your databases i.e redis. mongo or postgres
 * to ensure that they're working fine
 * 
 * When deploying on the cloud, your cloud provider might occasionaly call theses endpoints to 
 * check if you app is running fine and it's gets an error you get notified. 
 */

router.get('/', (req, res, next) => {
    try{
        res.status(200).json({
            success:true, 
            status: 'alive'
        })
    }catch(e){

    }
})

router.get('/health', (req, res, next) => {
    try{
        res.status(200).json({
            success:true, 
            status: 'alive'
        })
    }catch(e){

    }
})

router.get('/healthz', (req, res, next) => {
    try{
        res.status(200).json({
            success:true, 
            status: 'alive'
        })
    }catch(e){

    }
})

module.exports = router 
