import express from 'express'
import { protect } from '../middleware/authMiddleware';
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from '../controller/chatcontroller';
const chatRoutes=express.Router();

chatRoutes.post("/ac",protect,accessChat)
chatRoutes.get("/fetch1",protect,fetchChats)
chatRoutes.post("/group",protect,createGroupChat)
chatRoutes.put("/rename",protect,renameGroup)
chatRoutes.put("/remove",protect,removeFromGroup)
chatRoutes.put("/add",protect,addToGroup)


export default chatRoutes