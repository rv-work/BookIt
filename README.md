# 🎫 BookIt — Experiences & Slot Booking Platform

A full-stack travel experience booking system where users can explore curated adventures, select available dates & slots, and complete bookings seamlessly.

🚀 **Live Demo:** [https://book-it-rvn.vercel.app](https://book-it-rvn.vercel.app)

---

## ✨ Features

✅ Browse travel experiences dynamically  
✅ View detailed experience info and real-time slot availability  
✅ Apply promo codes on checkout  
✅ Secure booking confirmation flow  
✅ Fully responsive UI based on Figma design  
✅ Proper validation and error states handled  
✅ Prevents double-booking using backend validation

---

## 🧩 Tech Stack

| Layer          | Technology                           |
| -------------- | ------------------------------------ |
| Frontend       | Next.js + TypeScript + TailwindCSS   |
| Backend        | Node.js + Express + TypeScript       |
| Database       | MongoDB (Mongoose ORM)               |
| Build & Deploy | Vercel (Frontend) + Render (Backend) |

---

## 📂 Project Structure

```
bookit/
├── client/          # Next.js Frontend
└── server/          # Express + MongoDB Backend
```

---

## 🔗 API Endpoints

| Method | Endpoint           | Description                                 |
| ------ | ------------------ | ------------------------------------------- |
| GET    | `/experiences`     | Fetch all experiences                       |
| GET    | `/experiences/:id` | Get specific experience + slot availability |
| POST   | `/bookings`        | Create a booking with validation            |
| POST   | `/promo/validate`  | Apply and validate promo code               |

---

## 🪄 Promo Codes (Seeded)

| Code      | Discount | Type       | Usage Limit |
| --------- | -------- | ---------- | ----------- |
| SAVE10    | 10%      | percentage | 100         |
| FLAT100   | ₹100     | fixed      | 50          |
| WELCOME20 | 20%      | percentage | 200         |

> All promo codes auto-expire on: **31 December 2025**

---

## ⚙️ Local Development Setup

### 1️⃣ Clone repo

```bash
git clone https://github.com/rv-work/bookit.git
cd bookit
```

### 2️⃣ Configure environment variables

Create `.env` in the `server` directory with:

```ini
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 3️⃣ Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 4️⃣ Seed initial data (experiences + promo codes)

```bash
cd server
npm run build
npm run seed
```

### 5️⃣ Run Locally

**Backend:**

```bash
cd server
npm run dev
```

**Frontend:**

```bash
cd client
npm run dev
```

Visit: `http://localhost:3000`

✅ Full booking flow must work end-to-end.

---

## ✅ Completed Assignment Requirements

✔ UI 100% matched with Figma  
✔ XR breakpoints (Desktop + Mobile responsive)  
✔ Real API consumption using Axios  
✔ Proper validation + sold-out states  
✔ Dynamic booking confirmation page  
✔ Database integrated + data persistence

---

## 🚀 Deployment

**Frontend:** Deployed on Vercel  
**Backend:** Deployed on Render

### Deploy Backend:

```bash
cd server
npm run build
# Deploy dist/ folder to your hosting service
```

### Deploy Frontend:

```bash
cd client
npm run build
# Vercel auto-deploys from GitHub
```

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**BookIt** —  
Built with ❤️ + Next.js

---

## 📧 Contact

For any queries, reach out via:

- GitHub: [@rv-work](https://github.com/rv-work)

---

**Happy Booking! ✈️🎉**
