//============================================================================ btn func============================================================================

	var iMirror=0;
	var iLineThik=0;
	var iPieType=0;
	var iLineType=0;
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
		document.getElementById("lineThikBtn").src  =lineThikArray[iLineThik].src;
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
		document.getElementById("pieTypeBtn").src  =pieTypeArray[iPieType].src;
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
		document.getElementById("MirrorBtn").src  =mirrorArray[iMirror].src;
		if (iMirror==1)
		{
			iMirror=-1;
			
		}
	}
	function funcLineType()
	{
		if (bitFill){
		funcFill();}
		iLineType+=1;
		lineType=lineTypeRA[iLineType];
		document.getElementById("lineTypeBtn").src  =lineTypeArray[iLineType].src;
		if (iLineType==4)
		{
			iLineType=-1;
			
		}
	}
	function funcFillCir()
	{
		if (bitFill){
		funcFill();}
		fillCir();
	}
	function funcCirLine()
	{
		if (bitFill){
		funcFill();}
		CirLine();
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
			
			context2.putImageData(historyUndo.pop(), 0, 0);	
			
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
//======================================================================DRAW LINES==============================================================================
function drawPieLine(drawX,drawY)
{
	
	if (!(bitDrawLine))
	{
		tX=piePoints(drawX,drawY)[0];
		tY=piePoints(drawX,drawY)[1];
		tXm=piePoints(drawX,drawY)[2];
		tYm=piePoints(drawX,drawY)[3];
		bitDrawLine=true;
	}
	pX=piePoints(drawX,drawY)[0];
	pY=piePoints(drawX,drawY)[1];
	pXm=piePoints(drawX,drawY)[2];
	pYm=piePoints(drawX,drawY)[3];

	for (var li=0; li < pieType; li++) {
    	
		context.beginPath();
	    context.lineWidth = lineThik;
	    context.moveTo(tX[li],tY[li]);
		context.lineTo(pX[li],pY[li]);
		context.lineCap = 'round';
	    context.strokeStyle = masterina.color;
	    context.stroke(); 
	    if (mirror==2){
		    context.beginPath();
		    context.lineWidth = lineThik;
		    context.moveTo(tXm[li],tYm[li]);
			context.lineTo(pXm[li],pYm[li]);
			context.lineCap = 'round';
		    context.strokeStyle = masterina.color;
		    context.stroke(); 
		}
	    } 
}

function drawPieLineTo2(drawX,drawY)
{
	for (var li=0; li < pieType; li++) {
    	
		context2.beginPath();
	    context2.lineWidth = lineThik;
	    context2.moveTo(tX[li],tY[li]);
		context2.lineTo(pX[li],pY[li]);
		context2.lineCap = 'round';
	    context2.strokeStyle = masterina.color;
	    context2.stroke(); 
	    if (mirror==2){
		    context2.beginPath();
		    context2.lineWidth = lineThik;
		    context2.moveTo(tXm[li],tYm[li]);
			context2.lineTo(pXm[li],pYm[li]);
			context2.lineCap = 'round';
		    context2.strokeStyle = masterina.color;
		    context2.stroke(); 
		}
	    } 
}
//============================================================================================DRAW CIRCLES==========================================================
function drawPieCir(drawX,drawY)
{
	
	if (!(bitDrawCir))
	{
		tX=piePoints(drawX,drawY)[0];
		tY=piePoints(drawX,drawY)[1];
		tXm=piePoints(drawX,drawY)[2];
		tYm=piePoints(drawX,drawY)[3];
		
		bitDrawCir=true;
	}
	pX=piePoints(drawX,drawY)[0];
	pY=piePoints(drawX,drawY)[1];
	pXm=piePoints(drawX,drawY)[2];
	pYm=piePoints(drawX,drawY)[3];
	

	for (var li=0; li < pieType; li++) {
    	
		context.beginPath();
		context.arc(tX[li], tY[li], Math.sqrt(((pX[li]-tX[li])**2)+ (pY[li]-tY[li])**2), 0, 2 * Math.PI, false);
		context.strokeStyle = masterina.color;
		context.stroke(); 
	    if (mirror==2){
		    context.beginPath();
		context.arc(tXm[li], tYm[li], Math.sqrt(((pXm[li]-tXm[li])**2)+ (pYm[li]-tYm[li])**2), 0, 2 * Math.PI, false);
		context.strokeStyle = masterina.color;
		context.stroke();
		}
	    } 
}

function drawPieCirTo2(drawX,drawY)
{
	for (var li=0; li < pieType; li++) {
    	
		context2.beginPath();
		context2.arc(tX[li], tY[li], Math.sqrt(((pX[li]-tX[li])**2)+ (pY[li]-tY[li])**2), 0, 2 * Math.PI, false);
		context2.strokeStyle = masterina.color;
		context2.stroke();
	    if (mirror==2){
		context2.beginPath();
		context2.arc(tXm[li], tYm[li], Math.sqrt(((pXm[li]-tXm[li])**2)+ (pYm[li]-tYm[li])**2), 0, 2 * Math.PI, false);
		context2.strokeStyle = masterina.color;
		context2.stroke();
		}
	    } 
}
//============================================================================================DRAW CIRCLES Fill==========================================================
function drawPieCirFill(drawX,drawY)
{
	if (!(bitDrawCirFill))
	{
		tX=piePoints(drawX,drawY)[0];
		tY=piePoints(drawX,drawY)[1];
		tXm=piePoints(drawX,drawY)[2];
		tYm=piePoints(drawX,drawY)[3];
		
		bitDrawCirFill=true;
	}
	pX=piePoints(drawX,drawY)[0];
	pY=piePoints(drawX,drawY)[1];
	pXm=piePoints(drawX,drawY)[2];
	pYm=piePoints(drawX,drawY)[3];

	for (var li=0; li < pieType; li++) {
    	
		context.beginPath();
		context.arc(tX[li], tY[li], Math.sqrt(((pX[li]-tX[li])**2)+ (pY[li]-tY[li])**2), 0, 2 * Math.PI, false);
		context.fillStyle = masterina.color;
		context.fill(); 
	    if (mirror==2){
		    context.beginPath();
		context.arc(tXm[li], tYm[li], Math.sqrt(((pXm[li]-tXm[li])**2)+ (pYm[li]-tYm[li])**2), 0, 2 * Math.PI, false);
		context.fillStyle = masterina.color;
		context.fill();
		}
	    } 
}

function drawPieCirFillTo2(drawX,drawY)
{
	for (var li=0; li < pieType; li++) {
    	
		context2.beginPath();
		context2.arc(tX[li], tY[li], Math.sqrt(((pX[li]-tX[li])**2)+ (pY[li]-tY[li])**2), 0, 2 * Math.PI, false);
		context2.fillStyle = masterina.color;
		context2.fill();
	    if (mirror==2){
		context2.beginPath();
		context2.arc(tXm[li], tYm[li], Math.sqrt(((pXm[li]-tXm[li])**2)+ (pYm[li]-tYm[li])**2), 0, 2 * Math.PI, false);
		context2.fillStyle = masterina.color;
		context2.fill();
		}
	    } 
}
//=============================================================================Fill Cir==============================================================
function fillCir()
{
	context2.beginPath();
	context2.lineWidth = lineThik;
	context2.arc(0, 0, masterina.radius1-lineThik/2, 0, 2 * Math.PI, false);
	context2.fillStyle = masterina.color;
	context2.fill();
	historyUndo.push(context2.getImageData(0, 0, canvas2.width,canvas2.height));
	console.log("!!!");
}
//============================================================================= Cir Line==============================================================
function CirLine()
{
	context2.beginPath();
	context2.lineWidth = lineThik;
	context2.arc(0, 0, masterina.radius1-lineThik/2, 0, 2 * Math.PI, false);
	context2.strokeStyle = masterina.color;
	context2.stroke();
	historyUndo.push(context2.getImageData(0, 0, canvas2.width,canvas2.height));
	console.log("!!!");
}
//============================================================================DRAW PIE==============================================================
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
function drawPieDots(drawX,drawY)
{

	
	   
	pointsX=piePoints(drawX,drawY)[0];
	pointsY=piePoints(drawX,drawY)[1];
	pointsXm=piePoints(drawX,drawY)[2];
	pointsYm=piePoints(drawX,drawY)[3];

 for (var iiii=0; iiii < pieType; iiii++) {
    	
		context2.beginPath();
	    context2.lineWidth = lineThik;
	    context2.moveTo(pointsX[iiii],pointsY[iiii]);
		context2.lineTo(pointsX[iiii],pointsY[iiii]);
		context2.lineCap = 'round';
	    context2.strokeStyle = masterina.color;
	    context2.stroke(); 
	    if (mirror==2){
		    context2.beginPath();
		    context2.lineWidth = lineThik;
		    context2.moveTo(pointsXm[iiii],pointsYm[iiii]);
			context2.lineTo(pointsXm[iiii],pointsYm[iiii]);
			context2.lineCap = 'round';
		    context2.strokeStyle = masterina.color;
		    context2.stroke(); 
		}
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

//====================================================================FLOODFILL=====================================================================================================
function floodFill(floodx,floody)
{
	
	var tempX=(floodx-masterina.posX),tempY=(floody-masterina.posY);
	Xco=piePoints(tempX,tempY)[0];
	Yco=piePoints(tempX,tempY)[1];
	Xmco=piePoints(tempX,tempY)[2];
	Ymco=piePoints(tempX,tempY)[3];
	var imageDataPix = context2.getImageData(floodx,floody,1,1);
	var fillColorR=hexToRgbA(masterina.color)[0],fillColorG=hexToRgbA(masterina.color)[1],fillColorB=hexToRgbA(masterina.color)[2];
	//var fillColorR=0,fillColorG=0,fillColorB=0;
	var startR=imageDataPix.data[0],startG=imageDataPix.data[1],startB=imageDataPix.data[2];
	var colorLayer=context2.getImageData(0,0,canvas2.width,canvas2.height);
	for (var uii=0; uii < pieType; uii++)
	{
			
		 	var pixelStack = [[(Xco[uii]+masterina.posX),(Yco[uii]+masterina.posY)]];
		 	
			 if  (!((startR==fillColorR)&&(startG==fillColorG)&&(startB==fillColorB)))
			 {	
				 	while(pixelStack.length)
				{
				  var drawingBoundTop=10,newPos, x, y, pixelPos, reachLeft, reachRight,canvasWidth=canvas2.width,canvasHeight=canvas2.height;
				  newPos = pixelStack.pop();
				  x = newPos[0];
				  y = newPos[1];
				  
				  pixelPos = (y*canvasWidth + x) * 4;
				  while(y-- >= drawingBoundTop && matchStartColor(pixelPos))
				  {
				    pixelPos -= canvasWidth * 4;
				  }
				  pixelPos += canvasWidth * 4;
				  ++y;
				  reachLeft = false;
				  reachRight = false;
				  while(y++ < canvasHeight-1 && matchStartColor(pixelPos))
				  {
				    colorPixel(pixelPos);

				    if(x > 0)
				    {
				      if(matchStartColor(pixelPos - 4))
				      {
				        if(!reachLeft){
				          pixelStack.push([x - 1, y]);
				          reachLeft = true;
				        }
				      }
				      else if(reachLeft)
				      {
				        reachLeft = false;
				      }
				    }
					
				    if(x < canvasWidth-1)
				    {
				      if(matchStartColor(pixelPos + 4))
				      {
				        if(!reachRight)
				        {
				          pixelStack.push([x + 1, y]);
				          reachRight = true;
				        }
				      }
				      else if(reachRight)
				      {
				        reachRight = false;
				      }
				    }
							
				    pixelPos += canvasWidth * 4;
				  }
				}
				context2.putImageData(colorLayer, 0, 0);
				  
				
			}
      }  
      if (mirror==2)
      {
      	for (var uii=0; uii < pieType; uii++)
	{
			
		 	var pixelStack = [[(Xmco[uii]+masterina.posX),(Ymco[uii]+masterina.posY)]];
		 	
			 if  (!((startR==fillColorR)&&(startG==fillColorG)&&(startB==fillColorB)))
			 {	
				 	while(pixelStack.length)
				{
				  var drawingBoundTop=10,newPos, x, y, pixelPos, reachLeft, reachRight,canvasWidth=canvas2.width,canvasHeight=canvas2.height;
				  newPos = pixelStack.pop();
				  x = newPos[0];
				  y = newPos[1];
				  
				  pixelPos = (y*canvasWidth + x) * 4;
				  while(y-- >= drawingBoundTop && matchStartColor(pixelPos))
				  {
				    pixelPos -= canvasWidth * 4;
				  }
				  pixelPos += canvasWidth * 4;
				  ++y;
				  reachLeft = false;
				  reachRight = false;
				  while(y++ < canvasHeight-1 && matchStartColor(pixelPos))
				  {
				    colorPixel(pixelPos);

				    if(x > 0)
				    {
				      if(matchStartColor(pixelPos - 4))
				      {
				        if(!reachLeft){
				          pixelStack.push([x - 1, y]);
				          reachLeft = true;
				        }
				      }
				      else if(reachLeft)
				      {
				        reachLeft = false;
				      }
				    }
					
				    if(x < canvasWidth-1)
				    {
				      if(matchStartColor(pixelPos + 4))
				      {
				        if(!reachRight)
				        {
				          pixelStack.push([x + 1, y]);
				          reachRight = true;
				        }
				      }
				      else if(reachRight)
				      {
				        reachRight = false;
				      }
				    }
							
				    pixelPos += canvasWidth * 4;
				  }
				}
				context2.putImageData(colorLayer, 0, 0);
				  
				
			}
      }  
      }  
      function matchStartColor(pixelPos)
		{
			var r = colorLayer.data[pixelPos];	
			var g = colorLayer.data[pixelPos+1];	
			var b = colorLayer.data[pixelPos+2];

		 return ((r < startR+borderColor) && (r > startR-borderColor) &&(g < startG+borderColor) && (g > startG-borderColor) &&(b < startB+borderColor) && (b > startB-borderColor) );
		}

		function colorPixel(pixelPos)
		{
			colorLayer.data[pixelPos] = fillColorR;
			colorLayer.data[pixelPos+1] = fillColorG;
			colorLayer.data[pixelPos+2] = fillColorB;
			colorLayer.data[pixelPos+3] = 255;
		}                
}
