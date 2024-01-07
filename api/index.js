import express from "express";
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import likeRoutes from './routes/likes.js'
import commentRoutes from './routes/comments.js'
import authRoutes from './routes/auth.js'
import { db } from "./connectDb.js";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Credentials",true)
    next()
})
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173'
}));
app.use(cookieParser())
db.connect((err) =>{
    if(err){
        console.log(err);
    }else{
        console.log('Db connected succesfully!');
    }
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);

app.listen(5000, () => {
    console.log("Server is running on port 5000...");
})