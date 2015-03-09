/**
 * Created by yazide on 06/03/2015.
 */


var step = 0;
var stepMonster=0;
var spriteX=0;
var spriteY=0;

var imgfire = new Image();
var imgMonster = new Image();
imgfire.src = "fire.png";
imgMonster.src = "monster-lizard.png";



function monster2(ctx,x,y,life){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.life = life;
    this.width = 50;
    this.height = 50;
    this.tempX=this.x;

    this.drawMonster = function(){
        var tabSpriteMonstre = [0,90,170,250,330,410];
        this.ctx.drawImage(imgMonster,tabSpriteMonstre[spriteX],spriteY,this.width, this.height,this.x -scrollVal, this.y - scrollValY, 100, 150);

        if(this.x>this.tempX){stepMonster=-200;spriteY=110;}
        else if(this.x<this.tempX-300){stepMonster=200;spriteY=0;}
        if(stepMonster<0){this.x-=5;}
        else{this.x+=5;}
        if(spriteX<=5){spriteX++;}
        else{spriteX=0;}
    }

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