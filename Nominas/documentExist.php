<?php 
    $flag=0;
       $nomina=$_POST['nomina'];
       $nombre=$_POST['nombre'];
       $semana=$_POST['semana'];
       $year=$_POST['year'];
       $week=$_POST['week'];
       $file_pointer="C:/Connect/Nominas/$year/$week/0$nomina-$nombre.pdf";
       if (file_exists($file_pointer)) {
           //readfile($file_pointer);
                    $flag=1;
                   echo $flag;
               }else{
                   echo $flag;
               }
?>