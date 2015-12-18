$(document).ready(function(){
	var current=0;
	var selected=0;
	if(selected==0)
	{
		$(".computer").on('click',function(){
			fillboard();
			selected=1;
			$(".initial_warn").text(" ");
		});
    
	
		$(".user").on('click',function(){
			selected=1;
			$(".initial_warn").text(" ");
		});

    }
	
		$("td").on('click',function(){
    	if($(this).find('i').hasClass('fa fa-circle-thin zero')==false&& $(this).find('i').hasClass('fa fa-close cross')==false&&current!=1&&selected==1)
    	{
    		$(this).find('i').removeClass('fa fa-circle-thin zerosub');
    		$(this).find('i').addClass('fa fa-circle-thin zero');
    		current=fillboard();
	}
	});
	$("td").hover(
		function(){
			if($(this).find('i').hasClass('fa fa-circle-thin zero')==false && $(this).find('i').hasClass('fa fa-close cross')==false&&current!=1&&selected==1)
				$(this).find('i').addClass('fa fa-circle-thin zerosub');
		},function(){
			if($(this).find('i').hasClass('fa fa-circle-thin zero')==false && $(this).find('i').hasClass('fa fa-close cross')==false&&current!=1&&selected==1)
				$(this).find('i').removeClass('fa fa-circle-thin zerosub');
		});

});