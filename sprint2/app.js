const express = require("express");
const path =require("path")
const port= 3030
const app= express();

app.use(express.static("public"));

app.get("/",(req,res) => res.sendFile(path.join(__dirname,"views","home.html")));
app.get("/productDetail",(req,res) => res.sendFile(path.join(__dirname,"views","productDetail.html")));
app.get("/productCart",(req,res) => res.sendFile(path.join(__dirname,"views","productCart.html")));
app.get("/register",(req,res) => res.sendFile(path.join(__dirname,"views","register.html")));
app.get("/login",(req,res) => res.sendFile(path.join(__dirname,"views","login.html")));
app.get("/formulario1",(req,res) => res.sendFile(path.join(__dirname,"views","formulario1.html")));
app.get("/formulario2",(req,res) => res.sendFile(path.join(__dirname,"views","formulario2.html")));
app.get("/formulario3",(req,res) => res.sendFile(path.join(__dirname,"views","formulario3.html")));
app.get("/formulario4",(req,res) => res.sendFile(path.join(__dirname,"views","formulario4.html")));
app.get("/formulario5",(req,res) => res.sendFile(path.join(__dirname,"views","formulario5.html")));
app.get("/formulario6",(req,res) => res.sendFile(path.join(__dirname,"views","formulario6.html")));


app.listen(port,()=> console.log("el puerto esta corriendo en el servidor "+ port))
