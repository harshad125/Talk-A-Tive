import AsyncHandler from "express-async-handler"
import Message from '../models/MessageModel'
import Chat from '../models/ChatModel'
import User from '../models/UsersModel'
import {client} from '../index'

export const sendmessage=AsyncHandler(async(req,res)=>{
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
  
    try {
      var message = await Message.create(newMessage);
  
      message = await message.populate("sender", "name pic")
      message = await message.populate("chat")
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });
  
     await Chat.findByIdAndUpdate(req.body.chatId, { lastMessage: message });
  
      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
})

export const allmessage=AsyncHandler(async (req,res)=>{
    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate("sender", "name pic email").populate("chat");

        client.set(`${req.params.chatId}`,JSON.stringify(messages));
        client.expire(`${req.params.chatId}`,parseInt((+new Date)/1000) +30);
        res.json(messages);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
})