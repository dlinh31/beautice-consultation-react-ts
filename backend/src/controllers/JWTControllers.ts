import jwt from 'jsonwebtoken'

const generateToken = (id: string) => {
    const jwtSecret = 'secret-for-now'
    const token = jwt.sign({id}, jwtSecret, {expiresIn: '1d'});
    return token
  }

const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, 'secret-for-now');
  return decoded
}


export {generateToken}
