const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const routes = require('./routes');


const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');
const { handleError, convertToApiError } = require('./middleware/apierror');

const mongoUri=
`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p2fazc9.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongoUri);

// PARSING
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
 }))
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
// PASSPORT
app.use(passport.initialize());
passport.use('jwt',jwtStrategy);

/// routes
app.use('/api',routes)

/// error handling
app.use(convertToApiError)
app.use((err,req,res,next)=>{
    handleError(err,res)
})

const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
});