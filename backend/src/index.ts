import express from 'express';
import cors from 'cors';
import {router as userRoutes} from './routes/UserRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', userRoutes)

app.listen(3001, () => console.log("Listening at port 3001"))
