# Vehicle Rental Management System (Express + PostgreSQL)

**Live URL:** https://vehicle-rental-system-mauve.vercel.app

---

## 🚀 Features

### 🔹 Vehicle Management

- Add, update, and delete vehicles
- Manage daily rental price

### 🔹 Customer Management

- Create and manage customer accounts
- Secure login and authentication

### 🔹 Booking Management

- Create bookings with start and end dates
- Prevent double-booking
- Automatically calculate rental cost
- Cancel booking (only before start date)

### 🔹 Authentication & Authorization

- JWT-based authentication
- Password hashing using bcrypt
- Role-based access for Admins and Customers

---

## 🛠️ Technology Stack

- **Node.js + TypeScript**
- **Express.js**
- **PostgreSQL**
- **bcrypt**
- **jsonwebtoken (JWT)**

---

# 📘 How to Set Up the Project Locally

Follow these steps to run the project on your local machine.

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/neamatullah01/vehicle-rent-backend-with-express-postgres.git
```

```bash
cd <your-project-folder>
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Create a .env File

```bash
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<dbname>
JWT_SECRET=your_jwt_secret

```

## 4️⃣ Start the Development Server

```bash
npm run dev

```

The API will run at:

```bash
http://localhost:5000

```
