<?php

mysql_connect("localhost","root","") or die(mysql_error());
mysql_select_db("db_gardening") or die(mysql_error());

if(function_exists($_GET['method']))
 {
    $_GET['method']();
 }
 
 function details()
 {
	
	$garden_type=$_GET['garden_type'];
	$garden_name=$_GET['garden_name'];
	$garden_area=$_GET['garden_area'];
	$garden_creation_date=$_GET['garden_creation_date'];
	$garden_creation_month=$_GET['garden_creation_month'];
	$garden_creation_year=$_GET['garden_creation_year'];
	$id=$_GET['user_id'];
	$first=mysql_query("INSERT INTO create_garden(user_id,garden_type,garden_name,garden_area,garden_creation_date,garden_creation_month,garden_creation_year)VALUES('".$id."','".$garden_type."','".$garden_name."','".$garden_area."','".$garden_creation_date."','".$garden_creation_month."','".$garden_creation_year."')");
	 $myarray=array($first);
	 $json=json_encode($myarray);
	 echo $_GET['jsoncallback'].'('.$json.')';
}
 
?>