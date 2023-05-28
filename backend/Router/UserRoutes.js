import express from 'express'
import { signup ,login, allUsers } from '../controller/usercontroller';
import { protect } from '../middleware/authMiddleware';
const userRoutes=express.Router();

userRoutes.post("/rg",signup)
userRoutes.post("/login",login)
userRoutes.get("/allusers",protect,allUsers)

export default userRoutes