<style>
    body{
        font-family: sans-serif,cursive;
        align-content: center;
        font-size: 18px;
        color: #2f2f2f;
    }
</style>
<?php
    include 'Encriptacion.php';
    $texto="";
    $encriptar="";
    $desincriptar="";
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $clave=$_POST['clave'];
        $claveE=Encriptacion::encryption($clave);
        $claveD=Encriptacion::decryption($claveE);
    }

    if(isset($_POST['texto']))$texto=$_POST['texto'];
    if(isset($_POST['encriptar']))$encriptar=$_POST['encriptar'];
    if(isset($_POST['desincriptar']))$desincriptar=$_POST['desincriptar'];

    if($encriptar){
        echo $claveE;
    }
    if($texto){
        echo $clave;
    }
    if($desincriptar){
        echo '<label>Desencriptado:  '.$claveD.'</label>';
    }
?>