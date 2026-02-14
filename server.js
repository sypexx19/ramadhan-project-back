import express from "express";
import cors from "cors";
import userRoutes from './users.routes.js';
const app = express()
app.use(cors({
  origin : "https://ramadhan-project-front.vercel.app"}
));
app.use(express.json());

app.use('/users', userRoutes);
app.get("/", (req, res) => {
  res.send("API working");
});

const PORT = process.env.PORT || 5000;
app.listen ( PORT , () => { console.log( `server running on port ${PORT}`)});