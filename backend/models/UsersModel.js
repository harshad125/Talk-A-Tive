import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const schema=mongoose.Schema;

const usermodel=new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    pic: {
        type:String,
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
},
{
    timestamps:true
});

// usermodel.methods.matchPassword = async function (enteredPassword) {
//     console.log(enteredPassword,this.password)
//     return await bcrypt.compare(enteredPassword, this.password);
//   };

// usermodel.pre("save", async function (next) {
//     if (!this.isModified) {
//       next();
//     }
  
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   });
export default mongoose.model("User",usermodel)