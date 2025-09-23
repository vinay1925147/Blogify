const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const {createTokenUser}=require('../services/authentication')
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    salt:{
        type:String
    },
    password:{
        type:String,
        required:true 
    },
    profileImageURL:{
        type:String,
        default:"defaultuserimage.jpg"
    },
    roll:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
} ,{ timestamps:true});

// encrypt the password throw salt below --- using Hashing 
userSchema.pre('save', async function(next){
   try{
    let user = this;
    if(!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(16);
    const hashpassword= await bcrypt.hash(user.password,salt);
    user.password=hashpassword;
    user.salt=salt;
    next();
   }
   catch(err) {
    next(err);
   }
}) 
userSchema.static("matchPasswordAndgeneratetoken",async function(email,password){
    const user = await this.findOne({email})
    if(!user)  throw new Error("user not found");
    const salt = user.salt;
    const hashpassword = user.password;
    const userProvidedHash =await bcrypt.hash(password,salt)
     if(hashpassword!==userProvidedHash) throw new Error("password not matched");
    //  return {...user._doc}
    const token = createTokenUser(user);
    return token;
 })
 
const User = mongoose.model("User",userSchema);
module.exports={User}