import secrets

 # Se genera una clave aleatoria del mismo tamaño que el mensaje
def generate_key(message_length):
    return bytes([secrets.randbits(8) for _ in range(message_length)])

# Se realiza la operación XOR entre cada byte del mensaje y la clave
def encrypt(message, key):
    encrypted_message = bytes([message[i] ^ key[i] for i in range(len(message))])
    return encrypted_message

# La operación XOR entre el mensaje cifrado y la clave restaura el mensaje original
def decrypt(ciphertext, key):
    decrypted_message = bytes([ciphertext[i] ^ key[i] for i in range(len(ciphertext))])
    return decrypted_message

message = b"Este es un mensaje secreto por el algoritmo de vernan."
key = generate_key(len(message))

encrypted_message = encrypt(message, key)
print("Mensaje cifrado:", encrypted_message)

decrypted_message = decrypt(encrypted_message, key)
print("Mensaje descifrado:", decrypted_message)
