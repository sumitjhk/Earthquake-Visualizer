# 🌍 Earthquake Visualizer

A **production-grade, real-time earthquake monitoring SaaS** built with React, TypeScript, and Vite. Visualizes live USGS earthquake data on an interactive map with advanced analytics, authentication, and subscription tiers.

> 🚧 **Currently under active development** — upgrading from a map viewer to a full SaaS product.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation & Setup](#️-installation--setup)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [Data Source](#-data-source)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

### ✅ Current
- 🔴 **Live Earthquake Data** — Real-time data from the USGS Earthquake API
- 🗺️ **Interactive Leaflet Map** — Zoomable, pannable world map
- 🎨 **Magnitude-Based Color Coding** — Visual severity distinction
- 🎛️ **Filter Panel** — Filter by magnitude and time range
- 📍 **Clickable Markers** — Detailed earthquake info on click
- 📱 **Responsive UI** — Mobile-friendly with TailwindCSS

### 🔧 In Progress
- 🔥 **Heatmap Layer** — deck.gl powered density heatmap
- 🌐 **Tectonic Plates Overlay** — GeoJSON plates visualization
- 📍 **Marker Clustering** — Group dense earthquake markers
- 📊 **Analytics Dashboard** — Magnitude frequency charts, depth distribution
- ⚡ **Auto Refresh** — TanStack Query polling every 60 seconds
- 🗃️ **Global State** — Zustand store for filters and user session
- 🔐 **Authentication** — Firebase Google login + email/password
- 💳 **Subscription Tiers** — Free / Pro / Enterprise pricing UI
- 🛣️ **Nearest City Routing** — OpenRouteService API integration

---

## 📦 Tech Stack

### Current Stack

| Layer | Technology |
|-------|------------|
| Frontend Framework | React + TypeScript |
| Build Tool | Vite |
| Mapping | Leaflet |
| Styling | Tailwind CSS |
| Data Source | USGS Earthquake GeoJSON API |

### Upgraded Stack (In Progress)

| Layer | Current | Adding |
|-------|---------|--------|
| Map | Leaflet | + deck.gl heatmap, clustering, tectonic plates |
| Charts | ❌ None | Recharts (bar, line, donut charts) |
| Auth | ❌ None | Firebase Auth (Google + email) |
| Payments | ❌ None | Stripe UI (pricing/subscription) |
| Routing | ❌ None | OpenRouteService API |
| State Management | ❌ None | Zustand global store |
| Data Fetching | Manual fetch | TanStack Query (polling + caching) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   Frontend (React)               │
│                                                  │
│  ┌──────────┐  ┌──────────────┐  ┌───────────┐  │
│  │ Sidebar  │  │  Map (Leaflet│  │ Dashboard │  │
│  │ Filters  │  │  + deck.gl)  │  │  Charts   │  │
│  │ Zustand  │  │  Clustering  │  │ Recharts  │  │
│  └──────────┘  └──────────────┘  └───────────┘  │
│                                                  │
│  ┌──────────┐  ┌──────────────┐  ┌───────────┐  │
│  │ Firebase │  │ TanStack     │  │ Pricing   │  │
│  │   Auth   │  │   Query      │  │   Page    │  │
│  └──────────┘  └──────────────┘  └───────────┘  │
└─────────────────────────────────────────────────┘
           │                    │
    ┌──────▼──────┐    ┌────────▼────────┐
    │ USGS API    │    │ OpenRouteService │
    │ (GeoJSON)   │    │      API         │
    └─────────────┘    └─────────────────┘
```

---

## ⚙️ Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm or yarn
- Firebase project ([firebase.google.com](https://firebase.google.com))
- OpenRouteService API key ([openrouteservice.org](https://openrouteservice.org))

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/sumitjhk/Earthquake-Visualizer.git
   cd Earthquake-Visualizer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_ORS_API_KEY=your_openrouteservice_api_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open in your browser**

   ```
   http://localhost:5173
   ```

---

## 🗂 Project Structure

```
earthquake-visualizer/
├── public/
├── src/
│   ├── components/
│   │   ├── map/
│   │   │   ├── EarthquakeMap.tsx       # Leaflet + deck.gl map
│   │   │   ├── HeatmapLayer.tsx        # deck.gl heatmap
│   │   │   ├── ClusterLayer.tsx        # Marker clustering
│   │   │   └── TectonicPlates.tsx      # Tectonic plates overlay
│   │   ├── dashboard/
│   │   │   ├── StatsCards.tsx          # Summary stat cards
│   │   │   ├── MagnitudeChart.tsx      # Recharts bar chart
│   │   │   ├── DepthDonut.tsx          # Depth distribution chart
│   │   │   └── HistoryLineChart.tsx    # Historical line chart
│   │   ├── sidebar/
│   │   │   ├── Sidebar.tsx             # Main sidebar wrapper
│   │   │   ├── Controls.tsx            # Filters (magnitude, time)
│   │   │   └── Legend.tsx              # Map legend
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx           # Firebase login UI
│   │   │   └── ProtectedRoute.tsx      # Auth guard
│   │   ├── pricing/
│   │   │   └── PricingPage.tsx         # Subscription tiers UI
│   │   └── ui/
│   │       ├── Navbar.tsx
│   │       └── LiveIndicator.tsx       # Auto-refresh status
│   ├── hooks/
│   │   ├── useEarthquakes.ts           # TanStack Query + USGS fetch
│   │   └── useAuth.ts                  # Firebase auth hook
│   ├── store/
│   │   └── useStore.ts                 # Zustand global store
│   ├── utils/
│   │   └── earthquakeUtils.ts
│   ├── types/
│   │   └── earthquake.ts
│   ├── firebase.ts                     # Firebase config
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env                                # Environment variables (never commit)
├── .env.example                        # Example env template
├── tsconfig.json
└── package.json
```

---

## 🗺️ Roadmap

| Feature | Status |
|---------|--------|
| Live USGS data + Leaflet map | ✅ Done |
| Magnitude filters + color coding | ✅ Done |
| Proper Dashboard layout + Sidebar | 🔧 In Progress |
| Recharts (bar, donut, line) | 🔧 In Progress |
| deck.gl heatmap layer | 🔧 In Progress |
| Marker clustering | 🔧 In Progress |
| Tectonic plates overlay | 🔧 In Progress |
| TanStack Query + auto-refresh | 🔧 In Progress |
| Zustand global state | 🔧 In Progress |
| Firebase Auth (Google + email) | 🔧 In Progress |
| Pricing / Subscription UI | 🔧 In Progress |
| OpenRouteService routing | 📅 Planned |
| Feature gating (Free vs Pro) | 📅 Planned |

---

## 📊 Data Source

All earthquake data is provided by the **[USGS Earthquake Hazards Program](https://www.usgs.gov/programs/earthquake-hazards)**.

| Feed | URL |
|------|-----|
| Past Hour | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson` |
| Past Day | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson` |
| Past 7 Days | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson` |
| Past 30 Days | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson` |

---

## 🌐 Deployment

Deployed on **Vercel** with automatic CI/CD from GitHub.

- **Live URL:** [earthquake-visualizer-sepia.vercel.app](https://earthquake-visualizer-sepia.vercel.app)
- Every push to `main` auto-deploys to the same URL
- Add environment variables in Vercel dashboard under **Project Settings → Environment Variables**

```bash
npm run build   # Production build → dist/
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ | Powered by USGS open data | Deployed on Vercel</p>