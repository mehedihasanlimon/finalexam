var http = require('http');
  var mongoose = require ('mongoose');
  var mongo=require('mongodb');
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  
  mongoose.connect('mongodb://' + process.env.IP +':27017/test');
 
 var server = http.Server(app);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  
mongoose.connection.on('erroe',function(){
  console.log('Could not connect to mongodb');
});
//define schema with mongoose
var userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: "Name is required"
  },
  email:String
});
var User = mongoose.model('User',userSchema);



  app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
  })
  
  app.get('/about', function(req, res){
    res.sendFile(__dirname+'/about.html');
  });
  
   app.get('/form', function(req, res){
    res.sendFile(__dirname+'/form.html');
  });
  
  app.post('/signup', function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    console.log("post received: %s %s", username, email);
});

app.post('/submit_user',function(req,res)
{
    console.log(req.body);
    var new_user = new User(req.body);
    new_user.save(function(err,data){
      if(err){
        return res.status(400)
                  .json({message:"couldn't save user"})
      }
      res.status(200).json(data);
    })
    //save(req.body);
    res.status(200);
});

 
  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
});