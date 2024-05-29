const jwt = require('jsonwebtoken')
import { Request, Response, NextFunction } from 'express';
import client from '../controllers/ConnectDBControllers';


const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "User Not Authorized" });
    }
    const token = authorization.split(' ')[1];
    try {
        const { id } = jwt.verify(token, 'secret-for-now')
        const result = await client.query("SELECT * FROM users WHERE id = ?", [id])
        if (result.rowCount == 1){
            next()
        }
    } catch (error){
        console.log(error);
        res.status(401).json({error: "Unauthorized Request"})
    }
};

export default userAuth;