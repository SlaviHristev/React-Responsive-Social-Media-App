import Express from "express";
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import likeRoutes from './routes/likes.js'
import commentRoutes from './routes/comments.js'
import authRoutes from './routes/auth.js'


const app = Express();

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);

app.listen(5000, () => {
    console.log("Server is running on port 5000...");
})