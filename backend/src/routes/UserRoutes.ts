import {
    SignUpUser, SignInUser, verifyJWT, fetchUserFromId
} from '../controllers/UserControllers';

import express from 'express';
const router = express.Router()

router.post('/signup', SignUpUser)
router.post('/signin', SignInUser)
router.post('/verifyToken', verifyJWT)
router.get('/getUser/:id', fetchUserFromId)
export {router};