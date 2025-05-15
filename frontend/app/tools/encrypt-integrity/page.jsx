'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function EncryptIntegrityPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [encryptionType, setEncryptionType] = useState('AES');
  const [hashType, setHashType] = useState('SHA-256');
  const [includePrivateKey, setIncludePrivateKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [encryptionId, setEncryptionId] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordExpiry, setPasswordExpiry] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    setPassword(null);
    setEncryptionId(null);
    setPasswordExpiry(null);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('encryption_type', encryptionType);
    formData.append('hash_type', hashType);
    formData.append('include_private_key', includePrivateKey.toString());

    try {
      const response = await fetch('http://127.0.0.1:5000/api/encrypt', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Encryption failed');
      }

      // Get the ZIP file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `encrypted_files_${new Date().toISOString().slice(0,19).replace(/[:]/g, '')}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // If private key is included, get the password
      if (includePrivateKey) {
        const encryptionId = response.headers.get('X-Encryption-ID');
        if (encryptionId) {
          setEncryptionId(encryptionId);
          await fetchPassword(encryptionId);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during encryption');
    } finally {
      setLoading(false);
    }
  };

  const fetchPassword = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/get-password/${id}`);
      if (!response.ok) {
        throw new Error('Failed to get password');
      }
      const data = await response.json();
      setPassword(data.password);
      setPasswordExpiry(new Date(Date.now() + 60000)); // 1 minute from now
    } catch (error) {
      console.error('Error fetching password:', error);
    }
  };

  useEffect(() => {
    let timer;
    if (passwordExpiry) {
      timer = setInterval(() => {
        if (new Date() >= passwordExpiry) {
          setPassword(null);
          setPasswordExpiry(null);
          clearInterval(timer);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [passwordExpiry]);

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>File Encryption & Integrity</CardTitle>
          <CardDescription>
            Upload a file to encrypt and generate its hash
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="encryption">Encryption Type</Label>
              <Select value={encryptionType} onValueChange={setEncryptionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select encryption type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AES">AES</SelectItem>
                  <SelectItem value="RSA">RSA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hash">Hash Type</Label>
              <Select value={hashType} onValueChange={setHashType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hash type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SHA-256">SHA-256</SelectItem>
                  <SelectItem value="SHA-512">SHA-512</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {encryptionType === 'RSA' && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-private-key"
                    checked={includePrivateKey}
                    onCheckedChange={setIncludePrivateKey}
                  />
                  <Label htmlFor="include-private-key">
                    Include private key in ZIP (will be password protected)
                  </Label>
                </div>
                {includePrivateKey && (
                  <p className="text-sm text-yellow-600">
                    ⚠️ The ZIP file will be password protected. Make sure to save the password - it cannot be recovered later!
                  </p>
                )}
              </div>
            )}

            <Button type="submit" disabled={!selectedFile || loading}>
              {loading ? 'Processing...' : 'Encrypt & Hash'}
            </Button>
          </form>

          {password && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h3 className="text-lg font-semibold text-yellow-800">ZIP Password</h3>
              <p className="text-yellow-700">
                Password: <span className="font-mono">{password}</span>
              </p>
              <p className="text-sm text-yellow-600 mt-2">
                ⚠️ Save this password now - it will be shown only once and cannot be recovered!
              </p>
              <p className="text-sm text-yellow-600">
                This password will expire in {Math.ceil((passwordExpiry - new Date()) / 1000)} seconds
              </p>
            </div>
          )}

          {/* Error messages */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 