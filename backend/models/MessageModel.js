import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const schema=mongoose.Schema;

const messagemodel=new schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        trim:true
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
    }
},
{
    timestamps:true
}

)

export default mongoose.model("Message",messagemodel)