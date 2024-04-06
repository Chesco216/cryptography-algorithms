<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Encryption | Decryption</title>
    </head>
    <link rel="stylesheet" href="">
    <body style="text-align: center">
        <div class="card">
            <h1>Cifrado Simétrico</h1>
            <form method="post" action="contrasena.php" target="ventana" class="box">
                <label>Por favor, ingresa el texto a encriptar/desencriptar</label>
                <br><br><br>
                <input type="file" name="clave" value="">
                <input type="submit" class="btnText" name="texto">
                <br>
                <iframe name="ventana" src="contrasena.php" class="ventana">
                </iframe>
                <link rel="stylesheet" href="assets/css/login.css">
                <br>
                <input type="submit" class="btnE" name="encriptar" value="Encriptar">
                <input type="submit" class="btnD" name="desincriptar" value="Desencriptar">
            </form>
        </div>
    </body>
</html>