import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';
dotenv.config({path:'./.env'});


const generatetoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    })
}

export default generatetoken