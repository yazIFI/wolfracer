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

var daggerDown = new Image();


daggerDown.src = "slow.png";

//on recupere la direction pour savoir quelle image correspond a la dague
//mais aussi dans quelle direction la dague doit partir
function dagger(x,y,direction)
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

};

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