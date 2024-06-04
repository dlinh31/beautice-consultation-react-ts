import {
    SignUpUser, SignInUser, verifyJWT, fetchUserFromId
} from '../controllers/UserControllers';

const express = require('express')
const router = express.Router()

router.post('/signup', SignUpUser)
router.post('/signin', SignInUser)
router.post('/verifyToken', verifyJWT)
router.get('/getUser/:id', fetchUserFromId)
export {router};