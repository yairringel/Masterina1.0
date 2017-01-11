//============================================================================ btn func============================================================================

	var iMirror=0;
	var iLineThik=0;
	var iPieType=0;
	function funcNew()
	{
		context2.clearRect(-canvas2.width, -canvas2.height, canvas2.width*2, canvas2.height*2);
		context2.fillStyle ="#ffffff";
		context2.fillRect(-canvas2.width, -canvas2.height, canvas2.width*2, canvas2.height*2); 
		if (bitFill){
		funcFill();}
		
	}
	function funcLineThik()
	{
		if (bitFill){
		funcFill();}
		iLineThik+=1;
		lineThik=thikRa[iLineThik];
		document.getElementById("lineThik").src  =lineThikArray[iLineThik].src;
		if (iLineThik==5)
		{
			iLineThik=-1;
			
		}
	}
	function funcPieType()
	{
		if (bitFill){
		funcFill();}
		iPieType+=1;
		pieType=pieTypeRA[iPieType];
		document.getElementById("pieType").src  =pieTypeArray[iPieType].src;
		if (iPieType==5)
		{
			iPieType=-1;
			
		}
	}
	function funcMirror()
	{
		if (bitFill){
		funcFill();}
		iMirror+=1;
		mirror=mirrorRA[iMirror];
		document.getElementById("Mirror").src  =mirrorArray[iMirror].src;
		if (iMirror==1)
		{
			iMirror=-1;
			
		}
	}
	
	function funcUndo()
	{
		if (bitFill){
		funcFill();}
		if (firstUndo)
		{
			context2.putImageData(historyUndo.pop(), 0, 0);	
			firstUndo=false;
		}
		if (historyUndo.length > 0)
		{
			console.log(historyUndo.length);
			context2.putImageData(historyUndo.pop(), 0, 0);	
			console.log(historyUndo.length);

		}
		if (historyUndo.length == 0)
		{
			undo();
		}
	}
	function funcSave()
	{
		if (bitFill){
		funcFill();}
		canvas2.toBlob(function(blob) {
    	saveAs(blob, "masterina.jpg");
		});
	}
	function funcFill()
	{
		if (!(bitFill))
		{
			document.getElementById("Fill").src  ="fill2.png";
			bitFill=true;
		}
		else
		{
			document.getElementById("Fill").src  ="fill.png";
			bitFill=false;
		}
		
	}
 //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function piePoints(uX,uY)
{
	var pp=[];
	var ppX=[],ppY=[],ppXm=[],ppYm=[];
	for (var ui=0; ui < pieType; ui++)
	    	 {
	    		ppX[ui]=Math.round(uX*Math.cos(2*Math.PI/pieType*ui)+uY*Math.sin(2*Math.PI/pieType*ui))
	    		ppY[ui]=Math.round(uY*Math.cos(2*Math.PI/pieType*ui)-uX*Math.sin(2*Math.PI/pieType*ui))
				if (mirror==2)
	    			{
	    			if (pieType==1)
	    				{
	    				ppXm[ui]=Math.round(-(uX*Math.cos(2*Math.PI/pieType*ui)+uY*Math.sin(2*Math.PI/pieType*ui)))
	    				ppYm[ui]=Math.round(uY*Math.cos(2*Math.PI/pieType*ui)-uX*Math.sin(2*Math.PI/pieType*ui))

	    				}
	    			else{
	    				ppXm[ui]=Math.round(uY*Math.cos(2*Math.PI/pieType*ui)+uX*Math.sin(2*Math.PI/pieType*ui))
	    				ppYm[ui]=Math.round(uX*Math.cos(2*Math.PI/pieType*ui)-uY*Math.sin(2*Math.PI/pieType*ui))
	    				}
	    			}
	    	}
	    	pp=[ppX,ppY,ppXm,ppYm];
	    	
	    	return pp;
}	

