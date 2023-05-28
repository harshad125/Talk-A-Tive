import mongoose from 'mongoose'
import * as dotenv from 'dotenv';
//const url="mongodb+srv://javiya_125:harshad125@cluster1.oxydu.mongodb.net/odhp?retryWrites=true&w=majority"
dotenv.config({path:'./.env'})
const contomongo= ()=>{
     mongoose.connect(process.env.BASE_URL).catch((error)=>console.log(error))
}

export default contomongo;