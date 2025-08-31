import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import noteRouter from './routes/note.routes.js';
import connectToDatabase from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';


const app = express();


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/notes', noteRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to the Note App!');
})

app.listen(PORT, async () => {
    console.log(`Listening on ${PORT}...`);

    await connectToDatabase();
});


