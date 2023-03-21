import express from 'express';
import cors from 'cors';
import userRouter from './routes/users.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use([userRouter]);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
