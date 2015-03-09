scrollImg.onload = loadImage;
//on recupere la largeur et hauteur de l'img chargé
function loadImage()
{
    imgWidth = scrollImg.width,
    imgHeight = scrollImg.height;
}

//cette méthode nous sert plus au moisn de caméra et gere le scrolling du background

function renderScroll(x,y)
{

		// Ces deux condition regle un bug assez particulier pour lequel je n'ai pas trouver d'autre solution( a la fois pour x et y ) 	 
		if(scrollVal > 0)
		{
			scrollVal =0;
		}
		
		if(scrollValY > 0)
		{
			scrollValY =0;
		}
		//on verfie que le scrolling sur la droite n'atteint pas la fin de notre image (sur la droite en X)
		if ((scrollVal + canvasWidth) < imgWidth)
		{
			scrollVal  = imgWidth -  canvasWidth;
		}
		//on verfie que le scrolling n'atteint pas la fin de notre image (sur le bas en Y)
		
		if ((scrollValY + canvasHeight) < imgHeight)
		{
			scrollValY  = imgHeight -  canvasHeight;
		}
		
		ctx.clearRect(0,0,canvasWidth,canvasHeight);
		// on gere le scrolling selon le deplacement du personnage du client en x 
		if (x - scrollVal + (canvasWidth/4) > canvasWidth )
			{scrollVal = x - ( canvasWidth - (canvasWidth/4))  ;}
		else if (x - (canvasWidth/4)  < scrollVal )
			{scrollVal =  x -(canvasWidth/4); }
		// on gere le scrolling selon le deplacement du personnage du client en y 
		if (y - scrollValY + (canvasHeight/4) > canvasHeight )
			{scrollValY = y - ( canvasHeight - (canvasHeight/4))  ;}
		else if (y - (canvasHeight/4)  < scrollValY )
			{scrollValY =  y -(canvasHeight/4); }
		//on verfie que le scrolling n'atteint pas la fin de notre image (sur la gauche en X)
		if(scrollVal < 0)
		{
			scrollVal =0;
		}
		//on verfie que le scrolling  n'atteint pas la fin de notre image (sur le haut en Y)
		
		if(scrollValY < 0)
		{
			scrollValY =0;
		}
		//on dessine enfin notre img a l'aide des var scrollVal et scrollValY dependat directement de x et y 

		ctx.drawImage(scrollImg,scrollVal,scrollValY,canvasWidth,canvasHeight, 0, 0, canvasWidth,canvasHeight);
	
}
	