// Middleware to check cache
import redis from 'redis'
import asyncHandler from 'express-async-handler';
import { client } from '../index';

export const checkCache=asyncHandler(async(req, res, next)=> {
    const { email} = req.body; // You can adjust this depending on your routes
    const  data = await client.get(`${req.params.chatId}`); //get data from cache and check if it exists
    if(data !== null){
      res.send(JSON.parse(data));
    }else{
      next();
    }
  });
  

  