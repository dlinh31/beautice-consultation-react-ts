import jwt from 'jsonwebtoken'

const generateToken = (id: string) => {
    const jwtSecret = 'secret-for-now'
    const token = jwt.sign({id}, jwtSecret, {expiresIn: '1d'});
    return token
  }

export {generateToken}
  