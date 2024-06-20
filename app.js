var app = require("express")();
var http = require("http").Server(app);
var path = require("path");
var io = require("socket.io")(http);


app.get("/", function (req, res) {
  var options = {
    root: path.join(__dirname),
  };
  var fileName = "index.html";
  res.sendFile(fileName, options);
});

var user = 0;

io.on("connection", function (socket) {
  console.log("A user connected");



  user++;
//   io.sockets.emit('brodcast',{message: user + ' users connected'})
  socket.emit('newuserconnect',{message:'Hii , Welcome to my yt channel !'})


  socket.broadcast.emit('newuserconnect',{message : user  + ' users connected !'})
















  //   socket.on('myCustromEventFromClient',function(data){
  //     console.log(data)
  //   })

  //   setTimeout(function(){
  //     socket.send("server side sending to client side")
  //   },3000)

  // setTimeout(function(){
  //     socket.emit('myCustomEvent',{description:'A custom message from server side'})
  // },3000)

  socket.on("disconnected", function () {
    console.log("A user disconnected");

    user--
    io.sockets.emit('broadcast',{message: user + " users"})
  });
});

http.listen(3000, function () {
  console.log("server run in ready");
});
