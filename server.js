//mvcmodel\server.js
const mongoose= require('mongoose');
const {MongoClient}=require('mongodb');
const path= require('path');
const multer=require('multer');
const express=require("express");
const Route= require('./routes/routes.js');
const connection = 'mongodb://localhost:27017';
const apiUrl="mongodb://localhost:27017/mvc";/*"mongodb+srv://yogayogayoga:yogayogayoga@cluster0.2k0hk.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0" ;*/
const client = new MongoClient(connection);
 let db;
 client.connect().then( ()=>{db = client.db('mvc')}).then(()=>{console.log("Successful connection established to client.db('mvc')" );
   app.listen(PORT,()=>{
     console.log(`Mongodb is running on http://localhost:${PORT} the users are in http://localhost:${PORT}/users
       http://localhost:${PORT}/user/image .
       Login window= http://localhost:${PORT}/login . Register window = http://localhost:${PORT}/register`);
     });
 }).then(()=>module.exports={db})
 .catch((err)=> {console.error("Cannot connect client.db('mvc')",err) });

mongoose.connect(apiUrl).then(()=> console.log("Connected to mongodb"))
.catch(err => console.log("Failed to connect to mongodb",err));
const conn = mongoose.connection;

const app = express();
const PORT = 3000;
app.use(express.json());

app.use(express.urlencoded({extended:true})); 

app.use('/',Route);

app.use(express.static(path.join(__dirname,'views')));



//app.use(express.static(path.join(__dirname,'mvcmodel')));

//module.exports={db};