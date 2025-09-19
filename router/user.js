const express=require('express')

const router=express.Router();
const {signup,signin} = require('../controller/user')
router.use(express.urlencoded({extended:true}))
router.use(express.json())

router.get('/', (req,res)=>{
    res.render("Home.ejs")
})
router.get('/signup', (req,res)=>{
  res.render("signup.ejs");
})
router.post('/signup', signup)

router.get('/signin', (req,res)=>{
    res.render("signin.ejs");
})
router.post('/signin', signin)

router.get('/logout',(req,res)=>{
  res.clearCookie('token').redirect('/')
})

module.exports=router; 