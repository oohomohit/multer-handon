import express, { urlencoded } from "express"
const app = express();
import path from "path"
import multer from "multer"  
const port = 3000;

const storage = multer.diskStorage({
  destination : function (req,file,cb){
    return cb(null,"./uploads")
  },
  filename : function (req,file,cb){
    return cb(null,`${Date.now()}-${file.originalname}`)
  },
})
const upload = multer({storage})
app.set("view engine","ejs")
app.set("views" , path.resolve("./views"))

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) =>{
  return res.render('homepage');
})

app.post('/upload',upload.single("profileImage"),(req,res)=>{
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/")
    
})

app.listen(port,()=>{
  console.log(`server is running on port ${port}`);
})