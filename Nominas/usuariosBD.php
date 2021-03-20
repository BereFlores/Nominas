<?php 
    include('bd.php');
    $flag=0;
       $nomina=$_POST['nomina'];
        #$sql="SELECT o.Nomina,o.Nombre,p.Nombre AS nombreplanta FROM a_operadores AS o INNER JOIN a_planta AS p ON p.Id = o.Planta where o.Nomina=".$nomina.";";
        $sql="SELECT Nomina,Nombre FROM empleados where Nomina=".$nomina.";";
        $result=$conn->query($sql);
        $json= array();

        while($row=$result->fetch_assoc()){
            $flag=1;
            $json= array(
                'Nomina' => $row['Nomina'],
                'Nombre' => $row['Nombre']
            );
        }
        if($flag==0){
            echo $flag;
        }else{
        $jsonString= json_encode($json);
        echo $jsonString;}
        mysqli_close($conn);

?>