import {
    SignUpUser, SignInUser, verifyJWT, fetchUserFromId, editUserInfo
} from '../controllers/UserControllers';

import express from 'express';
const router = express.Router()

router.post('/signup', SignUpUser)
router.post('/signin', SignInUser)
router.post('/verifyToken', verifyJWT)
router.patch('/editUserInfo', editUserInfo)
router.get('/getUser/:userId', fetchUserFromId)
export {router};