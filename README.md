
## 📚 Book Manager App

A modern **Book Management System** built with **React.js**, **Redux Toolkit**, and **Firebase**. The app supports authentication, CRUD operations for books, real-time updates, and a clean responsive UI with Bootstrap and Font Awesome integration.

### 🔗 Live Demo

👉 [Book Manager Live App](https://crud-d749b.web.app/#)

---

### 🚀 Features

* 🔐 **User Authentication** (Firebase Auth)
* 📚 **Add, Edit, Delete, View Books**
* 🔎 **Search and Filter Books**
* 🌙 **Responsive UI with Bootstrap 5**
* ⚙️ **React Router for Routing**
* 📡 **Firebase Firestore Integration**
* 🧠 **State Management with Redux Toolkit**
* ✅ Toast notifications for actions
* 🔁 Real-time sync and protected routes

---

### 🖼️ Screenshots

<!-- You can insert screenshots here using Markdown image tags -->

<!-- Example: -->

<!-- ![Screenshot](./screenshots/home.png) -->

---

### 🛠️ Tech Stack

* **React.js** (with Hooks)
* **Redux Toolkit**
* **Firebase (Auth + Firestore)**
* **Bootstrap 5**
* **React Router**
* **React Toastify**
* **Font Awesome Icons**

---

### 📂 Folder Structure

```
src/
├── components/
│   ├── BookManager.jsx
│   ├── BooksList.jsx
│   └── AuthPage.jsx
├── features/
│   ├── auth/
│   │   └── authslice.js
│   └── books/
│       └── bookSlice.js
├── firebase/
│   └── config.js
├── App.jsx
└── main.jsx
```

---

### ⚙️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/your-username/book-manager.git
cd book-manager

# Install dependencies
npm install

# Start development server
npm run dev
```

---

### 🔐 Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password or Google Sign-In).
3. Create a **Cloud Firestore** database.
4. Add your Firebase config inside `firebase/config.js`.

```js
// Example config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
```

---

### 🧪 Test Credentials (Demo)

Use these credentials to test the app:

```
Email: demo@example.com
Password: password123
```

---

### 📦 Deployment

The app is deployed on **Firebase Hosting**. To deploy your own version:

```bash
npm run build
firebase login
firebase init
firebase deploy
```

---

### 🤝 Contribution

Contributions, issues, and feature requests are welcome!
Feel free to fork and submit pull requests.

---

### 📄 License

This project is licensed under the [MIT License](LICENSE).

---
