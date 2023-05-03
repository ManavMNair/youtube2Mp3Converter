//required packages

const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

//create express server

const app=express();

//set server port

const PORT = process.env.PORT || 3000;

// setting view engine
app.set("view engine","hbs");
app.use(express.static("public"));

//code needed to parse html data for post request

app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())

//setting routes

app.get("/",(req,res)=>{
    res.render("index.hbs")
})
app.post("/convert-mp3",async(req,res)=>{
    const videoid=req.body.videoID;
    console.log(videoid);
    if(videoid===undefined||videoid===null||videoid===""){
        return res.render("index",{succes:false,message:"Enter a valid ID"})
    }else{
        const fetchAPI= await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoid}`,{
            "method" : "GET",
            "headers" : {
                "X-RapidAPI-Key" : process.env.API_KEY,
                "X-RapidAPI-Host" : process.env.API_HOST
            }


        })

        const fetchResponse = await fetchAPI.json()
        console.log(fetchResponse);
        
        if(fetchResponse.status === "ok")
            return res.render("index",{success : true,song_title: fetchResponse.title,song_link:fetchResponse.link});
        else
            return res.render("index",{success : false,message:fetchResponse.msg})

    }
})


// start server

app.listen(PORT,()=>{
    console.log('server started on port ',+PORT);
})
