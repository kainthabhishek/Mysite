function automate(board)
{
	var boardcpy=new Array(4);
	for(var i=0;i<4;i++)
		boardcpy[i]=new Array(4);
    
    for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
			boardcpy[i][j]=board[i][j];
    var depth=0;
    var move=new Object();
	move=automatehelper(boardcpy,depth,0);
	//alert(move.mov);
	return move;	
}
function score_counter(board)
{
	var score=0,x=0,y=0;
	
    score=0;
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
			{if(board[i][j]==0)
				score+=100;
			else
				score+=board[i][j]*board[i][j];
			if(i+1<4&&board[i][j]==board[i+1][j])
				score+=board[i][j]*board[i][j];
			if(j+1<4&&board[i][j]==board[i][j+1])
				score+=board[i][j]*board[i][j];
		}

	return score;		
}
function set_to(board1,board2)
{
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
			board1[i][j]=board2[i][j];
}
function move_possi(board)
{   var score=score_counter(board);
	var mater=0;
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
			{
				if(i+1<4&&board[i][j]==board[i+1][j])
					mater++;
				if(i+1<4&&board[i][j]==board[i][j+1])
					mater++;
			}
	if(mater||score)			
    return 1;
    else return 0;
}
function emptycount(board)
{
	var mater=0;
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
			if(!board[i][j])
				mater++;
	return mater;		
}
function makemove(board,move)
{   var score=1;
	if(move==1)
		 score=moveup_(board,0);
	if(move==2)
		 score=movedown_(board,0);
	if(move==3)
		 score=moveleft_(board,0);
	if(move==4)
		 score=moveright_(board,0);
	return score;
}
function compareboard(board1,board2)
{
	var mater=0;
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
			if(board1[i][j]!=board2[i][j])
				mater++;
	if(mater)return 1;
	return 0;
}
function automatehelper(board,depth,move)
{   
	move=new Object();
	move.mov=0;
	score=score_counter(board);
	move.score=score;	
	if(depth==6)
		return move;
    
    var boardcpy=new Array(4);
    for(var i=0;i<4;i++)
    	boardcpy[i]=new Array(4);

    var maxval=0,val=0;
    for(var i=1;i<=4;i++)
    {   
    	set_to(boardcpy,board);
    	makemove(boardcpy,i);
    	var tscore=compareboard(boardcpy,board);
    	if(tscore)
    	{

        randomfiller(boardcpy);
    	val=automatehelper(boardcpy,depth+1,i).score;
    	if(move.score<=val)
    	{
    		move.score=val;
    		move.mov=i;

    	}
    }
    }
    move.score+=score;			
    return move;
}

function moveup_(board,score)
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
    			score+=board[i-1][j];
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
        return score;     
   
}
function movedown_(board,score)
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
    			score+=board[i+1][j];
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
        return score;         
}
function moveleft_(board,score)
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
    			score+=board[i][j-1];
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
        return score;     
}
function moveright_(board,score)
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
    		    score+=board[i][j+1];
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
    return score;     
}