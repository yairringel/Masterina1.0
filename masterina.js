

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
	    context.arc(xx, yy, lineWidth, 0, 2 * Math.PI, false);
		context.fillStyle = '#000000';
	    context.fill();  
	}

	function drawCir2(xx,yy)
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
	    context2.lineWidth = lineWidth;
	    context2.moveTo(lastXX,lastYY);
		context2.lineTo(xx,yy);
		context2.lineCap = 'round';
	    context2.strokeStyle = '#000000';
	    context2.stroke();  
	    lastXX=xx;
	    lastYY=yy;
	    
	}