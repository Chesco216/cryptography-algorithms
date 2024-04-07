document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('rsa-form');
    const resultsDiv = document.getElementById('results');
    const publicKeyPara = document.getElementById('public-key');
    const privateKeyPara = document.getElementById('private-key');
    const messageInput = document.getElementById('message');
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const encryptedMessagePara = document.getElementById('encrypted-message');
    const decryptedMessagePara = document.getElementById('decrypted-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const p = parseInt(document.getElementById('p').value);
        const q = parseInt(document.getElementById('q').value);
        const e = parseInt(document.getElementById('e').value);

        if (!isPrime(p) || !isPrime(q)) {
            alert("Los números ingresados no son primos. Por favor, asegúrate de ingresar primos.");
            return;
        }

        const keys = generarClaves(p, q, e);
        const publicKey = keys[0];
        const privateKey = keys[1];

        publicKeyPara.textContent = `Clave pública: (${publicKey[0]}, ${publicKey[1]})`;
        privateKeyPara.textContent = `Clave privada: (${privateKey[0]}, ${privateKey[1]})`;

        resultsDiv.style.display = 'block';
    });

    encryptBtn.addEventListener('click', function () {
        const message = parseInt(messageInput.value);
        const publicKeyText = publicKeyPara.textContent;
        const n = parseInt(publicKeyText.match(/\((\d+),/)[1]);
        const e = parseInt(publicKeyText.match(/, (\d+)\)/)[1]);
        const encryptedMessage = cifrar(message, [n, e]);

        encryptedMessagePara.textContent = `Mensaje cifrado: ${encryptedMessage}`;
    });

    decryptBtn.addEventListener('click', function () {
        const encryptedMessage = parseInt(encryptedMessagePara.textContent.split(':')[1].trim());
        const privateKeyText = privateKeyPara.textContent;
        const n = parseInt(privateKeyText.match(/\((\d+),/)[1]);
        const d = parseInt(privateKeyText.match(/, (\d+)\)/)[1]);
        const decryptedMessage = descifrar(encryptedMessage, [n, d]);

        decryptedMessagePara.textContent = `Mensaje descifrado: ${decryptedMessage}`;
    });

    function isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        let i = 5;
        while (i * i <= num) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
            i += 6;
        }
        return true;
    }

    function generarClaves(p, q, e) {
        const n = p * q;
        const phi = (p - 1) * (q - 1);
        const d = modInverse(e, phi);
        return [[n, e], [n, d]];
    }

    function cifrar(mensaje, clave_publica) {
        const [n, e] = clave_publica;
        return modPow(mensaje, e, n);
    }

    function descifrar(mensaje_cifrado, clave_privada) {
        const [n, d] = clave_privada;
        return modPow(mensaje_cifrado, d, n);
    }

    function modPow(base, exponent, modulus) {
        if (modulus === 1) return 0;
        let result = 1;
        base = base % modulus;
        while (exponent > 0) {
            if (exponent % 2 === 1) {
                result = (result * base) % modulus;
            }
            exponent = exponent >> 1;
            base = (base * base) % modulus;
        }
        return result;
    }

    function modInverse(a, m) {
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        return 1;
    }
});
