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