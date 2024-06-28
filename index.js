//const { log } = require("console");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')


app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

//post data

let posts = [{
    id: uuidv4(),
    username : "Harshit Shwarma",
    content: "I love Shwarma"
},
{
    id: uuidv4(),
    username : "Shwarma",
    content: "We love shwarma"
},
{
    id: uuidv4(),
    username : "Harvey",
    content: "This shawmar is thick"
}, 
]
//view all posts via all users
app.get("/posts", (req,res) =>{
    res.render("index.ejs", { posts });
    
});
//adding new post
app.get("/posts/new",(req,res)=>{
    //taking username and content for post from users via form
    res.render("form.ejs");
})
 app.post("/posts/new",(req,res)=>{
    let { username, content } = req.body;
    let  id  = uuidv4(); // assign new id to new post
    res.redirect("/posts");
    //pushing to array/database
    posts.push({username, content, id}); // passing id to new post
    
 });

 app.get("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=> id === p.id); // finding post
    // console.log({id});
    // console.log(post);
    res.render("view.ejs",{ post }); // view post with id 
 })

 //patch request
app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newContent = req.body.content;
    let post  = posts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post  = posts.find((p)=> id === p.id);
    res.render("edit.ejs", { post } );
   // console.log(post)
});

app.delete("/posts/:id", (req,res)=>{
    let { id } = req.params;
    posts  = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});


