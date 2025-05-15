from flask import Flask, request, jsonify, send_file, make_response
from flask_cors import CORS
from FileEncryptorModule import FileEncryptor
import base64
import io
from datetime import datetime, timedelta
import os
import mimetypes
import threading
import time

app = Flask(__name__)
CORS(app, expose_headers=["X-Encryption-ID"])

# Configuration
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_MIME_TYPES = {
    'text/plain',
    'text/csv',
    'application/json',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png',
    'image/gif'
}

encryptor = FileEncryptor()

# Store temporary data with expiration
password_store = {}
zip_store = {}

def cleanup_expired_data():
    """Cleanup expired passwords and ZIP files"""
    while True:
        current_time = datetime.now()
        # Cleanup passwords
        expired_passwords = [
            key for key, data in password_store.items()
            if current_time > data['expires']
        ]
        for key in expired_passwords:
            del password_store[key]
        
        # Cleanup ZIP files
        expired_zips = [
            key for key, data in zip_store.items()
            if current_time > data['expires']
        ]
        for key in expired_zips:
            del zip_store[key]
        
        time.sleep(60)  # Check every minute

# Start cleanup thread
cleanup_thread = threading.Thread(target=cleanup_expired_data, daemon=True)
cleanup_thread.start()

@app.route('/')
def index():
    return jsonify({
        'message': 'File Encryption API is running',
        'endpoints': {
            '/api/encrypt': 'POST - Encrypt a file',
            '/api/decrypt': 'POST - Decrypt a file'
        }
    })

@app.route('/api/encrypt', methods=['POST'])
def encrypt_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    # Check file size
    file.seek(0, os.SEEK_END)
    file_size = file.tell()
    file.seek(0)
    
    if file_size > MAX_FILE_SIZE:
        return jsonify({'error': f'File too large. Maximum size is {MAX_FILE_SIZE/1024/1024}MB'}), 400
    
    # Check MIME type
    mime_type = mimetypes.guess_type(file.filename)[0]
    if mime_type not in ALLOWED_MIME_TYPES:
        return jsonify({'error': 'File type not allowed'}), 400
    
    encryption_type = request.form.get('encryption_type', 'AES')
    hash_type = request.form.get('hash_type', 'SHA-256')
    include_private_key = request.form.get('include_private_key', 'false').lower() == 'true'
    
    try:
        file_data = file.read()
        result = encryptor.process_file(file_data, encryption_type, hash_type, include_private_key)
        
        # Create a unique ID for this encryption
        encryption_id = base64.b64encode(os.urandom(16)).decode('utf-8')
        
        # Store the ZIP data
        zip_store[encryption_id] = {
            'data': result['zip_data'],
            'expires': datetime.now() + timedelta(minutes=10)  # ZIP expires after 10 minutes
        }
        
        # Prepare response
        zip_buffer = io.BytesIO(base64.b64decode(result['zip_data']))
        zip_buffer.seek(0)
        response = make_response(
            send_file(
                zip_buffer,
                mimetype='application/zip',
                as_attachment=True,
                download_name=f'encrypted_files_{datetime.now().strftime("%Y%m%d_%H%M%S")}.zip'
            )
        )
        
        # Store the password if it exists and set header
        if result.get('zip_password'):
            password_store[encryption_id] = {
                'password': result['zip_password'],
                'expires': datetime.now() + timedelta(minutes=1)
            }
            response.headers['X-Encryption-ID'] = encryption_id
        
        return response
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/get-password/<encryption_id>', methods=['GET'])
def get_password(encryption_id):
    if encryption_id not in password_store:
        return jsonify({'error': 'Invalid or expired encryption ID'}), 404
    
    password_data = password_store[encryption_id]
    if datetime.now() > password_data['expires']:
        del password_store[encryption_id]
        return jsonify({'error': 'Password has expired'}), 410
    
    # Remove password after first use
    password = password_data['password']
    del password_store[encryption_id]
    
    return jsonify({'password': password})

@app.route('/api/decrypt', methods=['POST'])
def decrypt_file():
    if not request.json:
        return jsonify({'error': 'No data provided'}), 400
    
    try:
        encrypted_data = request.json.get('encrypted_data')
        encryption_info = request.json.get('encryption_info')
        
        if not encrypted_data or not encryption_info:
            return jsonify({'error': 'Missing required data'}), 400
        
        decrypted_data = encryptor.decrypt_file(encrypted_data, encryption_info)
        return jsonify({
            'decrypted_data': base64.b64encode(decrypted_data).decode('utf-8')
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 