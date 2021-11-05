const express = require("express");
const Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.urlencoded({ extended:true }));

let currentPokeID = 1;
let currentPokemon = "";

app.get("/",(req,res) => {
    P.getPokemonByName(currentPokeID)
    .then(function(response) {
      currentPokemon = response.name;
      currentPokeID = response.id;
      res.render(__dirname+"/index.html", { currName: "Viewing: " +currentPokemon, msg: "Welcome Trainer", currID: currentPokeID});
    })
    .catch(function(error) {
        currentPokemon = "Not Found";
        currentPokeID = 0;
        res.render(__dirname+"/index.html", { currName: currentPokemon, msg: "Did you spell it right?",currID: currentPokeID});

    });
});

app.post("/search",(req,res) => {
    const currentSearch = req.body.searchName;
    P.getPokemonByName(currentSearch.toLowerCase())
    .then(function(response) {
        currentPokeID = response.id;
        res.redirect("/");
    })
    .catch(function(error) {
        currentPokeID = 0;
        res.redirect("/");
    });
});

app.post("/prev",(req,res) => {
    currentPokeID=currentPokeID-1;
    if(currentPokeID==0){
        currentPokeID=898;
    }
    res.redirect("/");
});

app.post("/next",(req,res) => {
    currentPokeID=currentPokeID+1;
    if (currentPokeID==899){
        currentPokeID=1;
    }
    console.log(currentPokeID);
    res.redirect("/");
});

app.post("/prevInfo",(req,res) => {
    currentPokeID=currentPokeID-1;
    if(currentPokeID==0){
        currentPokeID=898;
    }
    res.redirect("/info");
});

app.post("/nextInfo",(req,res) => {
    currentPokeID=currentPokeID+1;
    if (currentPokeID==899){
        currentPokeID=1;
    }
    res.redirect("/info");
});


app.post("/back",(req,res) => {
    res.redirect("/");
});

app.post("/info",(req,res) => {
    P.getPokemonByName(currentPokeID)
    .then(function(response) {
      currentPokemon = response.name;
      currentPokeID = response.id;
      res.render(__dirname+"/info.html", { currName: "Viewing: " +currentPokemon, msg: "Welcome Trainer", currID: currentPokeID});
    })
    .catch(function(error) {
        currentPokemon = "Not Found";
        currentPokeID = 0;
        res.render(__dirname+"/info.html", { currName: currentPokemon, msg: "Did you spell it right?",currID: currentPokeID});

    });
});

app.listen(3000, () => {
    console.log("The server is alive! :)");
});