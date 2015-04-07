// We need to use the express framework: have a real web servler that knows how to send mime types etc.
var express=require('express');

 function monster(){ 
      this.x=0;
      this.y=0;
      this.speed=500; // pixels/s this time !
      this.life=80;
      this.score=0;
      this.boundingCircleRadius=70;
      this.jump=false;
      this.gravity=150;
      this.side = true;
      this.dead = false;
      this.running = false;
      this.speedX = 0 ;
      this.speedY = 0 ;
      this.friction = 0.95;
      this.onGround = false;
      this.slowed = false;
      this.ownSlow = 0;
      this.crouching = false;
      this.ownTp = false;
      this.level = 1;
    }
var monsters = {};
var daggerThrown = [];
var tabMonster = [];
var tabFire = [];
var level = 1;

var PathS = __dirname;
var PathTab = PathS.split("\\");
PathS=PathTab[0];
for(var i=1;i<PathTab.length-1;i++){
    PathS+="/"+PathTab[i];
}


// Init globals variables for each module required
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

// launch the http server on given port
server.listen(process.env.PORT ||8080);

// Indicate where static files are located. Without this, no external js file, no css...  
app.use(express.static(PathS+'/'));

// routing with express, mapping for default page
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/multiRoomChat.html');
});

// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = ['room1','room2','room3'];

io.sockets.on('connection', function (socket) {
	
	
	
	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username){
		// store the username in the socket session for this client
		socket.username = username;
		usernames[username] = username;
		monsters[username] = new monster();
		socket.emit('update_position', monsters[socket.username],socket.username);
		// store the room name in the socket session for this client
		socket.room = 'room1';
		// add the client's username to the global list
		
		// send client to room 1
		socket.join('room1');
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', 'you have connected to room1');
		// echo to room 1 that a person has connected to their room
		
		//console.log("new user : " + username);
		//console.log("new monster : " + monsters[username].speed);
		socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
		socket.emit('updaterooms', rooms, 'room1');
	});

	socket.on('receive_position', function (data,data3) {
     monsters[data3] = data;
    
     socket.broadcast.emit('update_position', data,data3); // send `data` to all other clients
  });

	socket.on('new_dagger', function (data) {
     daggerThrown.push(data);
     socket.broadcast.emit('new_dagger', data); // send `data` to all other clients
  });
	socket.on('delete_dagger', function (data) {
     daggerThrown.splice(data,1);
     socket.broadcast.emit('delete_dagger', data); // send `data` to all other clients
  });
	
	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});
	
	socket.on('switchRoom', function(newroom){
		socket.leave(socket.room);
		socket.join(newroom);
		socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
		// sent message to OLD room
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
		// update socket session room title
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
		socket.emit('updaterooms', rooms, newroom);
	});
	

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		delete monsters[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
});
