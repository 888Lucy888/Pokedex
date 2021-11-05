const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { get } = require("http");
const { response } = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.urlencoded({ extended:true }));
//app.set('views', __dirname);

const url = "https://pokeapi.co/api/v2/pokemon/";
const currentPokeID = 1;
const currentPokeUrl = url + "1/";

app.get("/",(req,res) => {
    https.get(currentPokeUrl, (response) => {
        console.log(response);
    });
    res.render(__dirname+"/index.html", { currName: "Current Pokémon "+currentPokeID});

    res.sendFile(__dirname + "/index.html");
});

app.get("/search",(req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/search",(req,res) => {
    const searchName = req.body.searchName;
    const currName = req.body.currName;
    res.render(__dirname+"/index.html", { currName: "Searching for "+searchName });
});

app.post("/prev",(req,res) => {
    
});

app.post("/next",(req,res) => {
    
});


app.post("/back",(req,res) => {
});

app.post("/info",(req,res) => {
    res.sendFile(__dirname + "/info.html");
});

app.listen(3000, () => {
    console.log("The server is alive! :)");
});