<?php

mysql_connect("localhost","root","") or die(mysql_error());
mysql_select_db("db_gardening") or die(mysql_error());

if(function_exists($_GET['method']))
 {
    $_GET['method']();
 }
 
 function details()
 {
	$user_id=$_GET['user_id'];
	$query1=mysql_query("SELECT * FROM create_garden where user_id='".$user_id."'");
	$i=0;
	$myarray=array();
	$myarray=null;
	while($row=mysql_fetch_assoc($query1))
	 {
	 
	 $myarray[$i]=$row;
	 $i=$i+1;
	
	 }
	 $json=json_encode($myarray);
	echo $_GET['jsoncallback'].'('.$json.')';
}
 function garden_details()
 {
     $garden_id=$_GET['garden_id'];
	 $query2=mysql_query("SELECT * from create_garden where garden_id='".$garden_id."'");
	 $i=0;
	 $myarray=array();
	$myarray=null;
	while($row=mysql_fetch_assoc($query2))
	 {
	 
	 $myarray[$i]=$row;
	 $i=$i+1;
	
	 }
	 $json=json_encode($myarray);
	echo $_GET['jsoncallback'].'('.$json.')';
 }

 function available_plant_type()
 {
 	$plant_type=$_GET['plant_type'];
 	$query=mysql_query("SELECT * from list_plant_type where plant_type='".$plant_type."'");
 	$i=0;
 	$myarray=null;
 	while($row=mysql_fetch_assoc($query))
 	{
 		$myarray[$i]=$row;
	    $i=$i+1;
 	}
 	$json=json_encode($myarray);
	echo $_GET['jsoncallback'].'('.$json.')';

 }

 function available_plant_details()
 {
 	$plant_id=$_GET['plant_id'];
 	$query=mysql_query("SELECT * from list_plant_type where plant_id='".$plant_id."'");
 	$i=0;
 	$myarray=null;
 	while($row=mysql_fetch_assoc($query))
 	{
 		$myarray[$i]=$row;
	    $i=$i+1;
 	}
 	$json=json_encode($myarray);
	echo $_GET['jsoncallback'].'('.$json.')';

 }

 function plant_sown()
 {
 	$plant_id=$_GET['plant_id'];
 	$garden_id=$_GET['garden_id'];
 	$plant_sown_date=$_GET['plant_sown_date'];
 	$plant_sown_month=$_GET['plant_sown_month'];
 	$plant_sown_year=$_GET['plant_sown_year'];
 	$query=mysql_query("INSERT INTO user_selected_plants(plant_id,garden_id,plant_sown_date,plant_sown_month,plant_sown_year) VALUES('".$plant_id."','".$garden_id."','".$plant_sown_date."','".$plant_sown_month."','".$plant_sown_year."')");
 	$myarray=array($query);
	$json=json_encode($myarray);
	echo $_GET['jsoncallback'].'('.$json.')';

 }

 function view_plant_sown()
 {
 	$garden_id=$_GET['garden_id'];
 	$query=mysql_query("SELECT * from user_selected_plants INNER JOIN list_plant_type ON user_selected_plants.plant_id=list_plant_type.plant_id where garden_id='".$garden_id."'");
 	$i=0;
 	$myarray=null;
 	while($row=mysql_fetch_assoc($query))
 	{
 		$myarray[$i]=$row;
	    $i=$i+1;
 	}
 	$json=json_encode($myarray);
	echo $_GET['jsoncallback'].'('.$json.')';
 }

 function selected_plant_detail()
 {
 	$user_plant_id=$_GET['user_plant_id'];
 	$query=mysql_query("SELECT * from user_selected_plants INNER JOIN list_plant_type ON user_selected_plants.plant_id=list_plant_type.plant_id where user_selected_plants.plant_id='".$user_plant_id."'");
 	$i=0;
 	$myarray=null;
 	while($row=mysql_fetch_assoc($query))
 	{
 		$myarray[$i]=$row;
	    $i=$i+1;
 	}
 	$json=json_encode($myarray);
	echo $_GET['jsoncallback'].'('.$json.')';
 }
 function show_pest_plant_wise()
 {
 	$plant_id=$_GET['plant_id'];
 	$query=mysql_query("SELECT * from possible_pest_available where plant_id='".$plant_id."'");
 	$i=0;
 	$myarray=null;
 	while($row=mysql_fetch_assoc($query))
 	{
 		$myarray[$i]=$row;
	    $i=$i+1;
 	}
 	$json=json_encode($myarray);
	echo $_GET['jsoncallback'].'('.$json.')';
 }
 function show_pest_detail()
 {
 	$pest_id=$_GET['pest_id'];
 	$query=mysql_query("SELECT * from possible_pest_available where pest_id='".$pest_id."'");
 	$i=0;
 	$myarray=null;
 	while($row=mysql_fetch_assoc($query))
 	{
 		$myarray[$i]=$row;
	    $i=$i+1;
 	}
 	$json=json_encode($myarray);
	echo $_GET['jsoncallback'].'('.$json.')';	
 }
  function insert_pest()
 {
 	$pest_id=$_GET['pest_id'];
 	$plant_id=$_GET['plant_id'];
 	$garden_id=$_GET['garden_id'];
 	$alerady_added;
    $result = mysql_query("SELECT * FROM user_added_pest WHERE pest_id ='$pest_id' and plant_id='$plant_id' and garden_id='$garden_id'");
    if(mysql_num_rows($result)!='0')
      {
      $already_added=null;
   		}
   else
   {
    $query=mysql_query("INSERT INTO user_added_pest(pest_id,garden_id,plant_id) VALUES ('".$pest_id."','".$garden_id."','".$plant_id."')");
    $already_added= mysql_insert_id();
    }
  $data = array($already_added);
  $input = json_encode($data);
  echo $_GET ['jsoncallback'] . '(' . $input .')';
}


 function list_added_pest()
 {
 	$plant_id=$_GET['plant_id'];
 	$garden_id=$_GET['garden_id'];
 	$query=mysql_query("SELECT * from user_added_pest INNER JOIN possible_pest_available on user_added_pest.pest_id=possible_pest_available.pest_id where user_added_pest.plant_id='".$plant_id."' AND user_added_pest.garden_id='".$garden_id."' ");
 	$i=0;
 	$myarray=null;
 	while($row=mysql_fetch_assoc($query))
 	{
 		$myarray[$i]=$row;
	    $i=$i+1;
 	}
 	$json=json_encode($myarray);
	echo $_GET['jsoncallback'].'('.$json.')';
 }
?>
