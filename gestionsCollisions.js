/*
function transvervaleCollision(x,y,transversale)
{
  if (x > transversale.x1 &&  x < transversale.x2 && x )
}
*/
var boxCollisionLevels=[];
function gestionsCollisions(x , y)
  {
    //on verifie qu on ne part pas hors cadre sur la droite
	if (x > (imgWidth -200) )
	{
		monsters[socket.username].x = (imgWidth - 200);
	}
  //on verifie qu on ne part pas hors cadre sur la gauche
	if (x < 0 )
	{
		monsters[socket.username].x = 0;
	}
  //on respawn en position de depart si l'on tombe hors map
  if ( y > imgHeight)
  {
    monsters[socket.username].x=0;
    monsters[socket.username].y= 0;
  }
  
  //colision box

 //LAISSER CETTE PARTIE DE COMMENTAIRE (possible utilisation de spatial hash dans le futur en vu de meilleur performence )
   /*
   var elementProche =  mySpatialHash.retrieve({
    x : monsters[socket.username].x,
    y : monsters[socket.username].y,
    width : sizeCharacter,
    height : sizeCharacter
   });
*/
/*
   for (i = 0 ; i < elementProche.length ; i++)
   {
      if((monsters[socket.username].y > (elementProche[i].y - sizeCharacter)) && (monsters[socket.username].x >= elementProche[i].x  )
       && ((monsters[socket.username].x + sizeCharacter) <= (elementProche[i].x + elementProche[i].width)))
      {
        monsters[socket.username].y =  elementProche[i].y  - sizeCharacter;
        monsters[socket.username].jump = false;
      }
    }
    */

    //on recupere les position necessaire pour la landing box qui se trouve au pied du personnage
    var landingBoxX=x + tempX;
    var landingBoxY=y + tempY;
    //on pre-calcule les centre des hitbox du personnage
    if(monsters[socket.username].crouching)
    {
    var HitBoxX = x + 100 ;
    var HitBoxY = y + 150 ; 
    var HitBoxR = 33;
    }
    else
    {
    var HitBoxX = x + 100 ;
    var HitBoxY = y + 100 ; 
    var HitBoxR = 33;
    }
    //ajout future de plusieur hitbox pour avoir des collision avec le personnage plus precise
    //var headHitBoxX = x  ;
    //var headHitBoxY = y  ; 
    //LAISSER EN CAS DE DEBUG (visualisation de la hitbox)
    //ctx.fillStyle="#FF0000";
    //ctx.fillRect(x - scrollVal,y - scrollValY,sizeCharacter,sizeCharacter);
    //visualisation de la hitbox du joueur
    /*
    ctx.beginPath();
    ctx.arc(HitBoxX - scrollVal,HitBoxY - scrollValY,HitBoxR,0,2*Math.PI);
    ctx.stroke();
    */
    //on enleve le lock qui nous maintient au sol pour pouvoir tomber si l'on est plus sur notre plateforme
    monsters[socket.username].onground = false;
    
    
    //On commence par checker les transversale que nous traiterons separement (collision box avec un axe particulier)
    //rect 24
    //2561 481 2851 787
    //2587 454 2863 737 2821 765 2559 520
    /*
    var transversale = 
    {
      x1:2587,
      y1:454,
      x2:2863,
      y2:737,
      x3:2492,
      y3:794
    };
    */ 
     if (landingBoxX > 2561 && landingBoxX < 2851 && landingBoxY >481 && landingBoxY < 787 )
    {
      monsters[socket.username].onground = true;
      monsters[socket.username].jump = false;
    }

    //on check les collision box (possibilité d'implementer du quadtree ou spatial hash plus tard pour les perfs)
  if(level==1){ boxCollisionLevels=collisionsBox;}
   if(level==2){ boxCollisionLevels=collisionsBoxLevel2;}
    //on check les collision box (possibilité d'implementer du quadtree ou spatial hash plus tard pour les perfs)
    for (i = 0 ; i < boxCollisionLevels.length ; i++)
   {
        //LAISSER EN CAS DE DEBUG (visualisation des boite de collision afin de verifier que les coordonné est bien etait entré)
      //  ctx.fillRect(boxCollisionLevels[i].x - scrollVal ,boxCollisionLevels[i].y - scrollValY ,boxCollisionLevels[i].width ,boxCollisionLevels[i].height );
        // on recupere les vecteur pour pouvoir les comparer au demi hauteur et largeur afin de detecter les collision
        var vX = (landingBoxX + (landingBoxW / 2)) - (boxCollisionLevels[i].x + (boxCollisionLevels[i].width / 2));
        var vY = (landingBoxY + (landingBoxH / 2)) - (boxCollisionLevels[i].y + (boxCollisionLevels[i].height / 2));
        
        var hWidths = (landingBoxW / 2) + (boxCollisionLevels[i].width / 2);
        var hHeights = (landingBoxH / 2) + (boxCollisionLevels[i].height / 2);
        
        //on cherche de quel coté a lieu la colision ( gauche droite haut bas) afin de savoir si on atterit sur une plateforme
        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) 
        {                 
          var oX = hWidths - Math.abs(vX);
          oY = hHeights - Math.abs(vY);         
          if (oX >= oY) 
          {
            if (vY < 0) 
            {//cas ou le joueur entre en colision avec le haut d'une boite de collision , c a d arrive sur une plateforme
              monsters[socket.username].y -= oY;
              monsters[socket.username].jump = false;
              monsters[socket.username].onground = true;
            }
          }
          else 
          {
            if (vX > 0) 
            {//cas de la collision a gauche
              monsters[socket.username].x += oX;
            }
            else 
            {//cas d'une collision sur la droite    
                monsters[socket.username].x -= oX;
            }
          }
        }  
    }

    //on verifie si on a atteint un bonus(dagger)
   // ctx.fillRect( 773- scrollVal ,108 - scrollValY ,sizeDagger ,sizeDagger );
    if ( x < 773 + sizeDagger &&
   x + 100 > 773 &&
   y < 108 + sizeDagger &&
   100 + y > 108 )
    {
      monsters[socket.username].ownSlow = true;
      //console.log(monsters[socket.username].ownSlow = true);
    }

    //gestion des collision avec les dague( avec rectangle)
    /*
    for (i = 0 ; i < daggerThrown.length ; i++)
          {
            if ( x < daggerThrown[i].x  + sizeDagger &&
           x + sizeCharacter > daggerThrown[i].x &&
           y < daggerThrown[i].y + sizeDagger &&
           sizeCharacter + y > daggerThrown[i].y )
            {
              monsters[socket.username].slowed = true;
              //daggerThrown.splice(i,1);
            }
          }
      */
      //collision avec les dague usant de cercle
      for (i = 0 ; i < daggerThrown.length ; i++)
          {
            //on pre-calcule les centre des hitbox des dagues
            var HitBoxDX = daggerThrown[i].x + 50 ;
            var HitBoxDY = daggerThrown[i].y + 50 ; 
            var HitBoxDR = 33;
            //visualisation de la hitbox de la dague
            /*
            ctx.beginPath();
            ctx.arc(HitBoxDX - scrollVal,HitBoxDY - scrollValY,HitBoxDR,0,2*Math.PI);
            ctx.stroke();
            */
            var dx = (HitBoxX + HitBoxR) - (HitBoxDX+ HitBoxDR);
            var dy = (HitBoxY + HitBoxR) - (HitBoxDY + HitBoxDR);
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < HitBoxR + HitBoxDR) {
                // collision detected!
                monsters[socket.username].slowed = true;
                daggerThrown.splice(i,1);
                timerSlow = 0;
                socket.emit('delete_dagger', i);
            }
          }
      //gestion des collision avec les monstres
      for (i = 0 ; i < tabMonster.length ; i++)
      {
          if ( x < tabMonster[i].x  + tabMonster[i].width &&
              x + sizeCharacter > tabMonster[i].x &&
              y < tabMonster[i].y + tabMonster[i].height &&
              sizeCharacter + y > tabMonster[i].y )
          {
              if(monsters[socket.username].life >0) {monsters[socket.username].life-= 0.2;}
          }
      }

      //gestion des collision avec les boules de feu
      for (i = 0 ; i < tabFire.length ; i++)
      {
          if ( x < tabFire[i].x  + tabFire[i].width &&
              x + sizeCharacter > tabFire[i].x &&
              y < tabFire[i].y + tabFire[i].height &&
              sizeCharacter + y > tabFire[i].y )
          {
              if(monsters[socket.username].life >0) {monsters[socket.username].life-= 0.2;}

          }
      }
  }  