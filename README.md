# CyberSecTools

**CyberSecTools** is a modern, open-source suite of cybersecurity tools for encryption, integrity verification, and more. The project is designed as a modular, microservice-based platform with a React frontend and Python backend, ready for cloud deployment and future expansion.

---

## ✨ Features (Planned & In Progress)

- **File Encryption & Integrity**  
  Encrypt files (AES, RSA), generate and verify checksums (SHA-256, SHA-512), manage keys, and download password-protected ZIP archives.

- **Hash & Compare**  
  Generate hash values (MD5, SHA-1, SHA-256, SHA-512) for files and text, compare hashes, and verify file integrity. *(in progress)*

- **Port Scanner**  
  Scan network ports to identify open services and potential vulnerabilities. *(planned)*

- **Classic Encryption**  
  Implement traditional ciphers (Caesar, Vigenère, substitution, transposition) for educational and demo purposes. *(planned)*

- **Brute-force ZIP**  
  Attempt password recovery for protected ZIP archives using brute-force and dictionary attacks. *(planned)*

- **HTTP Header Analyzer**  
  Analyze HTTP headers for security issues and misconfigurations. *(planned)*

- **Password Generator & Evaluation**  
  Generate strong passwords and evaluate password strength. *(planned)*

- **Tool Logs**  
  View logs and activity history from all security tools. *(planned)*

---

## 🏗️ Architecture & Technologies

- **Frontend:**  
  - React (UI with tiles/buttons)
  - TailwindCSS (styling)
  - Axios (API communication)

- **Backend (Microservices):**  
  - Python (each tool as a separate Flask or FastAPI app)
  - Docker (each microservice in its own container)

- **Infrastructure:**  
  - Terraform (provisioning EC2, VPC, RDS, S3, etc.)
  - AWS:  
    - EC2 (app hosting)
    - ECS/EKS (production container orchestration)
    - S3 (logs, file storage)
    - CloudWatch (logging)
    - IAM Roles (security)

- **CI/CD:**  
  - GitHub Actions or GitLab CI:  
    - Automated tests
    - Docker image build
    - Deployment to AWS
---

## 🚀 Getting Started

### Backend (Python Flask)

1. Go to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install required libraries:
   ```bash
   pip install flask flask-cors cryptography pyzipper
   ```
3. Start the server:
   ```bash
   py app.py
   ```
   The server will be available at `http://127.0.0.1:5000`

### Frontend (Next.js)

1. Go to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

---

## 🗺️ Planned Roadmap

- [ ] Each backend tool will be a separate microservice (Flask/FastAPI) in its own Docker container
- [ ] Full Docker Compose setup for local development
- [ ] Terraform scripts for AWS infrastructure provisioning
- [ ] CI/CD pipeline (GitHub Actions/GitLab CI) for automated testing, building, and deployment
- [ ] More tools and integrations coming soon!

---

## 📦 Example Usage (Encrypt & Check Integrity)

1. Go to the “Encrypt and check integrity” tool in the app.
2. Select a file, encryption type (e.g., RSA), and hash type (e.g., SHA-256).
3. (Optional) Check “Include private key in ZIP” – the ZIP will be password-protected.
4. Click “Encrypt & Download ZIP”.
5. Download the ZIP file and save the displayed password (visible for 60 seconds).

---

## 📝 Documentation

- Detailed code documentation is in progress.

---

## 📢 License

📢 License  
This project is licensed under the [MIT License](LICENSE).

---

**Status:** Project in progress – more tools coming soon!
