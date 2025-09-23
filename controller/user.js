const {User}=require('../model/user')

const signup= async (req,res)=>{
   let {fullName,email,password} =req.body;
   await User.create({
     fullName,
     email,
     password
    });
   res.redirect('/')
}
const signin=async (req,res)=>{
   let {email,password}=req.body;
   try{
    const token =await User.matchPasswordAndgeneratetoken(email,password)//return token  
    return res.cookie("token",token).redirect("/");
   }catch(err){
     res.render("signin",{
      error:"Incorrect email or password"
     })
   }
}

module.exports={
    signup,
    signin
}