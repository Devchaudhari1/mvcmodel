//mvcmodel\server.js
const mongoose= require('mongoose');
const path= require('path');
const multer=require('multer');
const express=require("express");
const Route= require('./routes/routes.js');
const apiUrl="mongodb://localhost:27017/mvc";//"mongodb+srv://yogayogayoga:yogayogayoga@cluster0.2k0hk.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0" ;
mongoose.connect(apiUrl).then(()=> console.log("Connected to mongodb"))
.catch(err => console.log("Failed to connect to mongodb",error));
const app = express();
const PORT = 3000;
const client =mongoose.connect(apiUrl)
.then(response=> console.log("Connected to mongodb database"))
.catch(error=> console.log("Failed to connect",error));
app.use(express.json());

app.use(express.urlencoded({extended:true})); 

app.use('/',Route);

app.use(express.static(path.join(__dirname,'views')));



//app.use(express.static(path.join(__dirname,'mvcmodel')));
app.listen(PORT,()=>{
console.log(`Mongodb is running on http://localhost:${PORT} the users are in http://localhost:${PORT}/users
  http://localhost:${PORT}/user/image .
  Login window= http://localhost:${PORT}/login . Register window = http://localhost:${PORT}/register`);
});
