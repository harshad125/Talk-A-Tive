import express from 'express'
import { protect } from '../middleware/authMiddleware';
import { allmessage, sendmessage } from '../controller/messageController';

const messageRoutes=express.Router();

messageRoutes.post('/',protect,sendmessage);
messageRoutes.get("/:chatId",protect,allmessage)


export default messageRoutes