    # 🚀 TradePro — Next-Gen Real-Time Financial Trading & Technical Analysis Platform

[![Next.js 16](https://img.shields.io/badge/Next.js-16.0.10-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.2.1-blue?style=for-the-badge&logo=react)](https://react.dev)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Firebase 12](https://img.shields.io/badge/Firebase-12.7.0-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com)
[![Chart.js 4](https://img.shields.io/badge/Chart.js-4.5.1-FF6384?style=for-the-badge&logo=chart.js)](https://www.chartjs.org)
[![Framer Motion 12](https://img.shields.io/badge/Framer_Motion-12.23-E10098?style=for-the-badge&logo=framer-motion)](https://www.framer.com/motion/)

Welcome to **TradePro**, an ultra-premium, dark-themed digital trading and investments dashboard built using **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS**. TradePro integrates simulated live-ticker data streams with dynamic candlestick plotting and Firebase database authentication to deliver a professional-grade technical analysis experience right inside your web browser.

---

## 🔗 Live Showcase & Links

- 🌐 **Live Demo:** [https://tradepro-showcase.vercel.app](https://github.com/himesh-mehta/Trade-Pro) *(Replace with your deployed Vercel URL)*
- 💻 **GitHub Repository:** [https://github.com/himesh-mehta/Trade-Pro](https://github.com/himesh-mehta/Trade-Pro)
- 📊 **Firebase Project Portal:** [https://console.firebase.google.com](https://console.firebase.google.com)

---

## 🎨 Visual Preview & Showcase

### 🖥️ 1. Main Landing Page & Feature Hub
A beautiful glassmorphic home page featuring modern dark-mode aesthetics, rich micro-animations, and smooth scrolling.
![TradePro Landing Page](./public/landing_page.png)

### 📊 2. Dynamic Live Ticker & Market Indices Dashboard
The central terminal showcasing live fluctuating indices (Nifty 50, Bank Nifty, Sensex), most-bought stock cards (Reliance, Tata Motors, TCS) with animated price tickers, and a market capitalization listing.
![TradePro Dashboard](./public/dashboard_view.png)

### 📈 3. Advanced Candlestick Technical Analysis Charting Room
A specialized charting room showcasing interactive simulated live tickers, multi-timeframe controls (5M, 10M, 1H), and high-fidelity candlestick charting.
![Technical Charts](./public/technical_charts.png)

---

## 🔥 Key Features

- **⚡ Real-Time Asset Simulator**: Simulated market ticker prices (Nifty 50, Bank Nifty, Sensex, Reliance, Tata Motors, TCS, and more) updating with fluid green/red price adjustments and flashing percentage tickers every second.
- **📊 Technical Charting Suite**: Interactive candlestick graphs powered by `chartjs-chart-financial` and `react-chartjs-2`, allowing customizable analysis timeframes (`5M`, `10M`, `15M`, `30M`, `1H`) and dynamic live candle additions.
- **✨ Fluid Micro-Animations**: Page transitions, hover effects, scale transformations, and layout springs built seamlessly with **Framer Motion** for a premium, native-app-like feel.
- **🔐 Firebase Authentication & Cloud Database**: Pre-configured setup for user session management (`login`, `signup`) and firestore database synchronization.
- **📱 Ultra-Responsive UX**: Carefully tailored layouts designed for mobile, tablet, and widescreen desktop displays utilizing modern flexbox and grid components.

---

## 🛠️ Architecture & Data Flow

```mermaid
graph TD
    A[User Client Browser] -->|Routes via Next.js App Router| B[TradePro Pages]
    B -->|Static/Animated Content| C[Framer Motion Engine]
    B -->|Interactive Pages| D[Dashboard & Tickers]
    D -->|Real-Time Intervals| E[Simulated Asset Streams]
    D -->|Plot Financial Candlesticks| F[Chart.js / Financial Plugin]
    B -->|Auth State / Session| G[Firebase Client Core]
    G -->|Authentication| H[Firebase Auth]
    G -->|Store Portfolios| I[Firestore Database]
```

---

## 📂 Project Structure

```bash
Trade-Pro/
├── app/                      # Next.js App Router Directory
│   ├── auth/                 # Authentication Pages (Login/Signup)
│   ├── dashboard/            # Dynamic Stock and Market Dashboards
│   │   ├── [id]/             # Stock Details Page with candlestick charts
│   │   └── page.tsx          # Dashboard Landing Tickers & Market cap lists
│   ├── layout.tsx            # Main HTML Shell & Font Injection
│   ├── page.tsx              # Home / Landing Page
│   └── globals.css           # Global Styles & Custom Utilities
├── components.json           # UI Components Configuration
├── lib/                      # Common Utilities & Configurations
│   ├── firebase.js           # Firebase Client Setup
│   └── utils.ts              # Tailwind Merge Class Utility
├── public/                   # Public Static Assets
│   ├── landing_page.png      # Home & Landing Page Preview
│   ├── dashboard_view.png    # Stocks, Mutual Funds & Indices Dashboard
│   └── technical_charts.png  # Live Candlestick Stock Charting Preview
├── package.json              # Project Configuration & Dependencies
└── tsconfig.json             # TypeScript Configuration
```

---

## ⚙️ Getting Started & Installation

To run TradePro locally on your system, follow these simple steps:

### 1. Prerequisites
Make sure you have **Node.js** (v18.x or later) installed on your machine.

### 2. Clone the Repository
```bash
git clone https://github.com/himesh-mehta/Trade-Pro.git
cd Trade-Pro
```

### 3. Install Dependencies
Install all required modules securely using `npm`:
```bash
npm install
```

### 4. Setup Environment Variables
Create a `.env.local` file in the root of the project directory and configure your Firebase keys:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Launch the Development Server
Run the local dev compiler:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to explore the TradePro interface!

---

## 🛠️ Main Libraries & Technologies Used

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & React Server Components)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/) + [chartjs-chart-financial](https://github.com/chartjs/chartjs-chart-financial)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend Integrations**: [Firebase Web SDK v12](https://firebase.google.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🤝 Contributing

We welcome contributions of any size! If you want to contribute, please follow these steps:
1. **Fork** the repository.
2. Create a new feature branch (`git checkout -b feature/cool-feature`).
3. Commit your changes (`git commit -m 'feat: Add a cool feature'`).
4. Push to the branch (`git push origin feature/cool-feature`).
5. Open a **Pull Request**.

---

## 📄 License

This project is licensed under the **MIT License**. Check out the [LICENSE](LICENSE) file for more information.

---

*Made with ❤️ for modern traders.*
