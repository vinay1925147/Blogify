const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path=require('path');
const cookiesParser = require('cookie-parser');
const userRoute=require('./router/user');////for signin/signup
const blogRoute=require('./router/blog');//// for blog
const Blog = require('./model/blog')

const { checkforauthenticationCookies } = require('./middlewere/authentication');
//connect database
async function main(){
   await  mongoose.connect('mongodb://127.0.0.1:27017/blog_db')
}
main().then(()=>{ console.log("database connected")}).catch((err)=>{console.log(err)}) 

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
app.use(express.urlencoded({extended:false}))
app.use(cookiesParser())
//ckeck token by middlewere
app.use(checkforauthenticationCookies("token"))
//parse upload image 
// app.use(express.static(path.resolve("./public")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/",async(req,res)=>{
    const allBlog = await Blog.find({});
    // console.log(allBlog);
    res.render("Home", { user:req.user , blogs:allBlog})
})
app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(8000,()=>{
    console.log("server is started at in 8000 port")
})  