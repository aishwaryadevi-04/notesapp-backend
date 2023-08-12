const {ApError, ApiError} = require('../middleware/apierror')
const httpStatus = require('http-status');

/// models
const { User } = require('../models/user')


const userService = require('./user.service')
const createUser = async(email,password) => {
    try{
        if(await User.emailTaken(email)){
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry email taken')
        }

        const user = new User({
            email,
            password
        });
        await user.save();
        return user;
    } catch(error){
        throw error
    }
}

const genAuthToken = (user) =>{
    const token = user.generateAuthToken();
    return token;
}


const signInwithEmailandPassword=async(email,password)=>{
    try{
        const user = await userService.findUserByEmail(email)
        if(!user){
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry bad email')
        }
        if(!(await user.comparePassword(password))){
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry bad password')
        }
        return user;
    }
    catch(error){
        throw error
    }
}

module.exports = {
    createUser,
    genAuthToken,
    signInwithEmailandPassword
}