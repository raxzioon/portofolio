# 🌌 razxs_ — Cosmic Dark Mode Portfolio

> Modern, immersive cosmic-themed personal portfolio website for **Adzka Arroya** (Information Systems, Telkom University | Full-Stack Developer & Data Science Enthusiast).

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**, styled in outer-space dark mode with deep nebular blue glow (`#2c67ed`).

---

## ✨ Features

- 🚀 **Cosmic Outer-Space Theme**: Deep space dark mode (`#030712`, `#060b24`) accented with pulsing cosmic blue (`#2c67ed`) and cyan nebula glows.
- 👨‍💻 **CV-Grounded Experience**:
  - Educational background (S1 Information Systems, Telkom University & Pondok Tahfidz Sulaimaniyah).
  - Career journey (Roblox Studio Mentor at Ruangguru, AI/ML Researcher at PUI-PT AICOMS, Full-Stack Developer at Pemdes Denanyar).
  - High-impact statistics counter (4,500+ citizens served, 30 Juz Hafidz, 5+ professional certifications).
- 💼 **Interactive Portfolio**:
  - Filterable by categories (*Full-Stack*, *Data & AI*, *Game & STEM*).
  - Deep-dive Project Modals with tech tags, problem-solution breakdown, architecture highlights, and links.
  - Interactive Tech Stack with proficiency meters and category tabs.
- 📬 **Live Contact & Supabase Database**:
  - Real-time contact form with confetti celebration animation on submit.
  - Automatic fallback to browser `localStorage` if database keys are not provided.
- 👁️ **Visitor Tracker**:
  - Real-time visitor analytics capturing timestamp, referrer, device resolution, and user agent.
- 🔐 **Stealth Admin Panel**:
  - Completely hidden from regular visitors (no floating buttons).
  - Accessible via shortcut **`Alt + A`** (or `Ctrl + Shift + A`), URL hash **`#admin`**, or clicking the footer copyright.
  - Protected with PIN code (`1234`).
  - **Profile Photo Management**: Upload new photo directly from computer or apply image URL with instant Canvas compression and live preview.
  - **Project Photo Management**: Replace thumbnails for each project individually from local files or image URLs.
  - **Inbox Management**: View, mark as read, reply via email, or delete visitor messages.
  - **Visitor Analytics**: View visitor history and statistics.
  - **Supabase Integration**: Configure Project URL & Anon Key on the fly with test connection and SQL migration copy tool.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS + Custom Cosmic Glow Utility Classes
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database / Backend**: Supabase (`@supabase/supabase-js`)
- **Effects**: Canvas Confetti

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd PORTOFOLIO
npm install
```

### 2. Configure Environment Variables (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase credentials and custom Admin PIN if desired:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
VITE_ADMIN_PIN=1234
```
*(Note: If Supabase keys are omitted, the app automatically runs in local storage offline mode without crashing!)*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Production assets will be generated in the `dist/` directory.

---

## 🔐 Accessing the Admin Panel

1. Open your portfolio in any browser.
2. Press **`Alt + A`** on your keyboard (or open `http://localhost:5173/#admin`).
3. Enter PIN: **`1234`**.

---

## 👤 Author

**Adzka Arroya**
- Brand: **`razxs_`**
- Email: [yakokapa@gmail.com](mailto:yakokapa@gmail.com)
- LinkedIn: [linkedin.com/in/adzka-arroya-2789212a1](https://linkedin.com/in/adzka-arroya-2789212a1)
- Location: Kabupaten Bekasi, Jawa Barat, Indonesia

