<?php

mysql_connect("localhost","root","") or die(mysql_error());
mysql_select_db("db_gardening") or die(mysql_error());

if(function_exists($_GET['method']))
 {
    $_GET['method']();
 }
 

function details()
 {
  $f_name = $_GET['fname'];
  $l_name = $_GET['lname'];
  $email = $_GET['user_email'];
  $password = $_GET['pwd'];
  $result = mysql_query("SELECT * FROM  user_registration WHERE  `user_email` ='$email'");
    if(mysql_num_rows($result)!='0')
      {
      $user_id=null;
   }
   else
   {
    $result1 = mysql_query("INSERT INTO  user_registration(fname,lname,user_email,pwd)VALUES('".$f_name."','".$l_name."','".$email."','".$password."')");
    $user_id= mysql_insert_id();
    }
$data = array($user_id);
$input = json_encode($data);
echo $_GET ['jsoncallback'] . '(' . $input .')';
 }

 
?>