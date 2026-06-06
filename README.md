# 🌍 Earthquake Visualizer

An interactive web application that visualizes real-time earthquake data on a map, powered by live USGS data.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation & Setup](#️-installation--setup)
- [Project Structure](#-project-structure)
- [Data Source](#-data-source)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

- 🔴 **Live Earthquake Data** — Fetches real-time data from the [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- 🗺️ **Interactive Map** — Displays earthquakes on a zoomable, pannable Leaflet map
- 🎨 **Magnitude-Based Color Coding** — Instantly distinguish quake severity by marker color
- 🎛️ **Filter Panel** — Refine results by:
  - Minimum magnitude threshold
  - Time range (last hour, day, week, or month)
- 📍 **Clickable Markers** — View detailed information for each earthquake on click
- 📱 **Responsive UI** — Clean, mobile-friendly interface built with TailwindCSS

---

## 📦 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend Framework | [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Mapping | [Leaflet](https://leafletjs.com/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Data Source | [USGS Earthquake GeoJSON API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) |

---

## ⚙️ Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm or yarn

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

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in your browser**

   ```
   http://localhost:5173
   ```

---

## 🗂 Project Structure

```
earthquake-visualizer/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── EarthquakeMap.tsx   # Main map component (Leaflet integration)
│   │   ├── Controls.tsx        # Filter panel (magnitude, time range)
│   │   ├── Statistics.tsx      # Summary stats display
│   │   └── Legend.tsx          # Magnitude color legend
│   ├── hooks/
│   │   └── useEarthquakes.ts   # Custom hook for fetching USGS data
│   ├── utils/
│   │   └── earthquakeUtils.ts  # Helper functions (color mapping, formatting)
│   ├── types/
│   │   └── earthquake.ts       # TypeScript type definitions
│   ├── index.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── package.json
```

---

## 📊 Data Source

All earthquake data is provided by the **[USGS Earthquake Hazards Program](https://www.usgs.gov/programs/earthquake-hazards)** via their public GeoJSON feed.

Available feeds include:

| Feed | URL |
|------|-----|
| Past Hour | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson` |
| Past Day | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson` |
| Past 7 Days | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson` |
| Past 30 Days | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson` |

---

## 🌐 Deployment

This app can be deployed easily on any static hosting platform:

| Platform | Notes |
|----------|-------|
| [Vercel](https://vercel.com/) | Connect GitHub repo, zero config needed |
| [Netlify](https://www.netlify.com/) | Drag & drop the `dist/` folder or use CI |
| [Render](https://render.com/) | Set build command `npm run build`, publish dir `dist` |

Build for production:

```bash
npm run build
```

The output will be in the `dist/` directory.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes and commit them (`git commit -m 'Add your feature'`)
4. Push to your branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

Please open an issue first for major changes or new features to discuss what you'd like to change.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ using React, Leaflet, and USGS open data</p>