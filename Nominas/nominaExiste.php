<?php 
    include('bd.php');
    $flag=0;
       $nomina=$_POST['nomina'];
        $sql="SELECT Nomina FROM empleados where Nomina=".$nomina.";";
        $result=$conn->query($sql);
        $json= array();

        while($row=$result->fetch_assoc()){
            $flag=1;
        }

        echo $flag;
        mysqli_close($conn);

?>