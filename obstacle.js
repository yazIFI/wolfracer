/**
 * Created by yazide on 06/03/2015.
 */


var step = 0;

var spriteY=0;

var imgfire = new Image();

imgfire.src = "fire.png";




function monster2(ctx,x,y,life){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.life = life;
    this.width = 600;
    this.height = 600;
    this.tempX=this.x;
    this.tickCount = 0;
    this.ticksPerFrame = 30;
    this.stepMonster=0;
    this.spriteX=0;
    this.imgMonster = new Image();
    this.imgMonster.src = "snakeR.png";
    
}
    monster2.prototype.drawMonster = function(){
        
        //console.log("SpriteX : " + spriteX);
        //console.log("tickCount : " + this.tickCount);
        this.ctx.drawImage(this.imgMonster,((this.spriteX % 2) * this.width),0,this.width, this.height,this.x -scrollVal, this.y - scrollValY, 200, 200);
        if(this.tickCount > this.ticksPerFrame){this.tickCount = 0 ;this.spriteX= this.spriteX + 1;}
        if(this.x>this.tempX){this.stepMonster=-200;this.imgMonster.src = "snakeL.png";}
        else if(this.x<this.tempX-300){this.stepMonster=200;this.imgMonster.src = "snakeR.png";}
        if(this.stepMonster<0){this.x-=5;}
        else{this.x+=5;}
        this.tickCount =this.tickCount + 1;
        
};

function fire(ctx,x,y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 70;
    this.tempY = this.y;

//faire apparaitre le feu (une boule qui se deplace a la verticale)
    this.drawFire = function () {
        this.ctx.drawImage(imgfire, 0, 0, this.width, this.height, this.x - scrollVal, this.y - scrollValY, 70, 140);
        if (this.y < this.tempY) {
            step = 100;
        }
        else if (this.y > this.tempY + 400) {
            step = -100;
        }
        if (step < 0) {
            this.y--;
        }
        else {
            this.y++;
        }

    }

};