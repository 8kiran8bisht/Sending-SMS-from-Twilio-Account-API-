const express= require("express");
const exphbs= require("express-handlebars");
const app=express();
const bodyParser=require('body-parser');

app.listen('3000',()=>{
    console.log("connection stablished !");
});

app.engine("handlebars",exphbs());
app.set('view engine','handlebars');


/*for ever request these middleware function  will be loaded
order is matter.
*/
app.use(express.static("public"));//predefine by express
app.use(bodyParser.urlencoded({extended:false}));// predefine by bodyParser



app.get("/",(req,res)=>{
    res.render('home',{
        title:"home",
        heading:"welcome to home page"
    });
});
//show page
app.get("/sendtext",(req,res)=>{
    res.render('sms',{
        title:"Sms PAge",
        });
});
//handle data
app.post('/sendText',(req,res)=>{
    const errors=[];
    if(req.body.phoneNo=="")
    {
        errors.push("put phone no");
    }
    if(req.body.message=="")
    {
        errors.push("put message");
    }
    // failed validation 
    if(errors.length>0){
        res.render('sms',{
            title:"Sms Page",
            errorMessages:errors
            });
    }
    else{
            const accountSid = 'AC4244f5518b3bb86bb7982b6cfb7b4e43';
            const authToken = '1f1a97a23c0c4a16af888339fb16558f';
            const client = require('twilio')(accountSid, authToken);

            client.messages
            .create({
                body: `${req.body.message}`,
                from: '+12565883235',
                to: `${req.body.phoneNo}`
            })
            .then(message => {
                console.log(message.sid);
                res.redirect("/");
            });  
            
    }
});