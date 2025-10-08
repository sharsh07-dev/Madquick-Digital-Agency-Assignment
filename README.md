# Madquick Digital Agency - Full-Stack Assignment

## Project: Secure Vault Vault

### 🔗 [Live Demo](madquick-digital-agency-assignment-p438-cfbjpcpmf.vercel.app)

---

### Introduction

This project is a full-stack personal password manager application, built from the ground up as a technical assignment for Madquick Digital Agency. It provides a secure, modern, and user-friendly interface for users to register, log in, and manage their sensitive credentials. The entire application is built with a focus on security, performance, and modern development practices.

### Core Features

* **Secure User Authentication:** Complete user registration and login system powered by **NextAuth.js**, using a credentials-based provider and session management.
* **Full CRUD Functionality:** Logged-in users have full Create, Read, Update, and Delete capabilities for their saved credentials.
* **Password Encryption:** All user passwords (for both their account and their saved credentials) are securely hashed using **bcrypt** before being stored in the database.
* **Protected API Routes:** The backend API is protected, ensuring that users can only access and modify their own data.
* **Client-Side Tools:** Includes a robust, client-side password generator to help users create strong, unique passwords.
* **Modern UI/UX:** A clean, responsive interface built with **Tailwind CSS**, featuring:
    * Client-side navigation with Next.js App Router for a fast, seamless experience.
    * Dynamic UI that updates in real-time without needing a page refresh (e.g., after deleting a credential).
    * Clear user feedback for loading states and form submissions.

### Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Authentication:** NextAuth.js (Auth.js v5)
* **Database:** MongoDB Atlas
* **ODM:** Mongoose
* **Styling:** Tailwind CSS
* **Deployment:** Vercel

### How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/secure-vault.git](https://github.com/your-username/secure-vault.git)
    cd secure-vault
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of the project and add the following variables:
    ```
    MONGODB_URI="your_mongodb_connection_string"
    AUTH_SECRET="your_secret_key_for_nextauth"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

---
Created by **Harsh Shinde**


