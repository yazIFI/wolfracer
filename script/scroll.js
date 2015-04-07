
//background
scrollImg = new Image();
canvasWidth = 800;
canvasHeight = 600;
scrollVal = 0;
scrollValY = 0 ;
//speed =1;

scrollImg.src = "../image/mapS.png";
//resize du personnage
var sizeCharacter = 600 / 4 ;
var centerX = sizeCharacter / 2;
var centerY = sizeCharacter * 3 /4;
//variable a utilise pour calculer la landing box:boite de collision servant à atterir sur les plateforme
var tempX =(2/6) * sizeCharacter  ; 
var tempY = (5/6) * sizeCharacter ; 
//hit box au pied du personnage pour atterir sur les plateforme voir la partie gestion des collisions
var landingBoxW =  sizeCharacter/2; 
var landingBoxH = sizeCharacter/6; 
