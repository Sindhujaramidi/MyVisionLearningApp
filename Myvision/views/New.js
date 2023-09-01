const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./serviceAccountKey.json");
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();
var express = require('express')  
var app = express() 
const e=require("express");
app.set("view engine","ejs");
app.use(express.static('public'));
app.get('/',  (req, res)=> { 
  console.log(__dirname); 
  res.render("Work");
  });
app.get('/signup',  (req, res)=> { 
  console.log(__dirname); 
  res.render("Signupmain"); 
  });
    app.get('/signupsubmit',  (req, res)=> { 
         const FirstName=req.query.first_name;
         const Lastname=req.query.last_name;
         const Email=req.query.email;
         const Password=req.query.psw;
         const RepPwd=req.query.psw_repeat;
         if(Password==RepPwd){
          db.collection('course')
          .add({
            Name:FirstName+Lastname,
            Email:Email,
            Password:Password,
          }).then(()=>
          {
            res.render("Loginmain");
          });
         }else{
          res.send("signup failed");
         }
      });
      app.get('/login', (req, res)=> { 
        console.log(__dirname);   
        res.render("Loginmain")
        });
      app.get("/loginsubmit",(req,res)=>{
        const email=req.query.emil;
        const password=req.query.passwrd;
        db.collection("course")
        .where("Email","==",email)
        .where("Password","==",password)
        .get()
        .then((docs)=>{
          if(docs.size>0){  
              res.render("Work")
          }     
          else{
              res.send("Login failed");
            }
        });
      });
      

    app.listen(3000,  ()=> {  
      console.log('Example app listening on port 3000!')  
      });
