const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer"); 
const {google} = require("googleapis");

const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"));

const banner = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","banner.json"),"utf-8")); // imagenes banner

const tothousand = require("../utils/thotousand")
const descuento = require("../utils/discount")

const db = require("../database/models");

const { Op } = require("sequelize");

module.exports ={
    // vista del home
    index : (req,res) =>{

        let products = db.Product.findAll({
            include : [
                "images",
                "categories",
                "status"
            ]
        })

        let productsOfert = db.Product.findAll({
            include : [
                "images",
                "categories",
                "status"
            ],
            where : {
                statusId : 1
            }
        })

        let banner = db.Banner.findAll()

        Promise.all([products,productsOfert,banner])
        .then(([products,productsOfert,banner]) =>{
            res.render("home",{
                tothousand,
                descuento,
                products,
                productsOfert,
                banner,
                title : "LaGrutaDelDragón"
            })
        })
        .catch(error => console.log(error)) 
    },

    search: (req,res) => {

        db.Product.findAll({
            include : [
                "images",
                "categories",
            ],

            where : {
                name : { 
                    [Op.substring] : req.query.busqueda /* Op.substring funciona como un like */
                },
            }
        })
        .then(products =>{
            res.render("result-search",{
                tothousand,
                descuento,
                products,
                resultado : req.query.busqueda,
                title : "Búsqueda"
            })
        })
        .catch(error => console.log(error)) 

    },

    // vita del carrito
    cartShop: (req,res) =>{
        return res.render("cart/productCart")
    },

    contact: (req,res) => {
        res.render("contact",{
            title : "Contacto"
        })
    },

    mailsend: (req,res) => {
        /* console.log(req.body); */
        /* res.send('Tu mensaje ha sido enviado')*/
        const {name,email,number,message}= req.body;
        const contentHtml= `
        <h1>Formulario de contacto<h1>
        <ul>
        <li>Nombre: ${name}</li>
        <li>Email: ${email}</li>
        <li>Teléfono: ${number}</li>
        </ul>
        <p>Mensaje: ${message}</p>
        `;
        
        const CLIENT_ID="229095359337-d7rgvpsum92r0ed5isrf0283utgf4ts5.apps.googleusercontent.com";
        const CLIENT_SECRET="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";
        const REDIRECT_URI="https://developers.google.com/oauthplayground";
        const REFRESH_TOKEN="1//042ZDzQrF2hYrCgYIARAAGAQSNwF-L9IrrplMEr1UtAdorFabycv0waHKbxcqJh3NFR2eI30c8PihIU-DZTmPa-LOQ50qE0xAEaU";

        const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI );

        oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});

        async function sendMail() {
            try {
                const accessToken= await oAuth2Client.getAccessToken()
                const transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth:{
                      type: "OAuth2",
                      user: "lagrutadeldragon.games@gmail.com",
                      clientId:CLIENT_ID,
                      clientSecret: CLIENT_SECRET,
                      refreshToken: REFRESH_TOKEN,
                      accessToken: accessToken,
                  },                 
              }) 
              const mailOptions= {
                  from: "Pagina web <lagrutadeldragon.games@gmail.com>",
                  to: "lagrutadeldragon.games@gmail.com",
                  subject: "Nuevo contacto desde la web",
                  html: contentHtml,                      
            }
            const result= await transporter.sendMail(mailOptions);
            return result;
            } catch (error) {
                console.log(error);                
            }             
        }
        sendMail()
            .then(result => res.status(200).send('Enviado correctamente')) //HACER ventana emergente de aviso
            .catch(error => console.log(error.message));
        
    },

    about: (req,res) => {
        res.render("about",{
            title : "Sobre Nosotros"
        })
    }
}

