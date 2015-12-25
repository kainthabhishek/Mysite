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
	move=automatehelper(boardcpy,depth);
	//alert(move.mov);
	return move;	
}

function automatehelper(board,depth)
{   //alert(depth);
	var move=new Object();
	if(depth==3)
    { move2=new Object();
    	move2.score=0;
    	move2.mov=1;
		return move2;
	}
	var temp1=0,temp2,temp3,temp4;
	var boardcpy=new Array(4);
    for(var p=0;p<4;p++)
    	boardcpy[p]=new Array(4);

    var temptys1=9000;
    for(var p=0;p<4;p++)
		for(var q=0;q<4;q++)
			boardcpy[p][q]=board[p][q];
	temp1=moveup_(boardcpy,0);
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
		if(!boardcpy[i][j])
		{
			boardcpy[i][j]=2;
			var move2=new Object();
			 move2=automatehelper(boardcpy,depth+1);
			var min_sol=move2.score;
			if(temptys1>=min_sol)
			{
				temptys1=min_sol;
			}
			boardcpy[i][j]=0;
		}
    for(var p=0;p<4;p++)
		for(var q=0;q<4;q++)
			boardcpy[p][q]=board[p][q];
            //alert(boardcpy[0][0]+" "+boardcpy[0][1]+" "+boardcpy[0][2]+" "+boardcpy[0][3]+" "+boardcpy[1][0]+" "+boardcpy[1][1]+" "+boardcpy[1][2]+" "+boardcpy[1][3]+" "+boardcpy[2][0]+" "+boardcpy[2][1]+" "+boardcpy[2][2]+" "+boardcpy[2][3]+" "+boardcpy[3][0]+" "+boardcpy[3][1]+" "+boardcpy[3][2]+" "+boardcpy[3][3]);

    var temptys2=9000;
	temp2=movedown_(boardcpy,0);

	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
		if(!boardcpy[i][j])
		{
			boardcpy[i][j]=2;
            var move2=new Object();
			 move2=automatehelper(boardcpy,depth+1);
			var min_sol=move2.score;
			if(temptys2>=min_sol)
			{
				temptys2=min_sol;
			}
			boardcpy[i][j]=0;
		}

	for(var p=0;p<4;p++)
		for(var q=0;q<4;q++)
			boardcpy[p][q]=board[p][q];
    var temptys3=9000;
	temp3=moveleft_(boardcpy,0);

	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
		if(!boardcpy[i][j])
		{
			boardcpy[i][j]=2;
			var move2=new Object();
			 move2=automatehelper(boardcpy,depth+1);
			var min_sol=move2.score;
			if(temptys3>=min_sol)
			{
				temptys3=min_sol;
			}
			boardcpy[i][j]=0;
		}

	 for(var p=0;p<4;p++)
		for(var q=0;q<4;q++)
			boardcpy[p][q]=board[p][q];
    var temptys4=9000;
	temp4=moveright_(boardcpy,0);

	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
		if(!boardcpy[i][j])
		{
			boardcpy[i][j]=2;
			var move2=new Object();
			 move2=automatehelper(boardcpy,depth+1);
			var min_sol=move2.score;
			if(temptys4>=min_sol)
			{
				temptys4=min_sol;
			}
			boardcpy[i][j]=0;
		}
	move.score=0;
	if(temptys1>=9000)temptys1=0;
	if(temptys2>=9000)temptys2=0;
	if(temptys3>=9000)temptys3=0;
	if(temptys4>=9000)temptys4=0;
	temptys1+=temp1;
	temptys2+=temp2;
	temptys3+=temp3;
	temptys4+=temp4;
	
	{
	  if(temp1&&move.score<=temptys1)	
	  { 
	  	move.score=temptys1;
	  	move.mov=1;
	  }
	  if(temp2&&move.score<=temptys2)	
	  { 
	  	move.score=temptys2;
	  	move.mov=2;
	  }
	  if(temp3&&move.score<=temptys3)	
	  { 
	  	move.score=temptys3;
	  	move.mov=3;
	  }
	  if(temp4&&move.score<=temptys4)	
	  { 
	  	move.score=temptys4;
	  	move.mov=4;
	  }
	}
	/*else
	{
		move.score=Math.max(Math.max(temptys1,temptys2),Math.max(temptys3,temptys4));
	}*/		
    //if(depth==0)alert(temptys1+" "+temptys2+" "+temptys3+" "+temptys4)
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