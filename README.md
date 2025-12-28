# 🚗 AutoVerse – Used Car Buy & Sell Platform (Frontend Only)

AutoVerse is a **modern, frontend-only used car buy & sell web application** designed to simulate a real-world automotive marketplace experience.
The project focuses on **premium UI/UX, smooth animations, brand storytelling, and client-side business logic** — without using any backend or database.

---

## 🌟 Key Highlights

* 🚀 Premium splash screen with animated logo
* 🎬 Cinematic brand launch video on entry
* 🏢 Scroll-based brand storytelling & company vision
* 🚗 Browse, compare, buy & sell used cars
* 📊 Side-by-side car comparison feature
* ❤️ Favorites & shortlist system
* 🕒 User activity & history tracking
* 💾 Fully client-side data persistence

---

## 🧠 Project Motivation

Buying a used car involves **comparison, trust, and understanding brand value**.
This project aims to replicate how real automotive platforms:

* Showcase brand ambitions
* Highlight new launches
* Help users compare and decide intelligently

All while staying **100% frontend-only**, making it perfect for a **GitHub portfolio showcase**.

---

## 🛠️ Tech Stack

* **React (Vite)**
* **Tailwind CSS**
* **Framer Motion** (for animations)
* **LocalStorage** (for persistence)
* **Static JSON** (mock backend data)

> ❌ No backend
> ❌ No database
> ❌ No authentication

---

## 🎬 Application Flow

### 1️⃣ Splash Screen

* Fullscreen animated logo
* Brand tagline
* Auto transitions after 2–3 seconds

---

### 2️⃣ Featured Brand Launch Video

* Autoplay, muted, looped video
* Latest car launch showcase
* CTA buttons:

  * Explore Cars
  * Compare Cars
* Skip option for quick access

---

### 3️⃣ Scroll-Based Brand Storytelling

As the user scrolls, the app reveals:

* **Brand Identity**

  * Logo, slogan & description
* **Company Ambitions**

  * Innovation
  * Sustainability
  * Performance
  * Safety
* **New & Upcoming Models**

  * Model cards
  * Launch status
  * “View Used Alternatives” CTA

Smooth animations guide the user through the story.

---

## 🚗 Core Features

### 🔍 Browse Used Cars

* Card-based listings
* Filters:

  * Brand
  * Fuel type
  * Transmission
  * Price range
* Search by brand or model

---

### 📄 Car Details Page

* Image gallery
* Complete specifications
* Price highlight
* Actions:

  * Add to Compare
  * Add to Favorites

---

### 📊 Compare Cars

* Compare up to **3 cars**
* Side-by-side table:

  * Price
  * Mileage
  * Year
  * Fuel type
  * KM driven
  * Ownership
* Best value highlights

---

### ❤️ Favorites / Shortlist

* Save cars with one click
* Persisted using LocalStorage

---

### 📝 Sell Your Car (UI Only)

* Add used car via form
* Image preview
* User-listed cars:

  * Appear instantly
  * Can be edited or deleted
  * Marked as “User Listed”

---

### 🕒 User Activity & History

Tracks:

* Viewed cars
* Compared cars
* Buy/interest actions
* User-listed cars

Each history item includes:

* Car image
* Action type
* Timestamp

---

## 💾 Data Persistence

All data is stored **locally in the browser** using `LocalStorage`:

* Favorites
* Compare list
* User activity
* User-listed cars

This simulates real app behavior **without a backend**.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── SplashScreen.jsx
│   ├── VideoHero.jsx
│   ├── Navbar.jsx
│   ├── CarCard.jsx
│   ├── CompareTable.jsx
│   └── BrandStorySection.jsx
├── pages/
│   ├── Home.jsx
│   ├── CarDetails.jsx
│   ├── Compare.jsx
│   ├── SellCar.jsx
│   └── UserHistory.jsx
├── data/
│   └── cars.json
├── utils/
│   └── localStorageHelpers.js
└── App.jsx
```

---

## 🎨 UI / UX Principles Followed

* Clean automotive-inspired design
* Premium spacing & typography
* Smooth scrolling experience
* Motion-based storytelling
* Fully responsive (mobile → desktop)
* Dark / Light mode support

---

## 🚧 Limitations

* No backend integration
* No real payments or authentication
* Data resets if browser storage is cleared

> These limitations are intentional to keep the project frontend-only.

---

## 🚀 Future Enhancements

* Backend & authentication
* Real-time listings
* AI-based price suggestion
* Dealer dashboards
* EMI & loan integrations

---

## 📌 How to Run Locally

```bash
git clone <repo-url>
cd autoverse
npm install
npm run dev
```

---

## 📎 Portfolio Note

This project is built to demonstrate:

* Frontend architecture
* UI/UX thinking
* Product flow design
* Client-side business logic

It is **not a mock UI**, but a **functional frontend prototype**.

---

## 👨‍💻 Author

**Akshat Sachdeva**

* GitHub: [https://github.com/Akshatsachdev](https://github.com/Akshatsachdev)
* LinkedIn: [https://www.linkedin.com/in/ak0011](https://www.linkedin.com/in/ak0011)

---


Just tell me 👍
