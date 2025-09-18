const express=require('express')
const {User}=require('../model/user')
const router=express.Router();

router.use(express.urlencoded({extended:true}))
router.use(express.json())

router.get('/', (req,res)=>{
    res.render("Home.ejs")
})
router.get('/signup', (req,res)=>{
  res.render("signup.ejs");
})
router.post('/signup',  async (req,res)=>{
   let {fullName,email,password} =req.body;
   await User.create({
     fullName,
     email,
     password
    });
   res.redirect('/user')
})
router.get('/signin', (req,res)=>{
    res.render("signin.ejs");
})
router.post('/signin', async (req,res)=>{
   let {email,password}=req.body;
   try{
    const token =await User.matchPasswordAndgeneratetoken(email,password)//return token  
    return res.cookie("token",token).redirect("/");
   }catch(err){
     res.render("signin",{
      error:"Incorrect email or password"
     })
   }
})

router.get('/logout',(req,res)=>{
  res.clearCookie('token').redirect('/')
})

module.exports=router; 