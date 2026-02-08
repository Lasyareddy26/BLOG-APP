# ✍️ Blog Platform

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.JS](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Status](https://img.shields.io/badge/status-active-success.svg)

A robust full-stack blogging application featuring **Role-Based Access Control (RBAC)**. This platform is designed to handle different permission levels for Authors and Users, ensuring secure content management and a seamless reading experience.

---

## 🔐 Role-Based Access Control (RBAC)
The core of this application is its security layer. Access to specific API endpoints and UI elements is restricted based on the user's assigned role.



| Feature | **Author** | **User (Reader)** |
|:---|:---:|:---:|
| Read & Browse Blogs | ✅ | ✅ |
| Create New Blog Posts | ✅ | ❌ |
| Edit/Update Own Posts | ✅ | ❌ |
| Delete Own Posts | ✅ | ❌ |
| Access Author Dashboard | ✅ | ❌ |
| Comment & Engage | ✅ | ✅ |

---

## 🚀 Key Features
* **Secure Authentication**: Implemented JWT (JSON Web Tokens) for session management and Bcrypt for password hashing.
* **Author Dashboard**: A private workspace for creators to manage their posts, view engagement, and perform CRUD operations.
* **Protected Routing**: Frontend (React Router) and Backend middleware ensure that even if a user knows a URL, they cannot access unauthorized data.
* **MERN Architecture**: Scalable architecture using MongoDB for flexible data modeling and Express/Node for a performant backend.

---

## 🛠️ Tech Stack
* **Frontend**: React.js, Context API/Redux, Axios, CSS3/Bootstrap.
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB (Mongoose ODM).
* **Security**: JWT, Middleware-based Authorization, Bcrypt.

---

## 📂 Project Structure
```text
├── backend
│   ├── models        # MongoDB User and Blog schemas
│   ├── routes        # Auth & Blog API endpoints
│   ├── middleware    # Auth & Role-check (isAdmin/isAuthor) middleware
│   └── server.js     # Entry point
├── frontend
│   ├── src
│   │   ├── components # Navbar, BlogCard, Footer
│   │   ├── pages      # Home, AuthorDashboard, Login, Register
│   │   └── context    # Auth state management
│   └── App.js        # Main routing with ProtectedRoutes
```
---

## ⚙️ Setup & Installation

Follow the steps below to run the project locally.

### 📌 Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (local instance or MongoDB Atlas)
- **Git**

---

### 🧩 Clone the Repository
```bash
git clone https://github.com/your-username/blog-platform.git
cd blog-platform
```
### 🔧 Backend Setup
```bash
cd backend
npm install

```
### 🔧 Set env variables
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```

### 🎨 Frontend Setup 
```bash
cd frontend
npm install
npm start


```
