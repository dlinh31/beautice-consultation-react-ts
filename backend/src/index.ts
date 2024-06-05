import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });
import {router as userRoutes} from './routes/UserRoutes';
import {router as postRoutes} from './routes/PostRoutes';
const port = process.env.EXPRESS_PORT || 3001
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', userRoutes)
app.use('/', postRoutes)

app.listen(port, () => console.log(`Listening at port ${port}`))
