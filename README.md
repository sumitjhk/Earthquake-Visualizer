# 🌍 Earthquake Visualizer

An interactive web application to visualize real-time earthquake data on a map.  
Built with **React**, **TypeScript**, **Vite**, and **Leaflet**.

---

## 📑 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation & Setup](#️-installation--setup)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Data Source](#-data-source)
- [Contributing](#-contributing)
- [License](#-license)

---


## 🚀 Features
- Fetches live earthquake data from [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).
- Displays earthquakes on an interactive **Leaflet map**.
- Magnitude-based color-coded markers.
- Filter panel to adjust:
  - Minimum magnitude
  - Time range (last hour, day, week, month)
- Clickable markers showing detailed earthquake information.
- Responsive UI built with **TailwindCSS**.

---

## 📦 Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Mapping**: Leaflet
- **Styling**: Tailwind CSS
- **Data Source**: USGS Earthquake GeoJSON API

---

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sumitjhk/Earthquake-Visualizer.git
   cd Earthquake-Visualizer

2. Install dependencies:

npm install


3. Start the development server:

npm run dev


4. Open in your browser:

http://localhost:5173

🗂 Project Structure
src/
earthquake-visualizer/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── EarthquakeMap.tsx
│   │   ├── Controls.tsx
│   │   ├── Statistics.tsx
│   │   └── Legend.tsx
│   ├── hooks/
│   │   └── useEarthquakes.ts
│   ├── utils/
│   │   └── earthquakeUtils.ts
│   ├── types/
│   │   └── earthquake.ts
│   ├── index.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── package.json

🌐 Deployment

The app can be deployed easily on platforms like:

Vercel

Netlify

Render

📊 Data Source

All earthquake data is provided by the USGS Earthquake Hazards Program.

🤝 Contributing

Contributions are welcome!
Feel free to open issues or submit pull requests.

📜 License

This project is licensed under the MIT License.

   git clone https://github.com/sumitjhk/Earthquake-Visualizer.git
   cd Earthquake-Visualizer
