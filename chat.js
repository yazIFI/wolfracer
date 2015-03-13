function monster(){ 
      this.x=0;
      this.y=0;
      this.speed=500; // pixels/s this time !
      this.life=80;
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
    }

var monsters ={};
var daggerThrown = [];
var tabMonster = [];
var tabFire = [];
var level = 1;
console.log(daggerThrown.length);
var socket = io.connect();

	// on connection to server, ask for user's name with an anonymous callback
	socket.on('connect', function(){
		// call the server-side function 'adduser' and send one parameter (value of prompt)
		socket.username = prompt("What's your name?");
		socket.emit('adduser', socket.username);
		//console.log(socket.username);
		
		
	});
	
	 socket.on('update_position', function (data,data3) {
      monsters[data3]=data;
    });

	 socket.on('new_dagger', function (data) {
     daggerThrown.push(data);
     
  });
	socket.on('delete_dagger', function (data) {
     daggerThrown.splice(data,1);
     
  });
	
	//window.addEventListener('keydown', function(event){  socket.emit('receive_position', monsters);}, false);
	//window.addEventListener('keyup', function(event){  socket.emit('receive_position', monsters);}, false);
	
	// listener, whenever the server emits 'updatechat', this updates the chat body
	socket.on('updatechat', function (username, data) {
		$('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
	});

	// listener, whenever the server emits 'updaterooms', this updates the room the client is in
	socket.on('updaterooms', function(rooms, current_room) {
		$('#rooms').empty();
		$.each(rooms, function(key, value) {
			if(value == current_room){
				$('#rooms').append('<div>' + value + '</div>');
			}
			else {
				$('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
			}
		});
	});
	
	function switchRoom(room){
		socket.emit('switchRoom', room);
	}
	
	// on load of page
	$(function(){
		// when the client clicks SEND
		$('#datasend').click( function() {
			var message = $('#data').val();
			$('#data').val('');
			// tell server to execute 'sendchat' and send along one parameter
			socket.emit('sendchat', message);
		});

		// when the client hits ENTER on their keyboard
		$('#data').keypress(function(e) {
			if(e.which == 13) {
				$(this).blur();
				$('#datasend').focus().click();
			}
		});
	});
	


