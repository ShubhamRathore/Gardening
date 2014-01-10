var garden_name,garden_name1;
var garden_type,garden_type1;
var user_id;
var garden_img_url;
$(document).ready(function(){
$(".gardentype").click(function(){
  // action goes here!!

   garden_type=this.id;
   user_id=window.localStorage.getItem("user_id_local");
  $.mobile.changePage("#page16",{transition:"slide"});
  });
});
  
  function abc()
  {
   garden_name=document.getElementById("gardenname").value;
   var garden_area=document.getElementById("gardenarea").value;
   user_id=window.localStorage.getItem("user_id_local");
   var obj=new Date();
   var garden_creation_date=obj.getDate();
   var garden_creation_month=obj.getMonth()+1;
   var garden_creation_year=obj.getFullYear();

   if(garden_name=="")
   {
	alert("Empty Garden name");
   }
   else if(garden_area=="")
   {
   alert("Empty Garden Area");
   }
   else if(garden_area=="" && garden_name=="")
   {
   alert("Enter the fields");
   }
   else
   {
   var url="http://localhost/appendgardening/creategarden.php?method=details&user_id="+user_id+"&garden_type="+garden_type+"&garden_name="+garden_name+"&garden_area="+garden_area+"&garden_creation_date="+garden_creation_date+"&garden_creation_month="+garden_creation_month+"&garden_creation_year="+garden_creation_year+"&jsoncallback=?";
   $.getJSON(url,
    function(data){
	alert("Garden Created");
	$.mobile.changePage("#page4",{transition:"slide"});
    garden_name=$("#gardenname").val("");
	garden_area=$("#gardenarea").val("");
	showgarden();
	});
	}
	 
}
   
   function mygarden()
{
     $.mobile.changePage("#page4",{transition:"slide"});
	 showgarden();
}
function showgarden()
{
	var url="http://localhost/appendgardening/showgarden.php?method=details&user_id="+user_id+"&jsoncallback=?";
	$.getJSON(url,
    function(data){
	var li='';
		for(i in data)
	{
	 garden_name=data[i].garden_name;
	 garden_type=data[i].garden_type;
	 garden_area=data[i].garden_area;
	 garden_id=data[i].garden_id;
	 garden_img_url=document.getElementById(garden_type).src;
	 

	li=li+'<li><a  id= '+garden_id+'  onclick=viewgarden(this.id);><img src= '+garden_img_url+' border="3" height="75" width="75"/><h3>'+garden_name+'</h3><p>'+garden_type+'&nbsp;&nbsp;&nbsp;&nbsp;Area:&nbsp;&nbsp;&nbsp;&nbsp;'+garden_area+'</p></a></li>';
	}
	
	 $("#content").html(li);
	 $("#content").listview("refresh");
	 });
}

