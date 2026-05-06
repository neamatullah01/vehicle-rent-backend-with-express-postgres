# 🚗 Vehicle Rental Management System

> A full-stack REST API for managing vehicle rentals — supporting bookings, customer accounts, vehicle inventory, and role-based access control.

---

## 🧩 Problem Statement

Managing vehicle rentals manually is error-prone and inefficient. Businesses need a reliable system to track vehicle availability, prevent double-bookings, manage customers, and enforce secure access — all in one place.

---

## 💡 Solution Overview

This backend system provides a complete RESTful API for a vehicle rental business. It handles vehicle inventory, customer registration, booking lifecycle (create → cancel), and authentication — with automatic rental cost calculation and double-booking prevention built in.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express.js |
| Database | PostgreSQL |
| Auth | JWT (jsonwebtoken) |
| Security | bcrypt (password hashing) |

---

## ✨ Key Features

**Vehicle Management**
- Add, update, and delete vehicles
- Manage daily rental pricing per vehicle

**Customer Management**
- Create and manage customer accounts
- Secure login and session handling

**Booking Management**
- Create bookings with start and end dates
- Prevent double-booking conflicts automatically
- Auto-calculate total rental cost based on duration
- Cancel bookings (only permitted before the start date)

**Authentication & Authorization**
- JWT-based stateless authentication
- Password hashing with bcrypt
- Role-based access control for Admins and Customers

---

## 📸 Screenshots / GIFs

> _Add screenshots or demo GIFs of your API responses, Postman collections, or a frontend client here._

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/neamatullah01/vehicle-rent-backend-with-express-postgres.git
cd vehicle-rent-backend-with-express-postgres
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root (see [Environment Variables](#-environment-variables) below).

### 4. Start the Development Server

```bash
npm run dev
```

The API will be available at:

```
http://localhost:5000
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
PORT=5000
CONNECTION_STR=postgresql://<user>:<password>@<host>:<port>/<dbname>
JWT_SECRET=your_jwt_secret
```

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on |
| `CONNECTION_STR` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens |

---

## 🏗️ API & Architecture

The API follows a RESTful design with three core resource groups:

```
/auth          → Register, login
/vehicles      → CRUD for vehicle inventory
/customers     → Customer account management
/bookings      → Create, view, and cancel bookings
```

**Request flow:**

```
Client → JWT Middleware → Role Check → Controller → PostgreSQL
```

All protected routes require a valid `Authorization: Bearer <token>` header. Admin-only routes are restricted via role-based middleware.

---

## 🌐 Live Demo

**Live URL:** [https://vehicle-rental-system-mauve.vercel.app](https://vehicle-rental-system-mauve.vercel.app)


```
Admin Email:    admin@example.com
Admin Password: ************
```
