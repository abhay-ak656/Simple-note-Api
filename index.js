const express=require('express');
const app=express();
const path=require('path');
const port=3030;
const {v4:uuid}=require('uuid');
const methodoverride=require('method-override');

app.listen(port,'0.0.0.0',()=>{
    console.log("Server do their work perfectly",port);
})

app.use(methodoverride('_method'));
let notes=[
    {   id:uuid(),
        email:"abhay.ak201@gmail.com",
        title: "🧠 Learn Express Basics",
        content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus laboriosam quisquam, quam at hic laborum. Explicabo ipsum modi asperiores corporis, esse tempora maiores possimus, perspiciatis molestiae, quis rerum quae nam Quisquam magnam nulla eum soluta tempora voluptas, iste nesciunt aperiam atque recusandae dolorum iure minima laborum aspernatur officia itaque. Ea atque earum nulla culpa fugit alias est eius hic debitis!"
    },
    {    id:uuid(),
        email:"abhay.ak201@gmail.com",
        title:"📚 Read JavaScript Promises",
        content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus laboriosam quisquam, quam at hic laborum. Explicabo ipsum modi asperiores corporis, esse tempora maiores possimus, perspiciatis molestiae, quis rerum quae nam Quisquam magnam nulla eum soluta tempora voluptas, iste nesciunt aperiam atque recusandae dolorum iure minima laborum aspernatur officia itaque. Ea atque earum nulla culpa fugit alias est eius hic debitis!"
    },
    {    id:uuid(),
        email:"abhay.ak201@gmail.com",
        title:"📝 Create TODO App Backend",
        content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus laboriosam quisquam, quam at hic laborum. Explicabo ipsum modi asperiores corporis, esse tempora maiores possimus, perspiciatis molestiae, quis rerum quae nam Quisquam magnam nulla eum soluta tempora voluptas, iste nesciunt aperiam atque recusandae dolorum iure minima laborum aspernatur officia itaque. Ea atque earum nulla culpa fugit alias est eius hic debitis!"
    },
    {    id:uuid(),
        email:"abhay.ak201@gmail.com",
        title:"⚙️ Understand Middleware Flow",
        content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus laboriosam quisquam, quam at hic laborum. Explicabo ipsum modi asperiores corporis, esse tempora maiores possimus, perspiciatis molestiae, quis rerum quae nam Quisquam magnam nulla eum soluta tempora voluptas, iste nesciunt aperiam atque recusandae dolorum iure minima laborum aspernatur officia itaque. Ea atque earum nulla culpa fugit alias est eius hic debitis!"
    },
    {    id:uuid(),
        email:"abhay.ak201@gmail.com",
        title:"🚀 Explore RESTful API Concepts",
        content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus laboriosam quisquam, quam at hic laborum. Explicabo ipsum modi asperiores corporis, esse tempora maiores possimus, perspiciatis molestiae, quis rerum quae nam Quisquam magnam nulla eum soluta tempora voluptas, iste nesciunt aperiam atque recusandae dolorum iure minima laborum aspernatur officia itaque. Ea atque earum nulla culpa fugit alias est eius hic debitis!"
    },
]
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'template'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));

app.get('/notes',(req,res)=>{
    res.render('home.ejs', {notes});
})

app.get('/notes/new',(req,res)=>{
    res.render('newnotes.ejs');
})

app.post('/notes',(req,res)=>{
    const note=req.body;
    notes.push({id:uuid(),email:note.Email,title:note.title,content:note.content});
    res.redirect('/notes');
})

app.get('/notes/:id',(req,res)=>{
    const {id}=req.params;
    const note=notes.find((note)=>{
        return note.id===id;
    })

    res.render('Editnotes.ejs',{note});
})

app.patch('/notes/:id',(req,res)=>{
    const {id}=req.params;
    for(let note of notes){
        if(note.id===id){
            note.content=req.body.content;
        }
    }
  res.redirect('/notes');
    
})

app.delete('/notes/:id',(req,res)=>{
    const {id}=req.params;
    notes=notes.filter((note)=>{
        return note.id!=id;
    })
    res.redirect('/notes');
})

