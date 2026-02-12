import express from "express";
import cors from "cors";
import userRoutes from './users.routes.js';
const app = express()
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = 5000;
app.listen ( PORT , () => { console.log( `server running on port ${PORT}`)});