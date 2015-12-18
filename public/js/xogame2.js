function end(board)
{   
	if(board[0][0]==board[1][1]&&board[1][1]==board[2][2]&&board[0][0]!=0)return board[0][0];
    if(board[1][0]==board[1][1]&&board[1][1]==board[1][2]&&board[1][0]!=0)return board[1][0];
    if(board[2][0]==board[2][1]&&board[2][1]==board[2][2]&&board[2][0]!=0)return board[2][0];
    if(board[0][0]==board[0][1]&&board[0][1]==board[0][2]&&board[0][0]!=0)return board[0][0];
	if(board[2][0]==board[1][1]&&board[1][1]==board[0][2]&&board[2][0]!=0)return board[2][0];
    if(board[0][1]==board[1][1]&&board[1][1]==board[2][1]&&board[0][1]!=0)return board[0][1];
    if(board[0][2]==board[1][2]&&board[1][2]==board[2][2]&&board[0][2]!=0)return board[0][2];
    if(board[0][0]==board[1][0]&&board[1][0]==board[2][0]&&board[0][0]!=0)return board[0][0];
    var draw_check=0;
    for(var i=0;i<3;i++)
		    for(var j=0;j<3;j++)
		    	if(!board[i][j])
		    		draw_check=1;
    return draw_check==0?-1:0;
}

function movefinder(board_cpy,move_no)
{   
	var end_decision=end(board_cpy);
	if(end_decision==-1)
	{
		var temp=new Object();
		temp.x=-1;
		temp.y=-1;
		temp.depth=move_no;
		temp.score=5;
		return temp;
	}
	else if(end_decision==1)
	{
		var temp=new Object();
		temp.x=-1;
		temp.y=-1;
	    temp.depth=move_no;
		temp.score=-10;
		return temp;
	}
	else if(end_decision==2)
	{
		var temp=new Object();
		temp.x=-1;
		temp.y=-1;
		temp.depth=move_no;
		temp.score=10;
		return temp;
	}
	var curr_move= new Object();
	curr_move.x=-1;
	curr_move.y=-1;
	curr_move.depth=100;
	curr_move.score=-100;
	if((move_no&1)==0)
	{   
		for(var i=0;i<3;i++)
		    for(var j=0;j<3;j++)
		    {
		    	if(!board_cpy[i][j])
		    	{
		    		var board_cpy2=new Array(3);
		    		board_cpy2[0]=new Array(3);
		    		board_cpy2[1]=new Array(3);
		    		board_cpy2[2]=new Array(3);
		    		for(var k=0;k<3;k++)
		            for(var l=0;l<3;l++)
		            board_cpy2[k][l]=board_cpy[k][l];
		            board_cpy2[i][j]=2;
		            var temp2;
		            temp2=movefinder(board_cpy2,move_no+1);
		            if(temp2.score>curr_move.score||((temp2.score==curr_move.score)&&temp2.depth<curr_move.depth))
		            {
		            	curr_move.x=i;
		            	curr_move.y=j;
		            	curr_move.depth=temp2.depth;
		            	curr_move.score=temp2.score;
		            }
		    	}
	        }
    }
    if((move_no&1)!=0)
	{   
		curr_move.score=100;
		for(var i=0;i<3;i++)
		    for(var j=0;j<3;j++)
		    {
		    	if(!board_cpy[i][j])
		    	{
		    		var board_cpy2=new Array(3);
		    		board_cpy2[0]=new Array(3);
		    		board_cpy2[1]=new Array(3);
		    		board_cpy2[2]=new Array(3);
		    		for(var k=0;k<3;k++)
		            for(var l=0;l<3;l++)
		            board_cpy2[k][l]=board_cpy[k][l];
		            board_cpy2[i][j]=1;
		            var temp2;
		            temp2=movefinder(board_cpy2,move_no+1);
		            if((temp2.score<curr_move.score)||((temp2.score==curr_move.score)&&temp2.depth<curr_move.depth))
		            {
		            	curr_move.x=i;
		            	curr_move.y=j;
		                curr_move.depth=temp2.depth;
		            	curr_move.score=temp2.score;
		            }
		    	}
	        }
    }
    return curr_move;
}
function next_move(board)
{
	var board_cpy=new Array(3);
    board_cpy[0]=new Array(3);
    board_cpy[1]=new Array(3);
    board_cpy[2]=new Array(3);

	for(var i=0;i<3;i++)
		for(var j=0;j<3;j++)
			board_cpy[i][j]=board[i][j];

	return movefinder(board_cpy,0);	
}
function boardfiller(board)
{  
	for(var i=0;i<3;i++)
		for(var j=0;j<3;j++)
		{
			var cellnos=3*i+j+1;
			var classname=("#cell_"+cellnos).toString();
            var check_for_zero;
            var check_for_cross;
            check_for_zero=$(classname).hasClass('fa fa-circle-thin zero');
            check_for_cross=$(classname).hasClass('fa fa-close cross');
            if(check_for_zero==false&&check_for_cross==false)
            {
            	board[i][j]=0;
            }
            if(check_for_cross==true)
            {
            	board[i][j]=2;
            }
            if(check_for_zero==true)
            {
            	board[i][j]=1;
            }
		}
	return board	

}
function fillboard()
{
	var board= new Array(3);
	for(var i=0;i<3;i++)
	{
		board[i]=new Array(3);
	}
   // alert(move.x+" "+move.y);
   board=boardfiller(board);
   var move=next_move(board);
   var  f_res=0;
   
    for(var i=0;i<3;i++)
		for(var j=0;j<3;j++)
		{var cellnos=3*i+j+1;
			if(i==move.x&&j==move.y)
				$("#cell_"+cellnos).addClass('fa fa-close cross');
		}	
	
	board=boardfiller(board);
    move=next_move(board);
	
		var winner=end(board);
		var res;
		if(winner!=0)
		{
			if(winner==-1)res="*** draw :D ***";
			else if(winner==1)res="*** you won :/ ***";
			else res="*** i won :P ***";
			$('.result').text(res);
			f_res=1;
	    }
	
	return f_res;
}

