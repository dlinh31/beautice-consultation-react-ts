
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' });
const jwtSecret = process.env.JWT_SECRET_KEY || 'secret-for-now'

const generateToken = (user_id: string) => {
    
    const token = jwt.sign({user_id}, jwtSecret, {expiresIn: '1d'});
    return token
  }

const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, jwtSecret);
  return decoded
}

export {generateToken, verifyToken}