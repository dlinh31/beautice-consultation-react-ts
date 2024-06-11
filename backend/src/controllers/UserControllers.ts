import client from './ConnectDBControllers';
import Joi from 'joi';
import {Request, Response} from 'express';
import bcrypt from 'bcrypt'
import { generateToken, verifyToken } from './JWTControllers';
import { JwtPayload } from 'jsonwebtoken';


const userSchema = Joi.object({
  email: Joi.string().email().max(30).required(),
  password: Joi.string().min(6).required(), 
  first_name: Joi.string().max(30).required(),
  last_name: Joi.string().max(30).required(),
});

interface userObject {
  email: string,
  password: string,
  first_name: string,
  last_name: string
}

const validateUser = async(userData: userObject) => {
  const { error } = userSchema.validate(userData);
  if (error) {
     return (error.details[0].message);
  }
  return 
}

const findExistingEmail = async (email: string) => {
    try {
        const result = await client.query(`SELECT * FROM beautice.users WHERE email= $1;`, [email]);
        return result.rows.length > 0;
      } catch (err) {
        console.error('Error executing query', (err as Error).stack); 
        return false; 
      }
}

const SignUpUser = async (req: Request, res: Response) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password || !first_name || !last_name) {
      res.status(400).json({ error: "Please enter all required fields" });
      return;
  }

  // Validate user data
  const validationError = await validateUser({ email, password, first_name, last_name });
  if (validationError) {
      res.status(400).json({ error: validationError });
      return;
  }

  // Check if email already exists
  if (await findExistingEmail(email)) {
      res.status(409).json({ error: "Email already exists. Please register with another email." });
      return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);  // Use a salt round of 10

  // Insert user into database
  try {
      const result = await client.query(
          'INSERT INTO beautice.users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING user_id, email, first_name, last_name',
          [email, hashedPassword, first_name, last_name]
      );
      res.status(200).json(result.rows[0]);  // Successful creation
  } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: "Failed to create user" });
  }
};


const SignInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password){
      res.status(400).json({error: "Please enter all required fields."});
      return;
  }
  try {
    const userResult = await client.query('SELECT * FROM beautice.users WHERE email = $1 ;', [email]);
    if (userResult.rowCount === 0) {
        res.status(404).json({error: "User not found."});
        return;
    }

    const user = userResult.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
          res.status(401).json({error: "Incorrect password."});
          return;
      }
    const token = generateToken(user.user_id)
    res.status(200).json({user_id: user.user_id, email:user.email, first_name: user.first_name, last_name: user.last_name, token: token});
} catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({error: "An error occurred while processing your request."});
  }
};

const verifyJWT = async (req: Request, res: Response) => {
  const {token} = req.body;
  try{
    const verification: JwtPayload = await verifyToken(token) as JwtPayload;
    res.status(200).json({user_id:verification.user_id})
  } catch (error){
    res.status(400).json({error: error})
  }
}

const fetchUserFromId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userResult = await client.query('SELECT * FROM beautice.users WHERE user_id = $1 ;', [userId]);
    if (userResult.rowCount === 0) {
      res.status(404).json({error: "User not found."});
      return;
    }
    const user = userResult.rows[0];
    const {user_id, email, first_name, last_name} = user;
    const userData =  {user_id, email, first_name, last_name}
    res.status(200).json(userData)
  } catch(error){
    res.status(400).json(error)
  }
  
}


const fetchAllUsers = async () => {
  const userResult = await client.query('SELECT * FROM beautice.users;');
  console.log(userResult.rows)
  if (userResult.rowCount === 0) {
    return;
  }
}



export {SignInUser, SignUpUser, verifyJWT, fetchUserFromId}