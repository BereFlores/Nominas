<?php
/*$file ="ejemplo.pdf"; 
$filename = "descargado.pdf"; // el nombre con el que se descargará, puede ser diferente al original 
header("Content-type: application/octet-stream"); 
header("Content-Type: application/force-download"); 
header("Content-Disposition: attachment; filename=\"$filename\"\n"); readfile($file); */
$semana=$_GET["Semana"];
$nomina=$_GET["Nomina"];
$nombre=$_GET["Nombre"];
$semana=$_GET["week"];
$year=$_GET["year"];
$curp=$_GET["CURP"];
header("Content-type: application/pdf");
header("Content-Disposition: inline; filename=documento.pdf");

$file_pointer="C:/Connect/Nominas/$year/$semana/0$nomina-$nombre.pdf";
if (file_exists($file_pointer)) {
	readfile($file_pointer);
            echo "The file $file_pointer exists";
        }
?>