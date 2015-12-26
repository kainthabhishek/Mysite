$(document).ready(function(){
	var board=new Array(4);
	var score= new Object();
	var moveit=["up","down","left","right"];
     score.scor=0;
	board=boardinitializer(board);
    var move= new Object();
	boardprint(board,score);
	var cp=0;
	
    function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
	$(document).keydown(function(e)
	{   if(e.which==38||e.which==39||e.which==40||e.which==37)
		{e.preventDefault();
		var key=e.which;
		if(key==38)
		moveup(board,score),$('.moveit').text("up");
	    if(key==40)
	    movedown(board,score),$('.moveit').text("down");
	    if(key==37)
	    moveleft(board,score),$('.moveit').text("left");
	    if(key==39)
	    moveright(board,score),$('.moveit').text("right");}
	    if(e.which==65)
	    {
	    
	    move=automate(board);
	    if(move.mov==1)
		moveup(board,score);
	    if(move.mov==2)
	    movedown(board,score);
	    if(move.mov==3)
	    moveleft(board,score);
	    if(move.mov==4)
	    moveright(board,score);	
	    }	
	    randomfiller(board);
        boardprint(board,score);
        $('.moveit').text(moveit[move.mov-1]);
	});
});

function boardprint(board,score)
{   
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
		{
			var pos=i*4+j+1;
			var cell=$(('.cell_'+pos).toString());
			cell.removeClass();
			cell.addClass(('c cell_'+pos+' _'+board[i][j]).toString());
            if(board[i][j])
			cell.text(board[i][j].toString());
		    else
		    cell.text("");

		}

	$('.live').text((score.scor).toString());
	return 1;	
}

function boardinitializer(board)
{   
	for(var i=0;i<4;i++)
		board[i]=new Array(4);

	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
			board[i][j]=0;
    
	randomfiller(board);	
    return board;
}
function randomfiller(board)
{
	var xs =new Array(17);
	var ys =new Array(17);
	var total=0;

	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
		{
			if(!board[i][j])
			{
				xs[total]=i;
				ys[total++]=j;
			}
		}
	if(total!=0)
	{	
	var selected =	Math.floor((Math.random() * total));
	var ran_input=[2,2,2,2,2];
    var ran_input_pos=Math.floor((Math.random() * 5));
    var filler=ran_input[ran_input_pos];

    board[xs[selected]][ys[selected]]=filler;}
}
function moveup(board,score)
{   var temp=new Array(4);
	
	for(var j=0;j<4;j++)
		{   var len=0;
			for(var i=0;i<4;i++)
		    temp[i]=0;
			for(var i=0;i<4;i++)
		       {
		       	if(board[i][j])
		       	{
		       		temp[len++]=board[i][j];
		       	}
	           }
	        for(var i=0;i<4;i++)
	        {
	        	board[i][j]=temp[i];
	        }   
        }
    for(var j=0;j<4;j++)
    {
    	for(var i=1;i<4;i++)
    	{
    		if(board[i][j]==board[i-1][j])
    		{  
    			board[i-1][j]*=2;
    			score.scor+=board[i-1][j];
    			board[i][j]=0;
    		}
    	}
    }

	for(var j=0;j<4;j++)
		{   var len=0;
            for(var i=0;i<4;i++)
		    temp[i]=0;
			for(var i=0;i<4;i++)
		       {
		       	if(board[i][j])
		       	{
		       		temp[len++]=board[i][j];
		       	}
	           }
	        for(var i=0;i<4;i++)
	        {
	        	board[i][j]=temp[i];
	        }   
        }

}
function movedown(board,score)
{   var temp=new Array(4);
	
	for(var j=0;j<4;j++)
		{   var len=0;
			for(var i=3;i>=0;i--)
		    temp[i]=0;
			for(var i=3;i>=0;i--)
		       {
		       	if(board[i][j])
		       	{
		       		temp[len++]=board[i][j];
		       	}
	           }
	        for(var i=0;i<4;i++)
	        {
	        	board[i][j]=temp[3-i];
	        }   
        }
    for(var j=0;j<4;j++)
    {
    	for(var i=2;i>=0;i--)
    	{
    		if(board[i][j]==board[i+1][j])
    		{
    			board[i+1][j]*=2;
    			score.scor+=board[i+1][j];
    			board[i][j]=0;
    		}
    	}
    }

	for(var j=0;j<4;j++)
		{   var len=0;
			for(var i=3;i>=0;i--)
		    temp[i]=0;
			for(var i=3;i>=0;i--)
		       {
		       	if(board[i][j])
		       	{
		       		temp[len++]=board[i][j];
		       	}
	           }
	        for(var i=0;i<4;i++)
	        {
	        	board[i][j]=temp[3-i];
	        }   
        }
}
function moveleft(board,score)
{   var temp=new Array(4);
	
	for(var i=0;i<4;i++)
		{   var len=0;
			for(var j=0;j<4;j++)
		    temp[j]=0;
			for(var j=0;j<4;j++)
		       {
		       	if(board[i][j])
		       	{
		       		temp[len++]=board[i][j];
		       	}
	           }
	        for(var j=0;j<4;j++)
	        {
	        	board[i][j]=temp[j];
	        }   
        }
    for(var i=0;i<4;i++)
    {
    	for(var j=1;j<4;j++)
    	{
    		if(board[i][j]==board[i][j-1])
    		{
    			board[i][j-1]*=2;
    			score.scor+=board[i][j-1];
    			board[i][j]=0;
    		}
    	}
    }

	for(var i=0;i<4;i++)
		{   var len=0;
			for(var j=0;j<4;j++)
		    temp[j]=0;
			for(var j=0;j<4;j++)
		       {
		       	if(board[i][j])
		       	{
		       		temp[len++]=board[i][j];
		       	}
	           }
	        for(var j=0;j<4;j++)
	        {
	        	board[i][j]=temp[j];
	        }   
        }
}
function moveright(board,score)
{   var temp=new Array(4);
	
	for(var i=0;i<4;i++)
		{   var len=0;
			for(var j=3;j>=0;j--)
		    temp[j]=0;
			for(var j=3;j>=0;j--)
		       {
		       	if(board[i][j])
		       	{
		       		temp[len++]=board[i][j];
		       	}
	           }
	        for(var j=3;j>=0;j--)
	        {
	        	board[i][j]=temp[3-j];
	        }   
        }
    for(var i=0;i<4;i++)
    {
    	for(var j=2;j>=0;j--)
    	{
    		if(board[i][j]==board[i][j+1])
    		{
    			board[i][j+1]*=2;
    		    score.scor+=board[i][j+1];
    			board[i][j]=0;
    		}
    	}
    }

	for(var i=0;i<4;i++)
		{   var len=0;
			for(var j=3;j>=0;j--)
		    temp[j]=0;
			for(var j=3;j>=0;j--)
		       {
		       	if(board[i][j])
		       	{
		       		temp[len++]=board[i][j];
		       	}
	           }
	        for(var j=3;j>=0;j--)
	        {
	        	board[i][j]=temp[3-j];
	        }   
        }
}