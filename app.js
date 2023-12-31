//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser") ;
const request = require("request");
const app = express();
const https = require("https")

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));    //using folder named public to put in files to use in the server

app.get("/", function(req,res){
    res.sendFile( __dirname + "/index.html");
});

app.post("/", function(req, res){
    const fristName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email

    const data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: fristName,
            LNAME: lastName
          }
        }
      ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/50f2650e9f";

    const options = {
      method: "POST",
      auth: "AliKatry:250d58bc2afb3b10ee78ec32cabc2c2a-us12"
    }

    const request = https.request(url, options, function(response){


      // response.on("data", function(data){
      //   console.log(JSON.parse(data))      //Just to print some data
      // });

      if(response.statusCode === 200){
        // res.send("sucessfully subscribed!");
        res.sendFile(__dirname + "/success.html")
      }
      else{
        // res.send("fail!");
        res.sendFile(__dirname + "/failure.html")

      }
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});


app.listen(4000, function(){
  console.log("running");

});


// API
// 250d58bc2afb3b10ee78ec32cabc2c2a-us12

// List id
// 50f2650e9f
