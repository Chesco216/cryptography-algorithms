<?php
    include 'Encriptacion.php';
    $texto="";
    $encriptar="";
    $clave=$_POST['clave'];
    $claveE=Encriptacion::encryption($clave);
    $claveD=Encriptacion::decryption($claveE);

    if(isset($_POST['texto']))$encriptar=$_POST['texto'];
    if(isset($_POST['encriptar']))$encriptar=$_POST['encriptar'];
    
    if($encriptar){
        echo $claveE;
    }
    if($texto)
    {
        echo $clave;
    }
?>