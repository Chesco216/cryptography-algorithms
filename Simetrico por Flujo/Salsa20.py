from Crypto.Cipher import Salsa20
from Crypto.Random import get_random_bytes

def encrypt(message, key):
    cipher = Salsa20.new(key=key)
    nonce = get_random_bytes(8) 
    ciphertext = nonce + cipher.encrypt(message)
    return ciphertext

def decrypt(ciphertext, key):
    nonce = ciphertext[:8]  
    cipher = Salsa20.new(key=key, nonce=nonce)
    decrypted_message = cipher.decrypt(ciphertext[8:])
    return decrypted_message


key = get_random_bytes(32)  
message = b"Este es un mensaje secreto."

encrypted_message = encrypt(message, key)
print("Mensaje cifrado:", encrypted_message)

decrypted_message = decrypt(encrypted_message, key)
print("Mensaje descifrado:", decrypted_message)
