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
app.get("/juegos-de-mesa",(req,res) => res.sendFile(path.join(__dirname,"views","juegos-mesa.html")));
app.get("/juegos-de-rol",(req,res) => res.sendFile(path.join(__dirname,"views","juegos-rol.html")));
app.get("/juegos-de-previa",(req,res) => res.sendFile(path.join(__dirname,"views","juegos-previa.html")));

app.listen(port,()=> console.log("el puerto esta corriendo en el servidor "+ port));
