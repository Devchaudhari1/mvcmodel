const token = localStorage.getItem('token');

const uploadVideo= document.getElementById("uploadVideo");
uploadVideo.addEventListener('submit', async function(e){
e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const description=document.getElementById("description").value.trim();
    const video =document.getElementById("video").files[0];
    const formData= new FormData();
    formData.append('name',name);
    formData.append('description',description);``
    formData.append('video',video);
    if(!video)
        return alert("Please add video");

    fetch('/uploads',{method:'POST',
        body: formData}).then(res=>res.text()).then(data => alert(data)).catch(err =>console.error("AN error occured",err));

}
);
getVideo();
async function getVideo(){
    const videos = document.getElementById("videos");
    const video = await fetch('/uploads/videos',
        {
            method:'GET',
            headers:{
        "Authorization":`Bearer ${token}`,
    }
    });
    const response = await video.json();
    console.log("response:",response);
    /*response is working fine as seen in the console*/

    response.forEach(item=>{
        console.log("item",item);
        videos.controls= true;
        const vid= document.createElement("source");
        
        vid.type="video/mp4";
        vid.src=`/uploads/${item.filename}`;
        videos.appendChild(vid);
    });
};
const logout = document.getElementById("logout");
logout.addEventListener('click', ()=>{
    confirm("Do you want to logout");
    localStorage.removeItem(token);
   
    window.location.href='/login';
});