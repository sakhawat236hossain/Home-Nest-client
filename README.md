<img width="1437" height="658" alt="image" src="https://github.com/user-attachments/assets/c0a85cdd-1cfb-489f-8c23-90da82f1ef47" />

# 🍽 Plate Share Client

[![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react&logoColor=white)](https://reactjs.org/) 
[![Vite](https://img.shields.io/badge/Vite-7.2.2-yellow?logo=vite&logoColor=white)](https://vitejs.dev/) 
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-blue?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.5.0-orange?logo=firebase&logoColor=white)](https://firebase.google.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Deploy-purple?logo=netlify&logoColor=white)](https://www.netlify.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)


# 🧑‍💻 Developer Info

**Developer:** Md Sakhawat Hossain  
**GitHub (Client):** [github.com/sakhawat-homenest-client](https://github.com/sakhawat236hossain/Home-Nest-client.git)  
**GitHub (Server):** [github.com/sakhawat-homenest-server](https://github.com/sakhawat236hossain/Home-Nest-server.git)


---

# ⚙️ Tech Stack

## 🖥️ Frontend
- React.js (Vite)
- React Router DOM
- Tailwind CSS + DaisyUI
- React Icons
- React Hot Toast / SweetAlert2
- Framer Motion (animation)

## 💾 Backend
- Node.js + Express.js
- MongoDB (Mongoose)
- dotenv & cors
- Hosted on Vercel


---

#  Key Features

### 🔐 User Authentication
- Email/Password login  
- Google login  
- Dynamic Navbar based on login status  
- Private/protected routes for Add, My Properties, and My Ratings pages  

### 🏡 Property Management (CRUD)
- Add new property listings  
- Update and delete owned properties  
- View property details with reviews and ratings  

### 💬 Ratings & Reviews
- Logged-in users can rate and review listed properties (1–5 stars)

### 🌙 Dark/Light Mode
- Toggle theme with persistent state (stored in localStorage)

### 🔍 Smart Filters
- Search by property name  
- Sort properties by price or posted date (sorted on backend)

### 📱 Responsive UI
- Fully optimized for mobile, tablet, and desktop  
- Sticky Navbar and clean layout for smooth navigation  


---

# 🧩 CRUD Functionalities

### ➕ Add Property
- Form fields: name, description, category, price, location, image, user info  
- Stores in MongoDB  
- Success toast on completion  

### ✏️ Update Property
- Pre-filled editable form  
- Updates instantly in database  
- Auto-navigates to details page  

### ❌ Delete Property
- Confirmation via SweetAlert2  
- Updates UI instantly after deletion  


---

# 🎨 UI Highlights
- Modern header with profile dropdown  
- Animated loading spinners  
- SweetAlert / toast-based notifications  
- Clean card layouts and balanced spacing  
- Consistent color, font, and button design  
- 404 page for invalid routes  


---

# 🏠 Home Page Sections
- Carousel / Banner (3+ slides)  
- Featured Real Estates (latest 8 listings)  
- Why Choose Us (static section)  
- Two extra meaningful sections (e.g., “Our Agents”, “Customer Reviews”)  


---

# 💥 Bonus Implementations
- Framer Motion animations for smoother interactions  
- Theme persistence across reloads  
- Auto-close dropdown on outside click  
- Instant property list update after CRUD operations  


---

# ⚠️ Important Notes
- Page does not throw reload errors on any route  
- Logged-in users stay logged in on page reload  
- Domain authorized in Firebase settings  


---

# ✅ Project Requirements Checklist
-  Header + Footer on all pages (except 404)  
-  Firebase Auth (Email & Google)  
-  Protected Routes  
-  CRUD Operations (MongoDB)  
-  Sort + Search Functionality  
-  Dark/Light Mode  
-  Toast / SweetAlert2  
-  Responsive Layout  
-  Minimum Commit Rules Met  


---
#  project dependencies List 
"dependencies": {
    "@smastrom/react-rating": "^1.5.0",
    "@tailwindcss/vite": "^4.1.17",
    "firebase": "^12.5.0",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.553.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-hot-toast": "^2.6.0",
    "react-icons": "^5.5.0",
    "react-rating": "^2.0.5",
    "react-rating-stars-component": "^2.2.0",
    "react-router-dom": "^7.9.5",
    "react-stars": "^2.2.5",
    "react-tsparticles": "^2.12.2",
    "sweetalert2": "^11.26.3",
    "tailwindcss": "^4.1.17",
    "tsparticles": "^3.9.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.4",
    "daisyui": "^5.4.7",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "globals": "^16.4.0",
    "vite": "^7.1.7"
  }

## 📫 Contact

**Md Sakhawat Hossin**  
GitHub:(https://github.com/sakhawat236hossain) 
Email:hmdsakhawat236@gmail.com
