from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization
import base64
import hashlib
import os
import zipfile
import io
import secrets
import string
from flask import make_response
import pyzipper

class FileEncryptor:
    def __init__(self):
        self.supported_encryption = ['AES', 'RSA']
        self.supported_hashing = ['SHA-256', 'SHA-512']
        
    def generate_aes_key(self):
        """Generate a new AES key"""
        return Fernet.generate_key()
    
    def generate_rsa_keys(self):
        """Generate RSA key pair"""
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048
        )
        public_key = private_key.public_key()
        return private_key, public_key
    
    def encrypt_aes(self, data, key=None):
        """Encrypt data using AES (Fernet)"""
        if key is None:
            key = self.generate_aes_key()
        f = Fernet(key)
        encrypted_data = f.encrypt(data)
        return encrypted_data, key
    
    def decrypt_aes(self, encrypted_data, key):
        """Decrypt AES encrypted data"""
        f = Fernet(key)
        return f.decrypt(encrypted_data)
    
    def encrypt_rsa(self, data, public_key):
        """Encrypt data using RSA"""
        encrypted_data = public_key.encrypt(
            data,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
        return encrypted_data
    
    def decrypt_rsa(self, encrypted_data, private_key):
        """Decrypt RSA encrypted data"""
        return private_key.decrypt(
            encrypted_data,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
    
    def generate_hash(self, data, algorithm='SHA-256'):
        """Generate hash of data using specified algorithm"""
        if algorithm == 'SHA-256':
            return hashlib.sha256(data).hexdigest()
        elif algorithm == 'SHA-512':
            return hashlib.sha512(data).hexdigest()
        else:
            raise ValueError(f"Unsupported hashing algorithm: {algorithm}")
    
    def generate_zip_password(self, length=12):
        """Generate a secure random password for ZIP file"""
        alphabet = string.ascii_letters + string.digits + string.punctuation
        return ''.join(secrets.choice(alphabet) for _ in range(length))
    
    def create_encrypted_zip(self, encrypted_data, encryption_info, hash_value, include_private_key=False, zip_password=None):
        """Create a ZIP file containing encrypted data and keys, secured with a password using pyzipper (AES-256)"""
        zip_buffer = io.BytesIO()
        with pyzipper.AESZipFile(zip_buffer, 'w', compression=pyzipper.ZIP_DEFLATED, encryption=pyzipper.WZ_AES) as zip_file:
            if zip_password:
                zip_file.setpassword(zip_password.encode('utf-8'))
            # Add encrypted file
            zip_file.writestr('encrypted_file.bin', base64.b64decode(encrypted_data))
            # Add hash file
            zip_file.writestr('hash.txt', hash_value)
            # Add public key
            if encryption_info['type'] == 'RSA':
                zip_file.writestr('public_key.pem', encryption_info['public_key'])
                if include_private_key:
                    zip_file.writestr('private_key.pem', encryption_info['private_key'])
            # Add encryption info
            info = f"Encryption Type: {encryption_info['type']}\n"
            if encryption_info['type'] == 'AES':
                info += f"Key: {encryption_info['key']}\n"
            zip_file.writestr('encryption_info.txt', info)
        return zip_buffer.getvalue()
    
    def process_file(self, file_data, encryption_type='AES', hash_type='SHA-256', include_private_key=False):
        """Process file with encryption and hashing"""
        if encryption_type not in self.supported_encryption:
            raise ValueError(f"Unsupported encryption type: {encryption_type}")
        if hash_type not in self.supported_hashing:
            raise ValueError(f"Unsupported hash type: {hash_type}")
        
        # Encrypt the data
        if encryption_type == 'AES':
            encrypted_data, key = self.encrypt_aes(file_data)
            encryption_info = {
                'type': 'AES',
                'key': base64.b64encode(key).decode('utf-8')
            }
        elif encryption_type == 'RSA':
            private_key, public_key = self.generate_rsa_keys()
            encrypted_data = self.encrypt_rsa(file_data, public_key)
            encryption_info = {
                'type': 'RSA',
                'private_key': private_key.private_bytes(
                    encoding=serialization.Encoding.PEM,
                    format=serialization.PrivateFormat.PKCS8,
                    encryption_algorithm=serialization.NoEncryption()
                ).decode('utf-8'),
                'public_key': public_key.public_bytes(
                    encoding=serialization.Encoding.PEM,
                    format=serialization.PublicFormat.SubjectPublicKeyInfo
                ).decode('utf-8')
            }
        
        # Generate hash
        file_hash = self.generate_hash(encrypted_data, hash_type)
        
        # Create ZIP file
        zip_password = self.generate_zip_password() if include_private_key else None
        zip_data = self.create_encrypted_zip(
            base64.b64encode(encrypted_data).decode('utf-8'),
            encryption_info,
            file_hash,
            include_private_key,
            zip_password
        )
        
        return {
            'zip_data': base64.b64encode(zip_data).decode('utf-8'),
            'zip_password': zip_password,
            'hash': file_hash,
            'encryption_info': {
                'type': encryption_info['type']
            }
        }
    
    def decrypt_file(self, encrypted_data, encryption_info):
        """Decrypt file using provided encryption info"""
        encrypted_data = base64.b64decode(encrypted_data)
        
        if encryption_info['type'] == 'AES':
            key = base64.b64decode(encryption_info['key'])
            return self.decrypt_aes(encrypted_data, key)
        elif encryption_info['type'] == 'RSA':
            private_key = serialization.load_pem_private_key(
                encryption_info['private_key'].encode('utf-8'),
                password=None
            )
            return self.decrypt_rsa(encrypted_data, private_key)
        else:
            raise ValueError(f"Unsupported encryption type: {encryption_info['type']}")
