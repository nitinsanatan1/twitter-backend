// src/app.ts
import dotenv from 'dotenv';

dotenv.config({
  path: `.env`
});

import express from 'express';
import bodyParser from 'body-parser';
import { authRouter } from './routes/auth';
import { feedRouter } from './routes/feed';
import { followRouter } from './routes/follow';
import { mongoConnect } from './configs/database';
import authenticationMiddleware from './middleware/authenticationMiddleware';

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoConnect();

app.get("/", (req, res) => {
  res.send({
    name: "twitter-backend",
    version: "1.0.0"
  });
});

// Include routes
app.use('/auth', authRouter);

// Using auth middlweware for follow and feed related activities
app.use(authenticationMiddleware);

app.use('/feed', feedRouter);
app.use('/follow', followRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;