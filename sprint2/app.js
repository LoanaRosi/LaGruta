const express = require("express");
const path = require("path")
const port= 3030
const app= express();

app.use(express.static("public"));

app.get("/",(req,res) => res.sendFile(path.join(__dirname,"views","home.html")));
app.get("/productDetail",(req,res) => res.sendFile(path.join(__dirname,"views","productDetail.html")));
app.get("/productCart",(req,res) => res.sendFile(path.join(__dirname,"views","productCart.html")));
app.get("/register",(req,res) => res.sendFile(path.join(__dirname,"views","register.html")));
app.get("/login",(req,res) => res.sendFile(path.join(__dirname,"views","login.html")));
app.get("/productos",(req,res) => res.sendFile(path.join(__dirname,"views","productos.html")));

app.listen(port,()=> console.log("el puerto esta corriendo en el servidor "+ port));
