<?php 
    include('bd.php');
    $flag=0;
	$year=$_POST['year'];
       // $sql="SELECT * from semanasnomina ORDER BY ID DESC;";
	   $sql="SELECT * FROM semanasnomina WHERE semana LIKE '%$year%' order by ID DESC;";
	   
        $result=$conn->query($sql);
        $json= array();

        while($row=$result->fetch_assoc()){
            $flag=1;
            $json[]= array(
                'ID' => $row['ID'],
                'Semana' => $row['Semana'],
            );
        }
        if($flag==0){
            echo $flag;
        }else{
        $jsonString= json_encode($json);
        echo $jsonString;}
        mysqli_close($conn);

?>