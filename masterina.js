

function drawCir(xx,yy)
	{
		
		context.beginPath();
	    context.lineWidth = 2;
	    context.moveTo(xx-crossLine,yy-1);
		context.lineTo(xx+crossLine, yy-1);
		context.moveTo(xx-1,crossLine+yy);
		context.lineTo(xx-1,-crossLine+yy);
	    context.strokeStyle = '#000000';
	    context.stroke(); 
	    context.beginPath();
	    context.moveTo(xx-crossLine,yy+1);
		context.lineTo(xx+crossLine, yy+1);
		context.moveTo(xx+1,crossLine+yy);
		context.lineTo(xx+1,-crossLine+yy);
	    context.strokeStyle = '#ffffff';
	    context.stroke(); 
	    context.beginPath();
	    context.arc(xx, yy, lineThik, 0, 2 * Math.PI, false);
		context.fillStyle = '#000000';
	    context.fill();  
	}

	function draw(xx,yy)
	{
		//context2.beginPath();
	    //context2.arc(xx, yy, lineWidth, 0, 2 * Math.PI, false);
		// context.fillStyle = 'green';
	    //context.fill();
	    //context2.lineWidth = 2;
	    //context2.strokeStyle = '#003300';
	    //context2.stroke();  
	    if (lastXX== -1)
	    {
	    	lastXX=xx; lastYY=yy;
	    }	

	    context2.beginPath();
	    context2.lineWidth = lineThik;
	    context2.moveTo(lastXX,lastYY);
		context2.lineTo(xx,yy);
		context2.lineCap = 'round';
	    context2.strokeStyle = '#000000';
	    context2.stroke();  
	    lastXX=xx;
	    lastYY=yy;
	    
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