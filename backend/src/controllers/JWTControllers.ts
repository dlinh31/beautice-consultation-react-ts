import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET_KEY || ''
const generateToken = (id: string) => {
    
    const token = jwt.sign({id}, jwtSecret, {expiresIn: '1d'});
    return token
  }

const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, jwtSecret);
  return decoded
}


export {generateToken}
