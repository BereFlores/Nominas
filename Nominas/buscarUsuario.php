<?php 
    include('bd.php');
    $flag=0;
       $nomina=$_POST['nomina'];
        $sql="SELECT ID, Nomina, Pass from usuariosnomina where Nomina=".$nomina.";";
        $result=$conn->query($sql);
        $json= array();

        while($row=$result->fetch_assoc()){
            $flag=1;
            $json= array(
                'ID' => $row['ID'],
                'Nomina' => $row['Nomina'],
                'Pass' => $row['Pass']
            );
        }
        if($flag==0){
            echo $flag;
        }else{
        $jsonString= json_encode($json);
        echo $jsonString;}
        mysqli_close($conn);

?>