// Inits


//window.onload = function init() {

          
//};

 // vars for handling inputs
    var inputStates = {};

// GAME FRAMEWORK STARTS HERE
var GF = function(){
    // Vars relative to the canvas
    //var canvas, ctx,
	var	w, h; 

    // etat du jeu
    var tempsTotal=0;
  
    var etats = {
        menuPrincipal : 0,
        jeuEnCours : 1,
        gameOver : 2,
    };
    var etatCourant = etats.menuPrincipal;
    
    // vars for counting frames/s, used by the measureFPS function
    var frameCount = 0;
    var lastTime;
    var fpsContainer;
    var fps; 
    // for time based animation
    var delta, oldTime = 0;
  
   
  
    // The monsters[socket.username] !
   
  
    // array of balls to animate
    //var ballArray = [];
  
  
    var measureFPS = function(newTime){
      
         // test for the very first invocation
         if(lastTime === undefined) {
           lastTime = newTime; 
           return;
         }
      
        //calculate the difference between last & current frame
        var diffTime = newTime - lastTime; 

        if (diffTime >= 1000) {
            fps = frameCount;    
            frameCount = 0;
            lastTime = newTime;
        }

        //and display it in an element we appended to the 
        // document in the start() function
       fpsContainer.innerHTML = 'FPS: ' + fps; 
       frameCount++;
    };
  
     // clears the canvas content
     function clearCanvas() {
       ctx.clearRect(0, 0, w, h);
     }

    //Render et update des dague envoyé par les joueur. 
     function renderDagger(delta)
     {
        for (i = 0 ; i < daggerThrown.length ; i++)
          {
            
            //solution valable uniquement valable uniquement en offline maheuresement
            //ctx.drawImage(daggerThrown[i].img,0,0,daggerImg.width,daggerImg.height, daggerThrown[i].x - scrollVal , daggerThrown[i].y - scrollValY, sizeDagger,sizeDagger);
            //daggerThrown[i].x += daggerThrown[i].speedX ;
            //daggerThrown[i].y += daggerThrown[i].speedY ;
            if (daggerThrown[i].direction == "right")
            {
              ctx.drawImage(daggerRight,0,0,daggerImg.width,daggerImg.height, daggerThrown[i].x - scrollVal , daggerThrown[i].y - scrollValY, sizeDagger,sizeDagger);
            
              daggerThrown[i].x +=  calcDistanceToMove(delta, 250) ;
            }
            else if (daggerThrown[i].direction == "left")
            {
              ctx.drawImage(daggerLeft,0,0,daggerImg.width,daggerImg.height, daggerThrown[i].x - scrollVal , daggerThrown[i].y - scrollValY, sizeDagger,sizeDagger);
              daggerThrown[i].x += calcDistanceToMove(delta, -250) ;
            }
            else if (daggerThrown[i].direction == "up")
            {
              ctx.drawImage(daggerUp,0,0,daggerImg.width,daggerImg.height, daggerThrown[i].x - scrollVal , daggerThrown[i].y - scrollValY, sizeDagger,sizeDagger);
              daggerThrown[i].y += calcDistanceToMove(delta, -250) ;
              
            }
            else if (daggerThrown[i].direction == "down")
            {
              ctx.drawImage(daggerDown,0,0,daggerImg.width,daggerImg.height, daggerThrown[i].x - scrollVal , daggerThrown[i].y - scrollValY, sizeDagger,sizeDagger);
              daggerThrown[i].y += calcDistanceToMove(delta, 250);
            
            }
            if (daggerThrown[i].x + sizeDagger > imgWidth || daggerThrown[i].y + sizeDagger > imgHeight )
            {
              daggerThrown.splice(i,1);
            } 
          }
     }
  
     // Functions for drawing the monsters[socket.username] and maybe other objects
     function drawOthermonster(m) {
      ctx.save();
      if (m.jump && m.side)
      {
      characterWalking2.frameIndex = 2 ;
      characterWalking2.render(m.x,m.y,m.life);
      }
      else if (m.jump)
      {
      characterWalkingL2.frameIndex = 2 ;
      characterWalkingL2.render(m.x,m.y,m.life);
      }
      else if (m.side && m.running)
      {
      characterWalking2.update();
      characterWalking2.render(m.x,m.y,m.life);
      
      }
      else if (m.running)
      {
      characterWalkingL2.update();
      characterWalkingL2.render(m.x,m.y,m.life);
      
      }
      else if (m.side)
      {
      
      characterStandingR2.render(m.x,m.y,m.life);}
      else if (!m.side)
      {
    
      characterStandingL2.render(m.x,m.y,m.life);}
      ctx.restore(); 
      
     }
     function drawMymonster(x, y,life) {
       // draw a big monsters[socket.username] !
       // head
		
       // save the context
       ctx.save();
         if(x>6160 && y > 900){
             level=2;
             etatCourant = etats.gameOver;
             scrollImg.src = "mapLevel2.jpg";


         }
       
       //animation et scroll du saut(droite)
       if (monsters[socket.username].jump && monsters[socket.username].side)
      {
      characterWalking.frameIndex = 2 ;
      characterWalking.render(x,y,life);
      }
      //animation et scroll du saut(gauche)
      else if (monsters[socket.username].jump)
      {
      characterWalkingL.frameIndex = 2 ;
      characterWalkingL.render(x,y,life);
      }
      //animation et scroll du deplacement (droite)
	    else if (inputStates.right)
			{
			characterWalking.update();
      characterWalking.render(x,y,life);
      monsters[socket.username].side = true;
      monsters[socket.username].running = true;
      }
      //animation et scroll du deplacement (gauche)
		  else if (inputStates.left)
			{
			characterWalkingL.update();
      characterWalkingL.render(x,y,life);
      monsters[socket.username].side = false;
      monsters[socket.username].running = true;
      }
      //animation et scroll du personnage immobile (droite)
		  else if (monsters[socket.username].side)
		  {characterWalking.frameIndex =0 ;
        characterWalking.tickCount =0 ;
      characterStandingR.update();
      characterStandingR.render(x,y,life);
      monsters[socket.username].running = false;}
       //animation et scroll du personnage immobile (droite)
			else if (!monsters[socket.username].side)
      {characterWalkingL.frameIndex =0 ;
        characterWalkingL.tickCount =0 ;
        characterStandingL.update();
      characterStandingL.render(x,y,life);
      monsters[socket.username].running = false;}
	 
		
      // restore the context
      ctx.restore(); 
    }
  
  function timer(currentTime) {
    var delta = currentTime - oldTime;
    oldTime = currentTime;
    return delta;
    
  }
    var mainLoop = function(time){
       // Clear the canvas
       //LAISSER CE COMMENTAIRE(peut se reveler necessaire plus tard pour des debug d'animation)
        //clearCanvas();

      switch(etatCourant) {
        case etats.menuPrincipal:
          if(monsters[socket.username] == undefined || imgWidth == undefined || imgHeight == undefined ||
           w == undefined || h == undefined )
          {
            clearCanvas();
            ctx.fillText("Wolf Racer", 100, 100);
            ctx.fillText("Loading resources,please wait.", 100, 150);
          }
          else
          {
            clearCanvas();
            //console.log("GAME OVER");
            ctx.fillText("Runner", 100, 100);
            ctx.fillText("Press Enter to begin to play", 100, 150);
            
            if(inputStates.enter) 
            {
              //console.log("game begin");
              //createBalls(4);
              //monsters[socket.username].dead = false;
              etatCourant = etats.jeuEnCours;
            }
          }
          break;

        case etats.jeuEnCours: 
          //LAISSER CES COMMENTAIRE(debug)
          //clearCanvas();
          //map yeezid (niveau 2 ?)
          //ctx.drawImage(scrollImg,scrollVal,scrollValY ,imgWidth,imgHeight, 0, 0, canvasWidth,canvasHeight);
          //ma map
          ctx.drawImage(scrollImg,scrollVal,scrollValY ,canvasWidth,canvasHeight, 0, 0, canvasWidth,canvasHeight);
          //characterWalking.render();
          //console.log("username : " + socket.username);
          //console.log("monster : " + monsters[socket.username].x);
          //if(monsters[socket.username].dead) {
          //etatCourant = etats.gameOver;
          //}
          //main function, called each frame 
          measureFPS(time);
      
          // number of ms since last frame draw
          delta = timer(time);
          tempsTotal += delta;
          ctx.fillText((tempsTotal/1000).toFixed(2) , 100, 100);
       
          
          // Check inputs and move the monsters[socket.username]
          updatemonsterPosition(delta);
         
		      //Check the collision with the walls of the monsters[socket.username]s
			    gestionsCollisions(monsters[socket.username].x , monsters[socket.username].y);
			
          // update and draw balls
         //updateBalls(delta);

          // draw the monsters[socket.username]
          renderScroll(monsters[socket.username].x,monsters[socket.username].y);
          drawMymonster(monsters[socket.username].x, monsters[socket.username].y,monsters[socket.username].life);
          //animation et rendering des autre personnage du multiplayer 
          for(user in monsters)
          {
            //drawMymonster(monsters[user].x, monsters[user].y);
            //on les anime tous sauf le joueur du client qui a eu lui meme son traitement specifique
            //LAISSER LE COMMENTAIRE(future amelioration des perfs possible en evitant de dessiner les character hors-cadre)
            //(encore instable)
            if(user != socket.username) //&&  (monsters[user].x > scrollVal) && (monsters[user].x + 200 <  canvasWidth))
               {drawOthermonster(monsters[user]);}
             
          }
          //affichage du bonus 
          ctx.drawImage(daggerImg,0,0,daggerImg.width,daggerImg.height, 773 - scrollVal , 108 - scrollValY, sizeDagger,sizeDagger);
         //console.log(daggerThrown.length);
          
          //Render des dague envoyé par les joueur.
          renderDagger(delta);
          //affichages des boules de feu
            for(var i=0;i<tabFire.length;i++){
                tabFire[i].drawFire();
            }

          //affichage des monstres
            for(var i=0;i<tabMonster.length;i++) {
                tabMonster[i].drawMonster();
            }

          if(inputStates.right || inputStates.left || inputStates.up || inputStates.down 
            || monsters[socket.username].jump || monsters[socket.username].onground == false 
            || (daggerThrown.length != 0))
          {
            socket.emit('receive_position', monsters,daggerThrown);
          }
          break;
        case etats.gameOver:
          //console.log("GAME OVER");
          ctx.fillText("GAME OVER", 100, 100);
          ctx.fillText("Press SPACE to start again", 100, 150);
          
          if(inputStates.space) {
            
           // createBalls(4);
            monsters[socket.username].dead = false;
            etatCourant = etats.jeuEnCours;
          }
          break;
      
      }
        requestAnimationFrame(mainLoop);
    };
  

    function updatemonsterPosition(delta) {
      //LAISSER CE COMMENTAIRE(implementation de slide/dash si on finit a temps)
        //if ((monsters[socket.username].speedX < 100) && (monsters[socket.username].speedX > -100)) 
        //{
          monsters[socket.username].speedX = 0;
          //on emet a chaque update la position de notre client
          // en effet en cas de chute aucune touche n'aura etait pressé mais il y aura quant meme eu deplacement
          //donc mise a jour necessaire coté serveur
          //socket.emit('receive_position', monsters,daggerThrown);
        //}
    
        // check inputStates
        if (inputStates.left ) {
			     //renderLeft()
			     monsters[socket.username].speedX = -monsters[socket.username].speed;
        }
        if (inputStates.up) {
          

        }
       if (inputStates.right) {
			     //renderRight();
            monsters[socket.username].speedX = monsters[socket.username].speed;
        }
        if (inputStates.down) {
            //monsters[socket.username].speedY = monsters[socket.username].speed;
            monsters[socket.username].onground = false;
        } 
        if (inputStates.space) {
          //On check si on ne saut pas deja(voir double jump si on a le temps) 
          // et si on est au sol(on va dire pas de jump en mid air pour l'instant)
            if(monsters[socket.username].jump == false && monsters[socket.username].onground){
              //jump passse a true
              monsters[socket.username].jump = true;
              //on est plus au sol
              monsters[socket.username].onground = false;
              // la vitesse en y augmente (on décolle) 
              //l'axe des y etant inversé sur le canvas de js on doit bien ajouter un chiffre negatif.
              monsters[socket.username].speedY = -monsters[socket.username].speed * 5;
            }
        }
        //lancer une dague recuperer au prealable
        if (inputStates.r)
        {
            if ( monsters[socket.username].ownSlow)
            {
              console.log("shot");
              //on envoit la dague dans la direction indiquer par le clavier du joueur
              if (inputStates.right)
              {
                daggerThrown.push(new dagger(monsters[socket.username].x + 250,monsters[socket.username].y,"right"));
                console.log("shot right");
              }
              else if (inputStates.left)
              {
                daggerThrown.push(new dagger(monsters[socket.username].x - 150,monsters[socket.username].y,"left"));
              }
              else if (inputStates.down)
              {
                daggerThrown.push(new dagger(monsters[socket.username].x,monsters[socket.username].y + 250,"down"));
              }
              else if (inputStates.up)
              {
                daggerThrown.push(new dagger(monsters[socket.username].x,monsters[socket.username].y  - 150,"up"));
              }
              //si aucune direction n'est indiqué on l'envoit du coté ou il regarde
              else if (monsters[socket.username].side)
              {
                daggerThrown.push(new dagger(monsters[socket.username].x  + 250,monsters[socket.username].y,"right"));
              }
              else 
              {
                daggerThrown.push(new dagger(monsters[socket.username].x - 150,monsters[socket.username].y,"left"));
              }
              //le joueur n'a plus de dague de slow
              monsters[socket.username].ownSlow = false;
            }
        }

        //LAISSER CE COMMENTAIRE(ajout d'element a la souris si il reste du temps)
        //if (inputStates.mousePos) { 
        //}
       /*if (inputStates.mousedown) { 
            monsters[socket.username].speed = 500;
        } else {
          // mouse up
          monsters[socket.username].speed = 100;
        }
      */
      //LAISSER CE COMMENTAIRE(slide/dash)
     // monsters[socket.username].speedX *= monsters[socket.username].friction;
      
      //si on se situe au sol pas de graviter appliquer

      if (monsters[socket.username].onground)
      {
        monsters[socket.username].speedY = 0;
      }
       // sinon on applique la gravité pour rabattre le joueur au sol
      else
      {
         monsters[socket.username].speedY += monsters[socket.username].gravity;
      }
      if (monsters[socket.username].slowed)
      {
        monsters[socket.username].speedX *= 0.3 ;
      }
        // COmpute the incX and inY in pixels depending
        // on the time elasped since last redraw
        monsters[socket.username].x += calcDistanceToMove(delta, monsters[socket.username].speedX);
        monsters[socket.username].y += calcDistanceToMove(delta, monsters[socket.username].speedY);
   }
   
  //peut se reveler utile si on ajoute des projectile plsu tard
 /* 
 function updateBalls(delta) {
      // for each ball in the array
    for(var i=0; i < ballArray.length; i++) {
      var ball = ballArray[i];
      
      // 1) move the ball
      ball.move(delta);   
  
      // 2) test if the ball collides with a wall
      testCollisionWithWalls(ball);
      
      // teste collisions avec monstre
     if(circleCollide(ball.x, ball.y, ball.radius,
                       monsters[socket.username].x, monsters[socket.username].y, monsters[socket.username].boundingCircleRadius)) {
        //console.log("collision");
        ball.color = 'red';
        monsters[socket.username].dead = true;
      }
      
      if(circRectsOverlap(monsters[socket.username].x-50, monsters[socket.username].y-50, 100, 100, ball.x, ball.y, ball.radius)) {
                            
        //console.log("collision");
        ball.color = 'red';
        monsters[socket.username].dead = true;

      }
  
      // 3) draw the ball
      ball.draw(ctx);
  }
} 
*/
  // Teste collisions entre cercles

  /*
  function testCollisionWithWalls(ball) {
    // left
    if (ball.x < ball.radius) {
        ball.x = ball.radius;
        ball.angle = -ball.angle + Math.PI;
    } 
    // right
    if (ball.x > w - (ball.radius)) {
        ball.x = w - (ball.radius);
        ball.angle = -ball.angle + Math.PI; 
    }     
    // up
    if (ball.y < ball.radius) {
        ball.y = ball.radius;
        ball.angle = -ball.angle;     
    }     
    // down
    if (ball.y > h - (ball.radius)) {
        ball.y = h - (ball.radius);
        ball.angle =-ball.angle; 
    } 
}
  */
  /*
    function getMousePos(evt) {
        // necessary to take into account CSS boudaries
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
      
  function createBalls(numberOfBalls) {
      for(var i=0; i < numberOfBalls; i++) {
        // Create a ball with random position and speed. 
        // You can change the radius
        var ball =  new Ball(w*Math.random(),
                          h*Math.random(),
                          (2*Math.PI)*Math.random(),        
                          50,
                          30);
        //console.log("nom d'utilisateur : " + socket.username);
        //console.log("position en x : " + monsters[socket.username].x);
        if(!circleCollide(ball.x, ball.y, ball.radius,
                       monsters[socket.username].x, monsters[socket.username].y, monsters[socket.username].boundingCircleRadius)) {
        // On la rajoute au tableau
        ballArray[i] = ball;
        } else {
          i--;     
        }
      }
   }                                
*/
  
    var start = function(){

        tabMonster.push(new monster2(ctx,1200,900,0));
       tabMonster.push(new monster2(ctx,4200,950,0));
        tabFire.push(new fire(ctx,500,300));
        tabFire.push(new fire(ctx,2200,200));
        
        // adds a div for displaying the fps value
        fpsContainer = document.createElement('div');
        document.body.appendChild(fpsContainer);
      
        // Canvas, context etc.
        //canvas = document.querySelector("#myCanvas");
  
        // often useful
        w = canvas.width; 
        h = canvas.height;  
  
        // important, we will draw with this object
        //ctx = canvas.getContext('2d');
        // default police for text
        ctx.font="20px Arial";
      
       //add the listener to the main, window object, and update the states
      window.addEventListener('keydown', function(event){
          if (event.keyCode === 37) {
             inputStates.left = true;
          } else if (event.keyCode === 38) {
             inputStates.up = true;
          } else if (event.keyCode === 39) {
             inputStates.right = true;
          } else if (event.keyCode === 40) {
             inputStates.down = true;
          }  else if (event.keyCode === 32) {
             inputStates.space = true;
          }
          else if(event.keyCode === 13)
          {
            inputStates.enter = true;
          }
          else if(event.keyCode === 82)
          {
            inputStates.r = true;
          }
      }, false);

      //if the key will be released, change the states object 
      window.addEventListener('keyup', function(event){
          if (event.keyCode === 37) {
             inputStates.left = false;
          } else if (event.keyCode === 38) {
             inputStates.up = false;
          } else if (event.keyCode === 39) {
             inputStates.right = false;
          } else if (event.keyCode === 40) {
             inputStates.down = false;
          } else if (event.keyCode === 32) {
             inputStates.space = false;
          }
           else if(event.keyCode === 13)
          {
            inputStates.enter = false;
          }
          else if(event.keyCode === 82)
          {
            inputStates.r = false;
          }
      }, false);
      /*
      // Mouse event listeners
      canvas.addEventListener('mousemove', function (evt) {
          inputStates.mousePos = getMousePos(evt);
      }, false);

      canvas.addEventListener('mousedown', function (evt) {
            inputStates.mousedown = true;
            inputStates.mouseButton = evt.button;
      }, false);

      canvas.addEventListener('mouseup', function (evt) {
          inputStates.mousedown = false;
      }, false);      
*/
        // We create tge balls: try to change the parameter
        //createBalls(4); 

        // start the animation
        requestAnimationFrame(mainLoop);
    };

    //our GameFramework returns a public API visible from outside its scope
    return {
        start: start
    };
};