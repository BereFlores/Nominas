<?php 
    include('bd.php');
    $nomina=$_POST['nomina'];
    $clave=$_POST['clave'];

        $sql="Insert into usuariosnomina (Nomina, Pass) Values (('$nomina'),('$clave'));";
        $result=$conn->query($sql);
        echo $result;
        mysqli_close($conn);

?>