function drawPie(drawX,drawY)
{

	if (startMove==false)
	{
		lastPointX=piePoints(drawX,drawY)[0];
		lastPointY=piePoints(drawX,drawY)[1];
		lastPointXm=piePoints(drawX,drawY)[2];
		lastPointYm=piePoints(drawX,drawY)[3];
	}
	   
	pointsX=piePoints(drawX,drawY)[0];
	pointsY=piePoints(drawX,drawY)[1];
	pointsXm=piePoints(drawX,drawY)[2];
	pointsYm=piePoints(drawX,drawY)[3];

 for (var iiii=0; iiii < pieType; iiii++) {
    	
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
	for (var iiiii=0; iiiii < pieType; iiiii++) {
	    lastPointX[iiiii]=pointsX[iiiii];
	    lastPointY[iiiii]=pointsY[iiiii];
	    if (mirror==2){
	    	
	    	lastPointXm[iiiii]=pointsXm[iiiii];
	    	lastPointYm[iiiii]=pointsYm[iiiii];
	    }
	   startMove=true;
	}

}
	
function drawCross(drawX,drawY)
{
	drawMasterina();
	pointsXc=piePoints(drawX,drawY)[0];
	pointsYc=piePoints(drawX,drawY)[1];
	pointsXmc=piePoints(drawX,drawY)[2];
	pointsYmc=piePoints(drawX,drawY)[3];
	
 for (var iiii=0; iiii < pieType; iiii++) {
    	
		context.beginPath();
	    context.lineWidth = lineThik;
	    context.moveTo(pointsXc[iiii]-5,pointsYc[iiii]);
		context.lineTo(pointsXc[iiii]+5,pointsYc[iiii]);
		context.moveTo(pointsXc[iiii],pointsYc[iiii]-5);
		context.lineTo(pointsXc[iiii],pointsYc[iiii]+5);
		context.lineCap = 'round';
	    context.strokeStyle = '#eeaaaa';
	    context.stroke(); 
	    if (mirror==2){
		    context.beginPath();
		    context.lineWidth = lineThik;
		    context.moveTo(pointsXmc[iiii]-5,pointsYmc[iiii]);
			context.lineTo(pointsXmc[iiii]+5,pointsYmc[iiii]);
			context.moveTo(pointsXmc[iiii],pointsYmc[iiii]-5);
			context.lineTo(pointsXmc[iiii],pointsYmc[iiii]+5);
			context.lineCap = 'round';
		    context.strokeStyle =  '#eebbbb';
		    context.stroke(); 
		}
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
function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255];
        //return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    throw new Error('Bad Hex');
}

//=====================================================================================================================================================================================
//============================================================================  ORIENTATION ===========================================================================================
	//===================================================================================================================================== 
document.addEventListener("touchStart", touchStartFunc, true);//?misspelled
document.addEventListener("touchmove", touchmoveFunc, true);
document.addEventListener("touchend", touchEndFunc, true);

function positioning()
{
	document.getElementById("lineThik").style.left  =-x-120+"px";
	document.getElementById("lineThik").style.top  = y+10+"px";	
	document.getElementById("spaceImg").style.left  =-x/10-300+"px";
	document.getElementById("spaceImg").style.top  = y/10-300+"px";	
	document.getElementById("sideImg").style.left  =-x+ 10%+"px";
	document.getElementById("sideImg").style.top  = y+0%+"px";
	document.getElementById("topImg").style.left  =-x+0%+"px";
	document.getElementById("topImg").style.top  = y+10%+"px";
	document.getElementById("lineThik").style.left  =-x+btnLineXpos+"px";
	document.getElementById("lineThik").style.top  =  y+btnLineYpos+"px";//same as img 1 top	
	document.getElementById("pieType").style.left  =-x+btnPyeXpos+"px";
	document.getElementById("pieType").style.top  =  y+btnPyeYpos+"px";//same as img 1 top	
	document.getElementById("Mirror").style.left  =-x+btnMirXpos+"px";
	document.getElementById("Mirror").style.top  =  y+btnMirYpos+"px";//same as img 1 top
	document.getElementById("Color").style.left  =-x/0.7+ width/2+imgWidth/2+60+"px";
	document.getElementById("Color").style.top  = y/0.7+height/2-imgHeight/2+"px";	
	if (color)
	{
		document.getElementById("myColorCanvas").style.left  =-x+ width/2-imgWidth/2+(imgWidth*frameBorderW/100)+"px";
		document.getElementById("myColorCanvas").style.top  = y+height/2-imgHeight/2+(imgHeight*frameBorderH/100)+"px";
	}
	else
	{
		document.getElementById("myColorCanvas").style.left  =-1000+"px";
	}
	document.getElementById("alpha").innerHTML=centerOffsetX;
	document.getElementById("beta").innerHTML=startY;
	document.getElementById("gamma").innerHTML =startZ;
	document.getElementById("X").innerHTML =btnLineXpos;
	document.getElementById("Y").innerHTML =btnLineYpos;
	document.getElementById("Z").innerHTML =0;
}

if (window.DeviceOrientationEvent) 
    {//
    	
    	window.addEventListener("deviceorientation", function () {//gyro
    	if (first==0)
    	{
    		startZ=Math.cos(degToRad(event.beta))*L1;
    		startY=Math.sin(degToRad(event.beta))*L1;
    		first=1;	
    	}	
    	
        processGyro(event.alpha, event.beta, event.gamma); 
    	}, true);
    	
}




function processGyro(alpha,beta,gamma)
{ 
	deviceOrientationData.alpha=alpha;
	deviceOrientationData.beta=beta;
	deviceOrientationData.gamma=gamma;
	
	drawMasterina();

	if (bitTouch)
	{
		
	}
	else
	{
		rotatePointViaGyroEulars(0,startY,startZ);
	}
	
	//positioning();		
	

}



function degToRad(deg)// Degree-to-Radian conversion
{
	 return deg * Math.PI / 180; 
}




//========================================================================================================================================================================
//======================================================================TOUCH==================================================================================================



function touchStartFunc(e)
{
	
}

function touchmoveFunc(e)
{
	
		if( navigator.userAgent.match(/Android/i) ) //stupid android bug cancels touch move if it thinks there's a swipe happening
		{   
		  e.preventDefault();
		}
		touchX=e.touches[0].clientX
		userX=e.touches[0].clientX-firstX;
		userY=e.touches[0].clientY-firstY;
		
		if (!(bitTouch))
		{
			
			firstX=e.touches[0].clientX;
			firstY=e.touches[0].clientY;
			
		}
		if (bitTouch){
			drawPie(userX+x,userY-y)
			
		}
		bitTouch=true;
	 
}

function touchEndFunc(e)
{
	
  
  userX=0;
	userY=0;
	bitTouch=false;
	startMove=false;
	
}

//=========================================================================================================================================================================