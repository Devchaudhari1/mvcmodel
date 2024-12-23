const {MongoClient,GridFSBucket, ObjectId} = require('mongodb');
require('dotenv').config();
const connection = 'mongodb://localhost:27017';
const client = new MongoClient(connection);
const express= require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
let db;
client.connect().then( ()=>{db = client.db('mvc')}).then(()=>{console.log("Successful connection established to client.db('mvc')" );
;
app.listen(PORT,()=>{
    console.log(`Mongodb is running on http://localhost:${PORT} the users are in http://localhost:${PORT}/users
      http://localhost:${PORT}/user/image .
      Login window= http://localhost:${PORT}/login . Register window = http://localhost:${PORT}/register`);
    });
    app.use(cors());
}).catch((err)=> {console.error("Cannot connect client.db('mvc')",err) });

const addVideo= async (req,res)=>{
    const {name , description}= req.body;
    try{
        if(!db)
            console.log("Database not initialised");
        const bucket = new GridFSBucket(db,{bucketName : 'videos'});
        if(!name)
            return res.status(400).send("Please enter name of video");

        
        const uploadStream= bucket.openUploadStream(name,{
            metadata:{
                originalName:req.file.originalname,
                contentType:req.file.mimetype,
                description:description,
            }
        });

        uploadStream.end(req.file.buffer);
        uploadStream.on('finish',async (file)=>{
           
            /*const video = new Video({
                name:name,
                description:description,
                fileId :file._id
            });
            await video.save();*/
            return res.status(201).send("Video Uploaded Successfully");
        });
        uploadStream.on('error',(err)=>{
            console.error("An error occured while uploading through vidController.addvideo",err);
            return res.status(500).send("Cannot upload video");
        });

    } catch(err){
        console.error("An error occured while uploading video through vidController",err);
        return res.status(500).send("failed to upload video");
    }
};
const getVideos = async (req,res)=>{
    try{
        const bucket = new GridFSBucket(db,{bucketName : 'videos'});
        const filesCollection = db.collection('videos.files');
        const videos = await filesCollection.find().toArray();
        if(!videos)
            return res.status(404).send("no video found");
        console.log("Bucketing the videos");
        return res.status(200).json(videos);

    } catch(err){
        console.error("Error getting videos",err);
        return res.status(500).send("Cannot get videos");
    }
};
const getVideoById = async (req,res) =>{
    try{
        const bucket = new GridFSBucket(db,{bucketName : 'videos'});
        const filesCollection = db.collection('videos.files');
        //console.log("filesCollection",filesCollection);
        console.log("Bucketing the videos by id :",req.params.filename);
        const video = await filesCollection.findOne({filename: req.params.filename});
        if(!video)
        {
            console.log("No video found by given filename", filename);
            return res.status(404).send("No video found by id");
        }
            bucket.openDownloadStreamByName(req.params.filename).pipe(res).on('error',(err)=>
            {
                console.error("Error streaming video",err);
                return res.status(500).send("getting video ");
            })
    }catch(err) {
        console.error("Error streaming video",err);
        return res.status(500).send("getting video ");   
    }
}
module.exports={addVideo,getVideos,getVideoById};