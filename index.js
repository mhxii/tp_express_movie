const express = require("express");
const cors = require('cors');
const logger=require("morgan");

const data = require("./dblp.json")

const app = express();

const port = 5000;

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

// GET
app.get("/authors",(req,res)=>{
    res.status(200).json(data);
});

app.put("/movies/:id",(req,res)=>{
    const id_movie = parseInt(req.params.id);
    const movie = data.find(m => m.id === id_movie);
    (movie.title=req.body.title),(movie.release= req.body.release);
    res.status(200).json(movie);
});

app.delete("/movies/:id",(req,res)=>{
    const id_movie = parseInt(req.params.id);
    const movie = data.find(m => m.id === id_movie);
    data.splice(movie, 1);
    res.status(200).json(movie);
});

app.get("/",(req,res)=>{
    console.log(req.url);
    res.send("server run");
});



// POST
app.post("/movies",(req,res)=>{
    data.push(req.body);
    res.status(200).json(data);
    
});

app.listen(port, ()=>
    console.log(`Express server listening at http://localhost:${port}`)
);