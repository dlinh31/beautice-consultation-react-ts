import {getAllPosts, getPostsFromUser, createPost, deletePost, editPost} from '../controllers/PostController';

import express from 'express';
const router = express.Router()

router.get('/getAllPosts', getAllPosts)


export {router}