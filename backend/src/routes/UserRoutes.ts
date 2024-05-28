import {
    SignUpUser, SignInUser
} from '../controllers/UserControllers';

const express = require('express')
const router = express.Router()

router.post('/signup', SignUpUser)
router.post('/signin', SignInUser)
export {router};