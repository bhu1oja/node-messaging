var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

//db config
const db = require("./config/db").mongoURI;

// Get Message model
var Message = require("./model/Message");


//route to get all messages
app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

//route to post message
app.post('/messages', async (req, res) => {
  try{
    var message = new Message(req.body);

    var savedMessage = await message.save()
      console.log(savedMessage);

    var censored = await Message.findOne({message:'badword'});
      if(censored)
        await Message.remove({_id: censored.id})
      else
        io.emit('message', req.body);
      res.sendStatus(200);
  }
  catch (error){
    res.sendStatus(500);
    return console.log('error',error);
  }
  finally{
    console.log('Message Posted')
  }

})


//get connected users
io.on('connection', () =>{
  console.log('a user is connected')
})

//db connection
mongoose.connect(db ,{useMongoClient : true} ,(err) => {
  console.log('mongodb connected',err);
})


//server 
var server = http.listen(process.env.PORT || 3000, () => {
  console.log('server is running on port', server.address().port);
});