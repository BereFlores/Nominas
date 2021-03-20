<?php $servername = "127.0.0.1";
    $username = "root";
    $password = "Z3cur1ty01";
    $dbname = "connect";
	
	$conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
?>