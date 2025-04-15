import mongoose  from "mongoose"
import bcrypt from "bcryptjs"
let userSchema=new mongoose.Schema({
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
    role:{
        type:String,
        enum:["user","admin"],
        required:true,
        default:"user"
    },
    cartItems:[
        {
        quantity:{
            type:Number,
            default:1
        },
        product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product"
            }
        
}]
},{timestamps:true})
userSchema.pre("save",async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,10);
    next()
})
userSchema.methods.compare=async function(password){
    return await bcrypt.compare(password,this.password);
}
let User=mongoose.model("user",userSchema);
export default User;