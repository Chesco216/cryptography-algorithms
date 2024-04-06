def KSA(key):
    key_length = len(key)
    S = list(range(256))
    j = 0
    for i in range(256):
        j = (j + S[i] + key[i % key_length]) % 256
        S[i], S[j] = S[j], S[i]
    return S

def PRGA(S):
    i = 0
    j = 0
    while True:
        i = (i + 1) % 256
        j = (j + S[i]) % 256
        S[i], S[j] = S[j], S[i]
        K = S[(S[i] + S[j]) % 256]
        yield K

def RC4(key):
    S = KSA(key)
    return PRGA(S)

def encrypt(message, key):
    keystream = RC4(key)
    encrypted = []
    for char in message:
        encrypted.append(ord(char) ^ next(keystream))
    return bytes(encrypted)

def decrypt(ciphertext, key):
    keystream = RC4(key)
    decrypted = []
    for char in ciphertext:
        decrypted.append(chr(char ^ next(keystream)))
    return ''.join(decrypted)

key = b'ClaveSecreta'
message = "Hola, este es un mensaje secreto."
encrypted_message = encrypt(message, key)
print("Mensaje cifrado:", encrypted_message)

decrypted_message = decrypt(encrypted_message, key)
print("Mensaje descifrado:", decrypted_message)
