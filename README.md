# ⚡ Raincheck — The Chaotic, Mobile-First Neo-Brutalist Weather Roaster

> Real-time meteorological conditions converted into unapologetic sarcastic roasts, tactile physical buttons, confetti explosions, and neo-brutalist telemetry badges.

![Raincheck Preview](https://raw.githubusercontent.com/ThangNguyenTan/raincheck/main/public/preview.png)

---

## ⚡ Highlights

- ⚡ **Attitude-Packed Weather:** Bold black outlines (`border-4 border-black`), zero-blur flat drop shadows (`shadow-neo`), tactile physical button presses, and snappy animations.
- 🔥 **WMO Interpretation & Roast Engine:** Complete dictionary mapping for WMO codes (0–99), day/night variants, and extreme temperature overrides (e.g. *Air Fryer Mode* $\ge 35^\circ\text{C}$ & *Antarctica Cosplay* $\le -10^\circ\text{C}$).
- 🌌 **Weather-Matched Atmospheric Background:** Dynamic ambient gradients, panning neo-brutalist dot-grid texture, and weather-specific particle animations (lightning strobes, heat shimmer, rain streaks, tumbling snowflakes, and stars).
- 📍 **Keyless & Privacy-Friendly:** Powered by [Open-Meteo API](https://open-meteo.com/) and OpenStreetMap Nominatim for client-side reverse geocoding.
- 📱 **Mobile-First Design:** Centered viewport locked to max 420px with safe-area insets (`env(safe-area-inset-bottom)`).
- 🧪 **Simulation Lab & Presets Drawer:** Instant preview for 10 textbook weather conditions and 5 global test cities.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite 8
- **Language:** TypeScript (Strict mode, `verbatimModuleSyntax`)
- **Styling:** Tailwind CSS (Custom Neo-Brutalist utility presets)
- **Typography:** `@fontsource/fredoka` & `@fontsource/plus-jakarta-sans`
- **Icons & Effects:** `lucide-react`, `canvas-confetti`
- **Data Sources:** Open-Meteo & OpenStreetMap Nominatim

---

## 🚀 Getting Started

### 1. Clone repository
```bash
git clone https://github.com/ThangNguyenTan/raincheck.git
cd raincheck
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```

Open `http://localhost:5173/` in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 📜 License

MIT License. Built with attitude.
