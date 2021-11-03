const express = require("express");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(express.json());
/*app.use(express.urlencoded({ extended:true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);*/

const url = "https://pokeapi.co/api/v2/";

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/",(req,res) => {

});

app.listen(3000, () => {
    console.log("The server is alive! :)");
});