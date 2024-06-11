import client from '../config/DBConfig';
import Joi from 'joi';
import {Request, Response} from 'express';
import { fromUnixTime, format } from 'date-fns';


// create post, delete post, get posts of an user, get all posts in reverse-chronological order, update post content. 

const postSchema = Joi.object({
    user_id: Joi.number().required(),
    title: Joi.string().max(30),
    tag: Joi.string().max(30),
    text_content: Joi.string().max(200),
    post_date: Joi.date().timestamp('unix').required(),
    image_url: Joi.string(),
    like_count: Joi.number().default(0).required()
})


interface postObject {
    user_id: number,
    title: string,
    tag:string,
    text_content: string,
    post_date: Date,
    image_url: string,
    like_count: number,
}

const samplePost: postObject = {
    user_id: 1,
    title: "Sample title",
    tag: "beauty",
    text_content: "This will be a sample description for a post that will be displayed on the website",
    post_date: new Date(),
    image_url: "https://www.shutterstock.com/shutterstock/videos/1056585617/thumb/1.jpg?ip=x480",
    like_count: 0,
}

const validatePost = async (postData: postObject) => {
    const { error } = postSchema.validate(postData);
    if (error) {
        return error.details[0].message;
    } return
}

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const result = await client.query('SELECT * FROM beautice.posts ORDER BY post_id DESC;')
        res.status(200).json(result.rows)
    } catch (error){
        res.status(400).json({error: error})
    } 
}


const getPostsFromUser = async (req: Request, res: Response) => {
    const userId = req.params.userId

    try {
        const result = await client.query('SELECT * FROM beautice.posts WHERE user_id = $1', [userId]);

        return result.rows;
    } catch (error) {
        console.error(error)
        return error
    }
}

const createPost = async (req: Request, res: Response) => { //TODO add joi validate for create post
    const postData:postObject = req.body.postData;

    const {user_id, title, tag, text_content, post_date, image_url, like_count} = postData;

    const date = new Date(post_date);
    const timestamp = date.toISOString();


    try {
        const result = await client.query(`INSERT INTO beautice.posts (user_id, title, tag, text_content, post_date, image_url, like_count)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING post_id, user_id, title, tag, text_content, post_date, image_url, like_count
        `, [user_id, title, tag, text_content, timestamp, image_url, like_count])
        if (result.rowCount === 1){
            res.status(200).json(result.rows[0])
        } else{
            res.status(400).json({error: "Internal server error at create post"})
        }
    } catch (error) {
        res.status(400).json({error: error})
    }
}

const deletePost = async (req: Request, res: Response) => {
    const postId = req.body.postId;
    try {
        const result = await client.query('DELETE FROM beautice.posts WHERE post_id = $1', [postId])
        return result.rowCount === 1 ? "Delete post successfully" : "Delete post unsuccessfully"
    } catch (error) {
        console.error(error)
        return error
    }
}


const editPost = async (post_id: number, updateData: { text_content?: string, image_url?: string }) => {
    // Construct the SQL query dynamically based on what data is provided
    const updates = [];
    const values = [];

    if (updateData.text_content) {
        updates.push(`text_content = $${updates.length + 1}`);
        values.push(updateData.text_content);
    }

    if (updateData.image_url) {
        updates.push(`image_url = $${updates.length + 1}`);
        values.push(updateData.image_url);
    }

    if (updates.length === 0) {
        throw new Error("No valid fields to update");
    }

    values.push(post_id);
    const setClause = updates.join(', ');

    const query = `UPDATE beautice.posts SET ${setClause} WHERE post_id = $${values.length}`;

    try {
        const result = await client.query(query, values);
        return result.rowCount === 1 ? "Update successful" : "Update failed";
    } catch (error) {
        console.error('Error updating post:', error);
        return error;
    }
}


const fetchPostById = async (req: Request, res: Response) => {
    const postId = req.params.postId;
    try {
        const result = await client.query('SELECT * FROM beautice.posts WHERE post_id = $1', [postId])
        if (result.rowCount === 1){
            res.status(200).json(result.rows[0])
        } else{
            res.status(400).json({error: "Cannot get post with given ID"})
        }
    } catch (error) {
        res.status(400).json({error: error})
    }
}




export {postObject, samplePost, getAllPosts, getPostsFromUser, createPost, deletePost, editPost, fetchPostById}