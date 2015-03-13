var  daggerSpeed = 400;

var daggerImg = new Image();

// on stock les dague lancé
 //var daggerThrown = [];

daggerImg.src = "slow.png";

daggerImg.onload = loadImageDagger;
//on recupere la largeur et hauteur de l'img chargé
function loadImageDagger()
{   
    sizeDagger = daggerImg.width / 6;
}

var daggerLeft = new Image();


daggerLeft.src = "leftSlow.png";

var daggerRight= new Image();


daggerRight.src = "rightSlow.png";

var daggerUp = new Image();


daggerUp.src = "upSlow.png";







var daggerTpU = new Image();

daggerTpU.src = "upTp.png";

var daggerTpR = new Image();


daggerTpR.src = "rightTp.png";

var daggerTpL= new Image();


daggerTpL.src = "leftTp.png";

var daggerTpD = new Image();


daggerTpD.src = "Tp.png";




//on recupere la direction pour savoir quelle image correspond a la dague
//mais aussi dans quelle direction la dague doit partir
function dagger(x,y,direction,type)
{
	this.x=x;
	this.y=y;
	//stocker directement l'img dans l'objet est impossible ici car lors de son emission vers le serveur on obtient 
	//un stack overflow en voulant envoyer des donné binaire.
	/*
	if (direction == "right")
	{
		this.speedX = 1 ;
		this.speedY = 0;
		this.img = daggerRight;
	}
	else if (direction == "left")
	{
		this.speedX = -1 ;
		this.speedY = 0;
		this.img = daggerLeft;
	}
	else if (direction == "up")
	{
		this.speedX = 0 ;
		this.speedY = -1;
		this.img = daggerUp;
	}
	else if (direction == "down")
	{
		this.speedX = 0 ;
		this.speedY = 1;
		this.img = daggerDown;
	}
	*/
	this.direction=direction;
  this.type=type;

};


function addDagger(type)
{
              var dague;
              //console.log("shot");
              //on envoit la dague dans la direction indiquer par le clavier du joueur
              if (inputStates.right)
              {
                dague = new dagger(monsters[socket.username].x + 250,monsters[socket.username].y,"right",type);
               
                //console.log("shot right");
              }
              else if (inputStates.left)
              {
                dague = new dagger(monsters[socket.username].x - 150,monsters[socket.username].y,"left",type) ; 
                
              }
              else if (inputStates.down)
              {
                dague = new dagger(monsters[socket.username].x,monsters[socket.username].y + 250,"down",type);
               
              }
              else if (inputStates.up)
              {
                dague = new dagger(monsters[socket.username].x,monsters[socket.username].y  - 150,"up",type);
                
              }
              //si aucune direction n'est indiqué on l'envoit du coté ou il regarde
              else if (monsters[socket.username].side)
              {
                dague = new dagger(monsters[socket.username].x  + 250,monsters[socket.username].y,"right",type);
               
              }
              else 
              {
                dague = new dagger(monsters[socket.username].x - 150,monsters[socket.username].y,"left",type);
                
              }
               daggerThrown.push(dague);
               socket.emit('new_dagger', dague);
              //le joueur n'a plus de dague de slow
              if(type == "slow")
              {
                monsters[socket.username].ownSlow--;
                
              }
              else if (type == "tp")
              {
                monsters[socket.username].ownTp = false;
              }
              
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
             
             

            if (daggerThrown[i].direction == "right" && daggerThrown[i].type == "slow")
            {
              ctx.drawImage(daggerRight,0,0,daggerImg.width,daggerImg.height, daggerThrown[i].x - scrollVal , daggerThrown[i].y - scrollValY, sizeDagger,sizeDagger);
            
              daggerThrown[i].x +=  calcDistanceToMove(delta, daggerSpeed) ;
            }
            else if (daggerThrown[i].direction == "right" && daggerThrown[i].type == "tp")
            {
              ctx.drawImage(daggerTpR,0,0,daggerImg.width,daggerImg.height, daggerThrown[i].x - scrollVal , daggerThrown[i].y - scrollValY, sizeDagger,sizeDagger);
            
              daggerThrown[i].x +=  calcDistanceToMove(delta, daggerSpeed) ;
            }
            else if (daggerThrown[i].direction == "left" && daggerThrown[i].type == "slow")
            {
              ctx.drawImage(daggerLeft,0,0,daggerImg.width,daggerImg.height, daggerThrown[i].x - scrollVal , daggerThrown[i].y - scrollValY, sizeDagger,sizeDagger);
              daggerThrown[i].x += calcDistanceToMove(delta, -daggerSpeed) ;
            }
            else if (daggerThrown[i].direction == "left" && daggerThrown[i].type == "tp")
            {
              ctx.drawImage(daggerTpL,0,0,daggerImg.width,daggerImg.height, daggerThrown[i].x - scrollVal , daggerThrown[i].y - scrollValY, sizeDagger,sizeDagger);
              daggerThrown[i].x += calcDistanceToMove(delta, -daggerSpeed) ;
            }
            else if (daggerThrown[i].direction == "up" && daggerThrown[i].type == "slow")
            {
              ctx.drawImage(daggerUp,0,0,daggerImg.width,daggerImg.height, daggerThrown[i].x - scrollVal , daggerThrown[i].y - scrollValY, sizeDagger,sizeDagger);
              daggerThrown[i].y += calcDistanceToMove(delta, -daggerSpeed) ;
              
            }
             else if (daggerThrown[i].direction == "up" && daggerThrown[i].type == "tp")
            {
              ctx.drawImage(daggerTpU,0,0,daggerImg.width,daggerImg.height, daggerThrown[i].x - scrollVal , daggerThrown[i].y - scrollValY, sizeDagger,sizeDagger);
              daggerThrown[i].y += calcDistanceToMove(delta, -daggerSpeed) ;
              
            }
            else if (daggerThrown[i].direction == "down" && daggerThrown[i].type == "slow")
            {
              ctx.drawImage(daggerImg,0,0,daggerImg.width,daggerImg.height, daggerThrown[i].x - scrollVal , daggerThrown[i].y - scrollValY, sizeDagger,sizeDagger);
              daggerThrown[i].y += calcDistanceToMove(delta, daggerSpeed);
            
            }
            else if (daggerThrown[i].direction == "down" && daggerThrown[i].type == "tp")
            {
              ctx.drawImage(daggerTpD,0,0,daggerImg.width,daggerImg.height, daggerThrown[i].x - scrollVal , daggerThrown[i].y - scrollValY, sizeDagger,sizeDagger);
              daggerThrown[i].y += calcDistanceToMove(delta, daggerSpeed);
            
            }
             //on finit par verifier que les dague ne sont pas sortit du stage
            if (daggerThrown[i].x + sizeDagger > imgWidth || daggerThrown[i].y + sizeDagger > imgHeight 
            ||daggerThrown[i].x  < 0 || daggerThrown[i].y  < 0)
            {
              daggerThrown.splice(i,1);
            } 
          }
     }