import {getAllPosts, fetchPostById, getPostsFromUser, createPost, deletePost, editPost} from '../controllers/PostController';
import { upload, uploadImage } from '../controllers/FirebaseController';
import multer from 'multer';
import express from 'express';
const router = express.Router()

router.get('/getAllPosts', getAllPosts)
router.get('/getPost/:postId', fetchPostById)
router.post('/createPost', createPost)
router.delete('/deletePost/:postId', deletePost)
router.get('/getPostsFromUser/:userId', getPostsFromUser)
router.patch('/editPost', editPost)

// image routes
router.post('/uploadImage', upload.single('filename'), uploadImage)

export {router}