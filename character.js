//character
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

//On créé des objet Image qui vont contenier les ressource graphique
//p1 sprite
var characterWalkingSprite = new Image();
characterWalkingSprite.src = "walkingR.png";
var characterWalkingSpriteL = new Image();
characterWalkingSpriteL.src = "walkingL.png";
var characterStandingSpriteR = new Image();
characterStandingSpriteR.src = "standingR.png";
var characterStandingSpriteL = new Image();
characterStandingSpriteL.src = "standingL.png";
var characterDropSpriteR = new Image();
characterDropSpriteR.src = "dropR.png";
var characterDropSpriteL = new Image();
characterDropSpriteL.src = "dropL.png";

//p2 sprite

var characterWalkingSprite2 = new Image();
characterWalkingSprite2.src = "walkingR2.png";
var characterWalkingSpriteL2 = new Image();
characterWalkingSpriteL2.src = "walkingL2.png";
var characterStandingSpriteR2 = new Image();
characterStandingSpriteR2.src = "standingR2.png";
var characterStandingSpriteL2 = new Image();
characterStandingSpriteL2.src = "standingL2.png";
var characterDropSpriteR2 = new Image();
characterDropSpriteR2.src = "dropR2.png";
var characterDropSpriteL2 = new Image();
characterDropSpriteL2.src = "dropL2.png";


//l'objet sprite permettera à l'aide de 2 métohde update et render l'animation de nos ressource graphique
//frameIndex et le numéro que de la frame que la méthode render affichera. 
//tickpPerFrame nous permet d'indiquer tout les combien de tick du processeur nous changeons de frame
//c'est donc le temp de passage d'une frame a l'autre(augmenter pour des animation plus lente,
//diminuer pour des animation plus rapide)
//numberOfFrame le nomre de frame contenu dans notre spritesheet
//tickCount et le nombre de cycle on l'incremente a chaque update.
//Quant tout les frame sont joué on remet tickCount a 0 afin de faire boucler l'animation

function sprite (options) {
				
	this.loop = options.loop;
	
    this.context = options.context;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;

    

	this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 8;
    this.numberOfFrames = options.numberOfFrames || 1;
	
}
	sprite.prototype.render = function (x,y,life) {
		//this.context.clearRect(300, 300, 200, 200);
        this.context.fillStyle="green";
        this.context.fillRect(x - scrollVal+50,y - scrollValY-20,life,10);
        
        // Draw the animation
        this.context.drawImage(
           this.image,
           (this.frameIndex %3) * this.width , //mes spritesheet on pour l'instant 3 frame en 1 er ligne
           (this.frameIndex % 2) * this.height , // et 2 en 2 e ligne
           this.width ,
           this.height,
           x - scrollVal,
           y - scrollValY ,
           //this.width/3,
           //this.height/3
           sizeCharacter,
           sizeCharacter);
    };
	
	sprite.prototype.update = function () {

        this.tickCount += 1;
			//console.log(" frameIndex : " + frameIndex + " \n" )
        if (this.tickCount > this.ticksPerFrame) {
        
        	this.tickCount = 0;
        	 // If the current frame index is in range
            if (this.frameIndex < (this.numberOfFrames - 1) ) {	
                // Go to the next frame
            // Go to the next frame
            //console.log(" frameIndex : " + this.frameIndex + " \n" )
            this.frameIndex += 1; 
			}
      else  {
                this.frameIndex = 0;
            } 
        }
    }; 
	
    
//p1

var characterStandingR  = new sprite ({
  context: ctx,
    width: 600,
    height: 600,
    image: characterStandingSpriteR,
  //nombre de frame dans la spritesheet
  numberOfFrames : 1
});


var characterStandingL  = new sprite ({
  context: ctx,
    width: 600,
    height: 600,
    image: characterStandingSpriteL,
  //nombre de frame dans la spritesheet
  numberOfFrames : 1
});


var characterDropR  = new sprite ({
  context: ctx,
    width: 600,
    height: 600,
    image: characterDropSpriteR,
  //nombre de frame dans la spritesheet
  numberOfFrames : 1
});

var characterDropL = new sprite({
    context: ctx,
    width: 600,
    height: 600,
    image: characterDropSpriteL,
	//nombre de frame dans la spritesheet
	numberOfFrames : 5
});

var characterWalking = new sprite({
    context: ctx,
    width: 600,
    height: 600,
    image: characterWalkingSprite,
  //nombre de frame dans la spritesheet
  numberOfFrames : 5
});

var characterWalkingL = new  sprite({
    context: ctx,
    width: 600,
    height: 600,
    image: characterWalkingSpriteL,
  //nombre de frame dans la spritesheet
  numberOfFrames : 5
});

//p2

var characterStandingR2  = new sprite ({
  context: ctx,
    width: 600,
    height: 600,
    image: characterStandingSpriteR2,
  //nombre de frame dans la spritesheet
  numberOfFrames : 1
});


var characterStandingL2  = new sprite ({
  context: ctx,
    width: 600,
    height: 600,
    image: characterStandingSpriteL2,
  //nombre de frame dans la spritesheet
  numberOfFrames : 1
});

var characterDropR2  = new sprite ({
  context: ctx,
    width: 600,
    height: 600,
    image: characterDropSpriteR2,
  //nombre de frame dans la spritesheet
  numberOfFrames : 1
});


var characterDropL2  = new sprite ({
  context: ctx,
    width: 600,
    height: 600,
    image: characterDropSpriteL2,
  //nombre de frame dans la spritesheet
  numberOfFrames : 1
});

var characterWalking2 = new sprite({
    context: ctx,
    width: 600,
    height: 600,
    image: characterWalkingSprite2,
  //nombre de frame dans la spritesheet
  numberOfFrames : 5
});

var characterWalkingL2 = new  sprite({
    context: ctx,
    width: 600,
    height: 600,
    image: characterWalkingSpriteL2,
  //nombre de frame dans la spritesheet
  numberOfFrames : 5
});