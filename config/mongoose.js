const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/todo_list_db');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error conneecting to db'));

db.once('open',()=>{
    console.log('Db connection successful');
})