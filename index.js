const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const todo=require('./models/todo');
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded());
app.use(express.static('assets'));

let task=[]
//home route
app.get('/',(req,res)=>{
    todo.find({},(err,tasks)=>{
        if(err){
            console.log(err);
            return;
        }
        return res.render('home',{
            title:'TODO List',
            task:tasks
        });
    })
    
})
// create task route
app.post('/create-task',(req,res)=>{
    todo.create({
        description:req.body.description,
        category:req.body.category,
        duedate:req.body.duedate
    },(err,task)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log(task);
        return res.redirect('back');
    })
})
//deletion route
app.post('/delete-task',(req,res)=>{
    let id=req.body.id;
    console.log(req.body,id);
    todo.findByIdAndDelete(id,(err)=>{
        if(err){
            console.log(err);
            return;
        }
        return res.redirect('back');
    })
})

app.listen(port,(err)=>{
    if(err){
        console.log('Error in server',err);
        return;
    }
    console.log('Server is running on port: ',port);
});
