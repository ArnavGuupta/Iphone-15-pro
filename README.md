Apple Model Viewer - React Three.js App
![image](https://github.com/user-attachments/assets/8bbb006d-9089-432c-bbc4-5a4c5c867c6a)
📌 Overview

This project is a 3D Apple Model Viewer built using React, Three.js (@react-three/fiber), GSAP animations, and Tailwind CSS. The website allows users to explore a 3D model of the iPhone 15 Pro with different colors and sizes using smooth transitions and animations.

🎯 Features

Interactive 3D Model using React Three Fiber

GSAP Animations for smooth transitions between different views

Dynamic Model Selection (change color and size)

Navigation Bar with Apple-like UI

Sentry Integration for error tracking and performance monitoring

🚀 Tech Stack

React.js (UI framework)

Three.js (@react-three/fiber) (3D model rendering)

GSAP (for animations)

Tailwind CSS (styling)

Sentry (error monitoring & performance tracking)

🛠 Installation & Setup

1️⃣ Clone the Repository:

git clone https://github.com/your-username/apple-model-viewer.git
cd apple-model-viewer

2️⃣ Install Dependencies:

npm install

3️⃣ Start the Development Server:

npm run dev

The app will be live at http://localhost:5173/.

📂 Project Structure

📦 apple-model-viewer
├── 📁 src
│   ├── 📁 components      # Reusable React components
│   ├── 📁 constants       # Data for models, colors, and sizes
│   ├── 📁 utils           # Helper functions (GSAP animations, images)
│   ├── 📄 App.jsx         # Main App component
│   ├── 📄 main.jsx        # Entry point
│   ├── 📄 index.css       # Tailwind styles
│   ├── 📄 Navbar.jsx      # Navigation bar component
│   ├── 📄 Model.jsx       # 3D Model viewer component
├── 📄 vite.config.js      # Vite configuration
├── 📄 package.json        # Dependencies and scripts
└── 📄 README.md           # Project documentation

🔍 Key Components

Navbar.jsx → Contains the navigation menu

Model.jsx → Renders the 3D iPhone model

ModelView.jsx → Handles camera controls and interactions

animation.js → Contains GSAP animations

🔧 Troubleshooting

If you face any issues:

Ensure Node.js and npm are installed (node -v, npm -v)

Delete node_modules and reinstall dependencies:

rm -rf node_modules package-lock.json
npm install

If the app doesn’t render, check the browser console (F12 → Console)

📌 Future Improvements

Add more Apple devices (MacBooks, iPads, etc.)

Implement drag-and-rotate controls for better user interaction

Enhance performance by optimizing Three.js models

📜 License

This project is MIT Licensed. Feel free to use, modify, and share! 🚀
