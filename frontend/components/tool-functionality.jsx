'use client';
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Download } from "lucide-react"

export function ToolFunctionality({ tool }) {
  // Funkcjonalność narzędzia szyfrowania
  const [selectedFile, setSelectedFile] = useState(null)
  const [encryptionType, setEncryptionType] = useState("AES")
  const [hashType, setHashType] = useState("SHA-256")
  const [includePrivateKey, setIncludePrivateKey] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState(null)
  const [passwordExpiry, setPasswordExpiry] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!selectedFile) return
    setLoading(true)
    setPassword(null)
    setPasswordExpiry(null)
    setError(null)
    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("encryption_type", encryptionType)
    formData.append("hash_type", hashType)
    formData.append("include_private_key", includePrivateKey.toString())
    try {
      console.log("Wysyłam żądanie do /api/encrypt")
      const response = await fetch("http://127.0.0.1:5000/api/encrypt", {
        method: "POST",
        body: formData,
      })
      let encryptionId = null
      console.log("Odpowiedź z /api/encrypt, status:", response.status)
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || "Encryption failed")
      }
      if (includePrivateKey) {
        encryptionId = response.headers.get('X-Encryption-ID')
        if (!encryptionId) {
          encryptionId = response.headers.get('x-encryption-id')
        }
        console.log("encryptionId z nagłówka:", encryptionId)
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `encrypted_files_${new Date().toISOString().slice(0, 19).replace(/[:]/g, "")}.zip`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      if (includePrivateKey && encryptionId) {
        console.log("Pobieram hasło z /api/get-password/" + encryptionId)
        const passResp = await fetch(`http://127.0.0.1:5000/api/get-password/${encryptionId}`)
        console.log("Odpowiedź z /api/get-password, status:", passResp.status)
        if (passResp.ok) {
          const passData = await passResp.json()
          console.log("passData:", passData)
          setPassword(passData.password)
          setPasswordExpiry(new Date(Date.now() + 60000))
        } else {
          setError("Błąd pobierania hasła z backendu.")
        }
      }
    } catch (error) {
      setError(error.message)
      console.log("Błąd:", error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let timer
    if (passwordExpiry) {
      timer = setInterval(() => {
        if (new Date() >= passwordExpiry) {
          setPassword(null)
          setPasswordExpiry(null)
          clearInterval(timer)
        }
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [passwordExpiry])

  // Renderuj tylko dla narzędzia encrypt-integrity
  if (tool.slug !== "encrypt-integrity") {
    return (
      <div className="mb-12">
        <div className="bg-[#0f1130]/80 backdrop-blur-md border border-purple-500/20 rounded-lg p-8 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
          <h2 className="text-2xl font-semibold mb-6 text-cyan-100 flex items-center">
            <span className="mr-2 text-purple-400 opacity-70">&gt;</span> UŻYJ NARZĘDZIA
          </h2>
          <div className="space-y-6">
            <div className="bg-[#0a0b1e] border border-blue-500/20 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
              <div className="text-center text-blue-200/60">
                <p className="mb-2">Tutaj będzie zaimplementowana funkcjonalność narzędzia</p>
                <p className="text-sm">(Miejsce na backend i interfejs użytkownika)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Funkcjonalność Encrypt & Check Integrity
  return (
    <div className="mb-12">
      <div className="bg-[#0f1130]/80 backdrop-blur-md border border-purple-500/20 rounded-lg p-8 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
        <h2 className="text-2xl font-semibold mb-6 text-cyan-100 flex items-center">
          <span className="mr-2 text-purple-400 opacity-70">&gt;</span> UŻYJ NARZĘDZIA
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="file">Wybierz plik</Label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="encryption">Typ szyfrowania</Label>
            <Select value={encryptionType} onValueChange={setEncryptionType}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz typ szyfrowania" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AES">AES</SelectItem>
                <SelectItem value="RSA">RSA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hash">Typ haszowania</Label>
            <Select value={hashType} onValueChange={setHashType}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz typ haszowania" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SHA-256">SHA-256</SelectItem>
                <SelectItem value="SHA-512">SHA-512</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {encryptionType === "RSA" && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-private-key"
                  checked={includePrivateKey}
                  onCheckedChange={setIncludePrivateKey}
                />
                <Label htmlFor="include-private-key">
                  Dołącz klucz prywatny do ZIP (będzie zabezpieczony hasłem)
                </Label>
              </div>
              {includePrivateKey && (
                <p className="text-sm text-yellow-600">
                  ⚠️ ZIP będzie zabezpieczony hasłem. Zapisz hasło – nie będzie możliwości jego odzyskania!
                </p>
              )}
            </div>
          )}
          <Button type="submit" disabled={!selectedFile || loading}>
            {loading ? "Przetwarzanie..." : <><Download className="mr-2 h-4 w-4" /> Szyfruj & pobierz ZIP</>}
          </Button>
        </form>
        {password && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <h3 className="text-lg font-semibold text-yellow-800">Hasło do ZIP</h3>
            <p className="text-yellow-700">
              <span className="font-mono">{password}</span>
            </p>
            {passwordExpiry && (
              <p className="text-sm text-yellow-600 mt-2">
                ⚠️ Zapisz to hasło – nie będzie możliwości jego odzyskania!<br />
                Hasło wygaśnie za {Math.max(0, Math.ceil((passwordExpiry - new Date()) / 1000))} sekund
              </p>
            )}
          </div>
        )}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
