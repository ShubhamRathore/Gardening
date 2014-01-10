<?php

mysql_connect("localhost","root","") or die(mysql_error());
mysql_select_db("db_gardening") or die(mysql_error());

if(function_exists($_GET['method']))
 {
    $_GET['method']();
 }
 
 function details()
 {
	$user_email=$_GET['user_email'];
	$pwd=$_GET['pwd'];
	$naya=mysql_query("SELECT * FROM user_registration where user_email='".$user_email."' AND pwd='".$pwd."'");
	$i=0;
	$myarray=array();
	$myarray=null;
	while($row=mysql_fetch_assoc($naya))
	 {
	 
	 $myarray[$i]=$row;
	 $i=$i+1;
	//echo $row['fname'] . " " . $row['lame'] . " ".$row['pwd'];
	 
	 }
	 $json=json_encode($myarray);
	echo $_GET['jsoncallback'].'('.$json.')';
}
 
?>