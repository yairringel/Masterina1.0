

function drawPie(drawX,drawY)
{

	if (startMove==false)
	    {	
	    	for (var ii=1; ii < pieType+1; ii++)
	    	 {
	    		lastPointX[ii]=drawX*Math.cos(2*Math.PI/pieType*ii)+drawY*Math.sin(2*Math.PI/pieType*ii)
	    		lastPointY[ii]=drawY*Math.cos(2*Math.PI/pieType*ii)-drawX*Math.sin(2*Math.PI/pieType*ii)
				if (mirror==2)
	    			{
	    			if (pieType==1)
	    				{
	    				lastPointXm[ii]=-(drawX*Math.cos(2*Math.PI/pieType*ii)+drawY*Math.sin(2*Math.PI/pieType*ii))
	    				lastPointYm[ii]=drawY*Math.cos(2*Math.PI/pieType*ii)-drawX*Math.sin(2*Math.PI/pieType*ii)

	    				}
	    			else{
	    				lastPointXm[ii]=drawY*Math.cos(2*Math.PI/pieType*ii)+drawX*Math.sin(2*Math.PI/pieType*ii)
	    				lastPointYm[ii]=drawX*Math.cos(2*Math.PI/pieType*ii)-drawY*Math.sin(2*Math.PI/pieType*ii)
	    				}
	    			}
	    	}
	    	
	    }	

	    
	for (var iii=1; iii < pieType+1; iii++)
		 {
		
    		pointsX[iii]=drawX*Math.cos(2*Math.PI/pieType*iii)+drawY*Math.sin(2*Math.PI/pieType*iii)
    		pointsY[iii]=drawY*Math.cos(2*Math.PI/pieType*iii)-drawX*Math.sin(2*Math.PI/pieType*iii)
    		if (mirror==2)
    			{
    				if (pieType==1)
    					{
    						pointsXm[iii]=-(drawX*Math.cos(2*Math.PI/pieType*iii)+drawY*Math.sin(2*Math.PI/pieType*iii))
    						pointsYm[iii]=drawY*Math.cos(2*Math.PI/pieType*iii)-drawX*Math.sin(2*Math.PI/pieType*iii)
    					}
    				else
    					{
    						pointsXm[iii]=drawY*Math.cos(2*Math.PI/pieType*iii)+drawX*Math.sin(2*Math.PI/pieType*iii)
    						pointsYm[iii]=drawX*Math.cos(2*Math.PI/pieType*iii)-drawY*Math.sin(2*Math.PI/pieType*iii)
    					}
    			}
    	}
 for (var iiii=1; iiii < pieType+1; iiii++) {
    	
		context2.beginPath();
	    context2.lineWidth = lineThik;
	    context2.moveTo(lastPointX[iiii],lastPointY[iiii]);
		context2.lineTo(pointsX[iiii],pointsY[iiii]);
		context2.lineCap = 'round';
	    context2.strokeStyle = masterina.color;
	    context2.stroke(); 
	    if (mirror==2){
		    context2.beginPath();
		    context2.lineWidth = lineThik;
		    context2.moveTo(lastPointXm[iiii],lastPointYm[iiii]);
			context2.lineTo(pointsXm[iiii],pointsYm[iiii]);
			context2.lineCap = 'round';
		    context2.strokeStyle = masterina.color;
		    context2.stroke(); 
		}
	    } 
	for (var iiiii=1; iiiii < pieType+1; iiiii++) {
	    lastPointX[iiiii]=pointsX[iiiii];
	    lastPointY[iiiii]=pointsY[iiiii];
	    if (mirror==2){
	    	
	    	lastPointXm[iiiii]=pointsXm[iiiii];
	    	lastPointYm[iiiii]=pointsYm[iiiii];
	    }
	   startMove=true;
	}

}
	


function drawMasterina()
{
	context.save();
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.restore();

	context.beginPath();
	context.lineWidth = 1;
	context.moveTo(-masterina.radius1,0);
	context.lineTo(masterina.radius1, 0);
	context.moveTo(0,masterina.radius1);
	context.lineTo(0,-masterina.radius1);
	context.strokeStyle = '#ffbbbb';
	context.stroke(); 
	context.beginPath();
	context.lineWidth = masterina.line;
	context.arc(0, 0,masterina.radius1, 0, 2 * Math.PI, false);
	context.strokeStyle = '#ababab';
	context.stroke(); 
	context.beginPath();
	context.arc(0, 0, masterina.radius2, 0, 2 * Math.PI, false);
	context.strokeStyle = '#000000';
	context.stroke(); 

	
}	
	function rotatePointViaGyroEulars(a,b,c) //rotates 3d point based on eular angles
{
	var oldX=0;
	var oldY=-startY;
	var oldZ=startZ;
	
	//order here is important - it must match the processing order of the device
	
	//rotate about z axis
	var newX = oldX * Math.cos(-degToRad(deviceOrientationData.alpha)) - oldY * Math.sin(-degToRad(deviceOrientationData.alpha));
	var newY = oldY * Math.cos(-degToRad(deviceOrientationData.alpha)) + oldX * Math.sin(-degToRad(deviceOrientationData.alpha));
	
	//rotate about x axis
	oldY=newY;
	newY = oldY * Math.cos(-degToRad(deviceOrientationData.beta)) - oldZ * Math.sin(-degToRad(deviceOrientationData.beta));
	var newZ = oldZ * Math.cos(-degToRad(deviceOrientationData.beta)) + oldY * Math.sin(-degToRad(deviceOrientationData.beta));

	
	//rotate about y axis
	oldZ=newZ;
	oldX=newX;

	newZ = oldZ * Math.cos(-degToRad(deviceOrientationData.gamma)) - oldX * Math.sin(-degToRad(deviceOrientationData.gamma));
	newX = oldX * Math.cos(-degToRad(deviceOrientationData.gamma)) + oldZ * Math.sin(-degToRad(deviceOrientationData.gamma));
	document.getElementById("alpha").innerHTML=oldZ;
	x=newX;
	y=newY;
	z=newZ;

	
}
function computeQuaternionFromEulers(alpha,beta,gamma)//Alpha around Z axis, beta around X axis and gamma around Y axis intrinsic local space in that order(each axis moves depending on how the other moves so processing order is important)
{
	var qx = degToRad(beta) ; // beta value
	var qy = degToRad(gamma) ; // gamma value
	var qz = degToRad(alpha) ; // alpha value

	//precompute to save on processing time
	var cX = Math.cos( x/2 );
	var cY = Math.cos( y/2 );
	var cZ = Math.cos( z/2 );
	var sX = Math.sin( x/2 );
	var sY = Math.sin( y/2 );
	var sZ = Math.sin( z/2 );

	var qw = cX * cY * cZ - sX * sY * sZ;
	var qx = sX * cY * cZ - cX * sY * sZ;
	var qy = cX * sY * cZ + sX * cY * sZ;
	var qz = cX * cY * sZ + sX * sY * cZ;

	x=qx;
	y=qy;
	z=qz;	  
}
window.addEventListener('orientationchange', function () {
    if (window.orientation == -90) {
        document.getElementById('orient').className = 'orientright';
    }
    if (window.orientation == 90) {
        document.getElementById('orient').className = 'orientleft';
    }
    if (window.orientation == 0) {
        document.getElementById('orient').className = '';
    }
}, true);

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
