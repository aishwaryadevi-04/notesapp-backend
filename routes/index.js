const express = require('express');
const router = express.Router();

// routes

const userRoute = require('./user.route')
const notesRoute = require('./notes.route')

const routesIndex = [
    
    {
        path:'/users',
        route: userRoute
    },
    {
        path:'/notes',
        route:notesRoute
    }
] 

routesIndex.forEach((route)=>{
    router.use(route.path,route.route)
})



module.exports = router