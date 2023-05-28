import asyncHandler from 'express-async-handler'
import User from '../models/UsersModel'
import generatetoken from '../utility/generateToken'
import bcrypt from 'bcryptjs'

export const signup = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(401);
        throw new Error("please enter the all field")
    }
    const userexist = await User.findOne({ email });
    if (userexist) {
        res.status(400);
        throw new Error("user is already exist")
    }
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: secpass,
        pic
    })
    user.save();
    if (user) {
        res.status(201).json({ user, token: generatetoken(user._id) })
    } else {
        res.status(401);
        throw new Error("can't create new user")
    }
})

export const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ error: "please try to login with correct info" });
    }

    const passcom = await bcrypt.compare(password, user.password);

    if (!passcom) {
        return res.status(400).json({ error: "enter valid password" });
    }
    res.status(200).json({user, token: generatetoken(user._id) })
})

export const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  });