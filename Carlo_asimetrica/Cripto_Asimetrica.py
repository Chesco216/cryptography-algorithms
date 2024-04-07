# Se debe tener intalado py.Cryptodome
# Con el comando pip install pycryptodome

from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import binascii
from Crypto.Random import get_random_bytes

# se debe tener conocimiento del algoritmo RSA

# Generación de llaves
private_key = RSA.generate(1024)
public_key = private_key.publickey()

# Conversión de llaves a formato DER y luego a hexadecimal
private_key_der = private_key.export_key(format='DER')
public_key_der = public_key.export_key(format='DER')

private_key_hex = binascii.hexlify(private_key_der).decode('utf8')
public_key_hex = binascii.hexlify(public_key_der).decode('utf8')

print("Public Key:", public_key_hex)
print("Private Key:", private_key_hex)

# Proceso inverso
private_key = RSA.import_key(binascii.unhexlify(private_key_hex))
public_key = RSA.import_key(binascii.unhexlify(public_key_hex))

message = 'Criptografía Asimétrica Ingeniería de Sistemas'
message = message.encode()

# Cifrado del mensaje
cipher = PKCS1_OAEP.new(public_key)
encrypted_message = cipher.encrypt(message)

print("Encrypted Message:", encrypted_message)

# Descifrado del mensaje (para completar el flujo de ejemplo)
decryptor = PKCS1_OAEP.new(private_key)
decrypted_message = decryptor.decrypt(encrypted_message)

print("Decrypted Message:", decrypted_message.decode())


