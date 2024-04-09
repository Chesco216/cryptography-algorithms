import os
import hashlib
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP

# Generar un par de claves RSA
def generate_keypair():
    #Unica variacion
    key = RSA.generate(1024) 
    private_key = key.export_key()
    public_key = key.publickey().export_key()
    return private_key, public_key

# Encriptar un mensaje utilizando la clave pública RSA
def encrypt_message(public_key, message):
    key = RSA.import_key(public_key)
    cipher = PKCS1_OAEP.new(key)
    encrypted_message = cipher.encrypt(message)
    return encrypted_message

# Desencriptar un mensaje utilizando la clave privada RSA
def decrypt_message(private_key, encrypted_message):
    key = RSA.import_key(private_key)
    cipher = PKCS1_OAEP.new(key)
    decrypted_message = cipher.decrypt(encrypted_message)
    return decrypted_message

if __name__ == "__main__":

    private_key, public_key = generate_keypair()
    print("Clave privada RSA:", private_key)
    print("Clave pública RSA:", public_key)

    message = b"Este es un mensaje secreto sc"

    encrypted_message = encrypt_message(public_key, message)
    print("Mensaje encriptado:", encrypted_message)

    decrypted_message = decrypt_message(private_key, encrypted_message)
    print("Mensaje desencriptado:", decrypted_message.decode())
