var fname,lname,user_email,user_id;
function register()
{
$.mobile.changePage("#page2" ,{transition: "slide"});
}

function call()
{
var x=document.getElementById("user_email").value;
var y=document.getElementById("pwd").value;
if(x=="" && y=="")
 {
    alert("Empty Id and Password");
 }
 else if(x=="")
 {
    alert("empty Id");
 }
 else if(y=="")
 {
    alert("empty password");
 }
 else
 {
    
    var url="http://localhost/appendgardening/mylogin1.php?method=details&user_email="+x+"&pwd="+y+"&jsoncallback=?";
	$.getJSON(url,function(data){
	var pwd;
	
	if(data==null)
	{
	alert("User not found");
	}
	else
	{
	for(i in data)
	{
	user_email=data[i].user_email;

    fname=data[i].fname;
	lname=data[i].lname;
	user_id=data[i].user_id;
	window.localStorage.setItem("fname_local", fname);
	window.localStorage.setItem("lname_local", lname);
	window.localStorage.setItem("email_local", user_email);
	window.localStorage.setItem("user_id_local",user_id);
	$.mobile.changePage("#page3" ,{transition: "slide"});
	$('.name').html('<b>Name:</b>'+window.localStorage.getItem("fname_local")+'&nbsp;'+window.localStorage.getItem("lname_local")+'<br/><b>UserId:</b>'+window.localStorage.getItem("email_local")+'<br/>'+window.localStorage.getItem("user_id_local")); 
	}
}
	
	
	});
 }
}

function check()
{
var x=document.getElementById("p1").value;
var y=document.getElementById("p2").value;
var t1=document.getElementById("t1").value;
var t2=document.getElementById("t2").value;
var t3=document.getElementById("t3").value;
if(t1=="" && t2==""  && t3=="")
 {
      alert("Enter FirstName,LastName and Email");

 } 
else if(t1=="" && t2=="")
 {
    alert("Enter FirstName and LastName");
 }
 else if(t1=="")
 {
  alert("Enter FirstName");
 }
 else if(t2=="")
 {
 alert("Enter LastName");
 }
 else if(t3=="")
 {
 alert("Enter EmailId");
 }
 else if(x=="")
 {
	alert("Empty Password");
 }
 else if(y=="")
 {
	alert("Enter confirm password")
 }
 else if(x!=y)
 {
	alert("Password doesnot match");
 }
 else
  {
    var url="http://localhost/appendgardening/mylogin.php?method=details&fname="+t1+"&lname="+t2+"&user_email="+t3+"&pwd="+x+"&jsoncallback=?";
   alert(url);
    $.getJSON(url,
    function(data){
		var user_id=data[0];
	   	window.localStorage.setItem("fname_local", t1);
	window.localStorage.setItem("lname_local", t2);
	window.localStorage.setItem("email_local", t3);
	window.localStorage.setItem("user_id_local",user_id);
	   $.mobile.changePage("#page3" ,{transition: "slide"});
	   $('.name').html('<b>Name:</b>'+window.localStorage.getItem("fname_local")+'&nbsp;'+window.localStorage.getItem("lname_local")+'<br/><b>UserId:</b>'+window.localStorage.getItem("email_local")+'<br/>'+user_id); 
	   
	 });
   }
  
}

function logout()
{
	   window.localStorage.clear();
       $.mobile.changePage("#page1" ,{transition: "slide"});
	   location.reload();
}
function home()
{
	$.mobile.changePage("#page3" ,{transition: "slide"});
}

function settings()
{
     $.mobile.changePage("#page5",{transition:"slide"});
}
function garden_history()
{
	$.mobile.changePage("#page8",{transition:"slide"});
}

function plant_fertility()
{
     $.mobile.changePage("#page7",{transition:"slide"});
}
function fun3()
{
     $.mobile.changePage("#page8",{transition:"slide"});
}
function fun4()
{
     $.mobile.changePage("#page9",{transition:"slide"});
}

function plantdetail()
{
$.mobile.changePage("#page10",{transition:"slide"});
}

function checkstatus()
{
	$.mobile.changePage("#page12",{transition:"slide"});
}

function condition()
{
	if(document.getElementById("radio-choice-1").checked==true)
	 {
	     	$.mobile.changePage("#page14",{transition:"slide"});
	 }
	 else if(document.getElementById("radio-choice-2").checked==true)
	 {
	 	$.mobile.changePage("#page13",{transition:"slide"});
	 }
}

function creategarden()
{
	
	$.mobile.changePage("#page15",{transition:"slide"});
}

/*function gardentype()
{
    //storing values of id in a local variable..................
    $("img.gardentype").ready(function () {
	alert(this.id);
});
	$.mobile.changePage("#page16",{transition:"slide"});
}*/

function submit_garden_detail()
{
	$.mobile.changePage("#page4",{transition:"slide"});
}

function select_plant_type()
{
	$.mobile.changePage("#page17",{transition:"slide"});
}



function generaldetails()
{
	$.mobile.changePage("#page21",{transition:"slide"});
}



