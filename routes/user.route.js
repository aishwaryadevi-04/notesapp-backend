const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const authController=require('../controllers/auth.controller')
const auth=require('../middleware/auth')
// MIDDLEWARE


router.post('/register', authController.register);
router.post('/signin', authController.signin);
router.get('/isauth',auth(), authController.isauth)
router
.get('/profile',userController.profile)
.patch('/profile',userController.updateProfile)

router.patch('/email',userController.updateUserEmail)
router.get('/verify',userController.verifyAccount)


module.exports = router;