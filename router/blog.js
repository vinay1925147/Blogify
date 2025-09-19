const express=require('express')
const Blog = require('../model/blog')
const Comment = require('../model/comment')
const router=express.Router();
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage(
  {
  destination: function (req, file, cb) {
     return cb(null, path.resolve(`./public/uploads/`))
  },
  filename: function (req, file, cb) {
    const filename =`${Date.now()}-${file.originalname}`
    return cb(null, filename)
  },
}
)

const upload = multer({ storage: storage })
router.get('/add-new', (req,res)=>{
   return  res.render("addBlog.ejs", {user:req.user} )
})

router.get('/:id',async (req,res)=>{
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
    console.log(blog)
    console.log(comments)
    return res.render("blog", { user: req.user, blog, comments });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error fetching blog");
  }
})

router.post("/comment/:blogId", async (req, res) => {
  console.log(req.body)
 await Comment.create({
     content: req.body.content,
     blogId: req.params.blogId,
     createdBy: req.user._id,
  })
  return res.redirect(`/blog/${req.params.blogId}`);
});

router.post('/', upload.single("coverImage"), async  (req,res)=>{
    const {body,title} = req.body
       await Blog.create({
       body,
       title,
       createdBy:req.user._id,
       coverImageURL : req.file ? `/uploads/${req.file.filename}` : null 
    });
     return res.redirect('/');
});

module.exports=router;