function viewgarden(garden_id)
{   
	var url="http://localhost/appendgardening/showgarden.php?method=garden_details&garden_id="+garden_id+"&jsoncallback=?";
	var garden_name;
	var garden_type;
	var garden_area;
	window.localStorage.setItem("garden_id_local", garden_id);

	$.getJSON(url,
    function(data){
		for(i in data)
		{
			garden_name=data[i].garden_name;
			garden_type=data[i].garden_type;
			garden_area=data[i].garden_area;
		}
	$.mobile.changePage("#page6",{transition:"slide"});
	$(".gardentitle").html('<h4>Garden Name:<i>'+garden_name+'</i></h4><h4>Garden Type:<i>'+garden_type+'</h4><h4>Garden Area:<i>'+garden_area+'</h4></i>');
		
   });
}
function garden_detail()
{
	var url="http://localhost/appendgardening/showgarden.php?method=garden_details&garden_id="+garden_id+"&jsoncallback=?";
	var garden_creation_date;
	var garden_creation_month;
	var	garden_creation_year;
	$.getJSON(url,
    function(data){
		for(i in data)
		{
			garden_creation_date=data[i].garden_creation_date;
			garden_creation_month=data[i].garden_creation_month;
			garden_creation_year=data[i].garden_creation_year;
		}
		$.mobile.changePage("#page22",{transition:"slide"});
	$("#showdate").html('<b>'+garden_creation_date+'/'+garden_creation_month+'/'+garden_creation_year+'</b>');
	});
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function available_plant_type(plant_type)
{
    
	var url="http://localhost/appendgardening/showgarden.php?method=available_plant_type&plant_type="+plant_type+"&jsoncallback=?";
	$.getJSON(url,
    function(data){
    	$.mobile.changePage("#page18",{transition:"slide"});
    	var li='';
		for(i in data)
		{
			var plant_image_url=data[i].plant_image_url;
			var plant_name=data[i].plant_name;
			var plant_id=data[i].plant_id;
			li=li+'<li><a id='+plant_id+' onclick="user_sel_plants(this.id)"><img src="images/'+plant_image_url+'" height="75" width="75"/><h3>'+plant_name+'</h3></a></li>';
		}	
		 $("#plants").html(li);
		 $("#plants").listview("refresh");
	     
	});
}

function user_sel_plants(plant_id)
{
    
    window.localStorage.setItem("plant_id_local", plant_id);
	var url="http://localhost/appendgardening/showgarden.php?method=available_plant_details&plant_id="+plant_id+"&jsoncallback=?";
	$.getJSON(url,
    function(data){
    	$.mobile.changePage("#page23",{transition:"slide"});
    	var plant_description;
    	for(i in data)
		{
		 plant_description=data[i].plant_description;
		}	
		$("#plant_description").html(plant_description);
	});
   
}


function plant_sown()
{	
	var obj=new Date();
	var plant_sown_date=obj.getDate();
    var plant_sown_month=obj.getMonth()+1;
    var plant_sown_year=obj.getFullYear();
    plant_id=window.localStorage.getItem("plant_id_local");
    garden_id=window.localStorage.getItem("garden_id_local");
	var url="http://localhost/appendgardening/showgarden.php?method=plant_sown&plant_id="+plant_id+"&garden_id="+garden_id+"&plant_sown_date="+plant_sown_date+"&plant_sown_month="+plant_sown_month+"&plant_sown_year="+plant_sown_year+"&jsoncallback=?";
   $.getJSON(url,
    function(data)
    {
		alert("Plant Succesfully Added");
		$.mobile.changePage("#page10",{transition:"slide"});
		view_plant_sown();

	});
}

function view_plant_sown()
{
		garden_id=window.localStorage.getItem("garden_id_local");
		var url="http://localhost/appendgardening/showgarden.php?method=view_plant_sown&garden_id="+garden_id+"&jsoncallback=?";
		$.getJSON(url,
    function(data)
    { 
    	$.mobile.changePage("#page10",{transition:"slide"});
    	var li='';
        for(i in data)
		{
    	    var plant_image_url=data[i].plant_image_url;
			var plant_name=data[i].plant_name;
			var plant_id=data[i].plant_id;
		    li=li+'<li><a id='+plant_id+' onclick="fun11(this.id);"><img src="images/'+plant_image_url+'" height="75" width="75"/><h3>'+plant_name+'</h3></a></li>';
    	}
    	$("#userplants").html(li);
	    $("#userplants").listview("refresh");
    }
	);
}
function fun11(user_plant_id)
{
	window.localStorage.setItem("user_plant_id_local", user_plant_id);
	var user_plant_id=window.localStorage.getItem("user_plant_id_local");

	var url="http://localhost/appendgardening/showgarden.php?method=selected_plant_detail&user_plant_id="+user_plant_id+"&jsoncallback=?";
		$.getJSON(url,
    function(data)
    { 
    	$.mobile.changePage("#page11",{transition:"slide"});
    	var p='';
        for(i in data)
		{
    	    var plant_image_url=data[i].plant_image_url;
			var plant_name=data[i].plant_name;
			var plant_sown_date=data[i].plant_sown_date;
			var plant_sown_month=data[i].plant_sown_month;
			var plant_sown_year=data[i].plant_sown_year;
			var plant_description=data[i].plant_description;
			var plant_type=data[i].plant_type;
			$("#user_plant_id").html('<img src="images/'+plant_image_url+'"height="75" width="75"><br/><b>'+plant_name+'<br/>'+plant_type+'</b><br/>Plant Sown Date:'+plant_sown_date+'/'+plant_sown_month+'/'+plant_sown_year+'<br/>Basic Details:'+plant_description);

		}
    	
    }
	);
}

function basic_detail()
{
	var user_plant_id=window.localStorage.getItem("user_plant_id_local");

	var url="http://localhost/appendgardening/showgarden.php?method=selected_plant_detail&user_plant_id="+user_plant_id+"&jsoncallback=?";
		$.getJSON(url,
    function(data)
    { 
    	$.mobile.changePage("#page24",{transition:"slide"});
    	var p='';
        for(i in data)
		{
    	    var plant_image_url=data[i].plant_image_url;
			var plant_name=data[i].plant_name;
			
			var plant_description=data[i].plant_description;
			$("#basic_detail").html('<img src="images/'+plant_image_url+'"height="75" width="75"><br/><b>'+plant_name+'<br/></b><br/><br/>Basic Details:'+plant_description);

		}
    	
    }
	);	
	
}

function pest_acc_plant()
{
	
	var plant_id=window.localStorage.getItem("user_plant_id_local");
	var url="http://localhost/appendgardening/showgarden.php?method=show_pest_plant_wise&plant_id="+plant_id+"&jsoncallback=?";
		$.getJSON(url,
    function(data)
    { 
    	$.mobile.changePage("#page25",{transition:"slide"});
    	var li='';
        for(i in data)
		{
    	    var pest_image_url=data[i].pest_image_url;
			var pest_common_name=data[i].pest_common_name;
			var pest_id=data[i].pest_id;
			li=li+'<li><a id='+pest_id+' onclick="selected_pest_detail(this.id)"><img src="images/pest_images/'+pest_image_url+'.jpg" height="75" width="75"/><h3>'+pest_common_name+'</h3></a></li>';
		}
		$("#show_pest_plant_wise").html(li);
	    $("#show_pest_plant_wise").listview("refresh");
    	
    }
	);	
}

function selected_pest_detail(pest_id)
{
		
	var garden_id=window.localStorage.getItem("garden_id_local");
	var plant_id=window.localStorage.getItem("user_plant_id_local");
	var url="http://localhost/appendgardening/showgarden.php?method=show_pest_detail&pest_id="+pest_id+"&jsoncallback=?";
		$.getJSON(url,
    function(data)
    { 	$.mobile.changePage("#page27",{transition:"slide"});
    	var p='';
        for(i in data)
		{
    	    var pest_image_url=data[i].pest_image_url;
			var pest_common_name=data[i].pest_common_name;
			var pest_species=data[i].pest_species;
			var pest_description=data[i].pest_description;
			var pest_scientific_name=data[i].pest_scientific_name;
			var pest_family=data[i].pest_family;
			var pest_prevention_method=data[i].pest_prevention_method;
			p=p+'<p><img src="images/pest_images/'+pest_image_url+'.jpg" height="100" width="125"><br/>Common Name:<b><i>'+pest_common_name+'</i></b><br/>Scientific Name:<b><i>'+pest_scientific_name+'</i></b><br/>Pest Family:<b><i>'+pest_family+'</i></b><br/>Pest Species:<b><i>'+pest_species+'</i></b><br/>Pest Description:'+pest_description+'<br/>Pest Prevention:'+pest_prevention_method+'<br/><input type="button" data-theme="a" value="Insert Pest" onclick="insert_pest('+pest_id+','+garden_id+','+plant_id+')"></p>';
			
		}
		$("#selected_pest_detail").html(p);
	   
    	
    }
	);	

}

function insert_pest(pest_id,garden_id,plant_id)
{	
	var url="http://localhost/appendgardening/showgarden.php?method=insert_pest&pest_id="+pest_id+"&garden_id="+garden_id+"&plant_id="+plant_id+"&jsoncallback=?";
   $.getJSON(url,
    function(data)
    {	var already_added=data[0];
    	if(already_added==null)
    	{
    		alert("Pest Already Added");
    	}
    	else
    	{
		alert("Pest Succesfully Added");
		$.mobile.changePage("#page26",{transition:"slide"});
		list_added_pest();
		}	
		
	});	
}
//independent function list added pest on page 26//////////////////////

function list_added_pest()
{

	var garden_id=window.localStorage.getItem("garden_id_local");
	var plant_id=window.localStorage.getItem("user_plant_id_local");
	
	var url="http://localhost/appendgardening/showgarden.php?method=list_added_pest&plant_id="+plant_id+"&garden_id="+garden_id+"&jsoncallback=?";
		$.getJSON(url,
    function(data)
    { 
    	
    	var li='';
        for(i in data)
		{
    	    var pest_image_url=data[i].pest_image_url;
			var pest_common_name=data[i].pest_common_name;
			var pest_id=data[i].pest_id;
			li=li+'<li><a id='+pest_id+' onclick="selected_pest_detail(this.id)"><img src="images/pest_images/'+pest_image_url+'.jpg" height="75" width="75"/><h3>'+pest_common_name+'</h3></a></li>';
		}
		$("#list_added_pest").html(li);
	    $("#list_added_pest").listview("refresh");
    	
    }
	);	
}

///////////////////////////////////////////

function user_added_pest()
{
	$.mobile.changePage("#page26",{transition:"slide"});
	list_added_pest();
}
