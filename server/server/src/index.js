import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/services.js';
import requestRoutes from './routes/requests.js';
import { chatHandler } from './socket/chat.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/requests', requestRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL } });
chatHandler(io);

server.listen(process.env.PORT || 5000, () =>
  console.log(`🚗 Server running on port ${process.env.PORT || 5000}`)
);
