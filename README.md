# 🔐 User Authentication Microservice – Cloud Computing Assignment

A microservice-based authentication system developed using **Node.js**, **Docker**, **GitHub Actions**, and deployed to **AWS ECS (Fargate)** with strong **DevOps**, **DevSecOps**, and **cloud-native** practices.

---

## 🎯 Project Objective

To design and deploy a secure and scalable **User Authentication Microservice** using modern DevOps methodologies, cloud infrastructure, and container-based development, aimed at production-ready deployment with automation, monitoring, and security in mind.

---

## 🗂 Project Structure

```bash
.
├── .github/workflows/        # GitHub Actions CI/CD workflows
│   └── deploy.yml
├── auth-service/             # Main authentication microservice codebase
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── Dockerfile
├── docker-compose.yml        # Local development setup
├── architecture-diagram.png  # High-level deployment diagram
└── README.md                 # Project documentation
```

---

## 🧰 Tech Stack
| 🔹 Layer            | 🔧 Tools / Services                              |
| -------------------- | ------------------------------------------------- |
| **Backend**          | Node.js, Express.js                               |
| **Database**         | MongoDB (via Atlas or Docker)                     |
| **Containerization** | Docker, Docker Compose                            |
| **CI/CD**            | GitHub Actions                                    |
| **Cloud**            | AWS ECS (Fargate), ECR, API Gateway               |
| **Security**         | JWT, GitHub Secrets, IAM Roles, SonarCloud        |

---

## 🔒 Security Measures

- **Static Analysis (SAST):**  
  Integrated with **SonarCloud** to scan code for vulnerabilities before deployment.

- **Token-Based Authentication:**  
  Uses **access tokens** (short-lived) and **refresh tokens** (longer-lived) for secure session management.

- **Password Hashing:**  
  User passwords are securely hashed using **bcrypt** before storing in MongoDB.

- **Role-Based Routes:**  
  Middleware enforces access control by checking user roles (e.g., admin, user).

- **Input Validations:**  
  - Enforced **complex password rules**.  
  - Validates **email formats** before processing requests.

---

## 💻 Running Locally
✅ Prerequisites
 - Node.js
 - Docker & Docker Compose
 - MongoDB (either locally or via MongoDB Atlas)
 - .env file inside the /auth-service director

## 📦 How to Run

1. **Clone the repository**  
   ```bash
   git clone https://github.com/it21110016/User-Authentication-
   ```

2. **Navigate to the project directory**  
   ```bash
   cd your-repo-name
   ```

3. **Install dependencies**  
   ```bash
   npm install
   ```

4. **Set up environment variables**  
   Create a `.env` file and add required configurations.

5. **Run the development server**  
   ```bash
   npm run dev
   ```

6. **Dockerize and deploy using AWS ECS**  
   Follow the `Dockerfile` and `GitHub Actions` workflows for CI/CD pipeline.
   
---

## 👥 Collaborators

- **IT21110016 - Kushan H.G.P.S**  
- **IT21815096 - Kanchana M.M.K**  
- **IT21801136 - Herath H.M.B.G.J**  
- **IT21389856 - Prathviharan K**
