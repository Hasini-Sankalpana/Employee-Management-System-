// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes.js';
import { connectDB } from './db.js';
import reportRouter from './routes/reportRoutes.js';
import authRouter from './routes/authRoutes.js';



const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use('/api/employees', employeeRoutes);
app.use('/api/reports', reportRouter);
app.use('/api/auth', authRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
