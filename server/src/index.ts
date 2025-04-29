import express from 'express';
import cors from 'cors';
import AdminRouter from './routes/admin';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

const app = express();

dotenv.config({
    path: path.join(__dirname, '../.env')
});

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000/'],
    credentials: true, 
    methods: ['GET', 'POST']
}));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL || '', {dbName: process.env.DB_NAME});

app.use('/', AdminRouter);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
}) 