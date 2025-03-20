# Book Store E-Commerce Web App

This is a full-stack e-commerce web application for a bookstore where users can browse books, filter them by category, price, or rating, add books to the cart, and complete their purchases. Admins have the ability to manage users, products, and orders.

## Project Structure

The project consists of two main folders:
- **frontend** - Contains the frontend of the application.
- **backend** - Contains the backend of the application.

## Installation and Setup

### 1. Clone the Repository
```sh
git clone https://github.com/ishanprd/book-store.git
cd book-store
```

### 2. Install Dependencies
Navigate to both the frontend and backend folders separately and install the required dependencies.
```sh
cd backend
npm i

cd frontend
npm i
```

### 3. Run the Backend Server
To start the backend server, navigate to the backend folder and use nodemon:
```sh
cd backend
nodemon server.js
```

### 4. Run the Frontend
To start the frontend application, navigate to the frontend folder and run:
```sh
cd frontend
npm run dev
```

## Features

### User Features
- Browse books
- Filter books by category, price, or rating
- View book details
- Rate books and leave reviews
- Add books to the cart
- Purchase books

### Admin Features
- Manage products (CRUD operations: Create, Read, Update, Delete)
- Manage users
- View and process orders
- Update order status (e.g., Shipped, Delivered)


