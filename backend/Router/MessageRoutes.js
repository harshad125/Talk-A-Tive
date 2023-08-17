import express from 'express'
import { protect } from '../middleware/authMiddleware';
import { allmessage, sendmessage } from '../controller/messageController';
import { checkCache } from '../middleware/cashingMiddleware';

const messageRoutes=express.Router();

messageRoutes.post('/',protect,sendmessage);
messageRoutes.get("/:chatId",protect,checkCache,allmessage)


export default messageRoutes