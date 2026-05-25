# 🌦 Weather Forecasting Web Application

A modern full-stack Weather Forecasting Web Application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** featuring cinematic scroll-based storytelling animations, real-time weather APIs, analytics dashboards, and production-ready backend architecture.

---

# 🚀 Features

## 🌤 Real-Time Weather Forecasting
- Search weather by city
- Real-time weather updates
- Current temperature display
- Humidity, pressure, and wind speed
- Air quality insights
- Hourly weather forecasting
- 5-day weather forecasting

---

# 🎬 Cinematic UI & Animations

Built with **Framer Motion** for immersive interactions:

- Scroll-based storytelling
- Smooth fade & slide animations
- Animated weather cards
- Dynamic temperature transitions
- Section reveal animations
- GPU-optimized motion effects
- Responsive animated layouts

---

# 📊 Analytics & Visualization

Includes:
- Weather trend charts
- Hourly analytics
- Temperature graphs
- Forecast visualization
- Responsive charts using Recharts

---

# 🛡 Backend & Security

Secure backend powered by:
- Next.js API Routes
- Environment variables
- API rate limiting
- Input validation
- MongoDB integration
- Secure API handling

---

# ⚡ Performance Optimization

Optimized for production using:
- Dynamic imports
- Lazy loading
- API caching
- Image optimization
- Server Components
- Edge-ready architecture
- Skeleton loading states

---

# 🧰 Tech Stack

## Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts

## Backend
- Next.js API Routes
- Node.js

## Database
- MongoDB Atlas

## APIs
- OpenWeather API
- WeatherAPI.com

## Deployment
- Vercel

---

# 📁 Folder Structure

```plaintext
/app
├── layout.tsx
├── page.tsx
├── globals.css
├── api
│   └── weather
│       └── route.ts
├── loading.tsx
└── not-found.tsx

/components
├── Hero.tsx
├── WeatherSearch.tsx
├── WeatherCard.tsx
├── ForecastSection.tsx
├── AirQuality.tsx
├── HourlyForecast.tsx
├── AnimatedSection.tsx
├── WeatherCharts.tsx
├── Loader.tsx
└── Navbar.tsx

/lib
├── fetchWeather.ts
├── rateLimiter.ts
├── validate.ts
├── db.ts
└── constants.ts

/models
└── SearchHistory.ts
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/weather-forecast-app.git
```

---

## 2. Navigate to Project Directory

```bash
cd weather-forecast-app
```

---

## 3. Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env.local` file in the root directory.

```env
WEATHER_API_KEY=your_openweather_api_key
MONGO_URI=your_mongodb_uri
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

# ▶️ Run Development Server

```bash
npm run dev
```

Open:

```plaintext
http://localhost:3000
```

---

# 🌐 API Route

## Weather Endpoint

```plaintext
/api/weather
```

### Example Request

```plaintext
/api/weather?city=London
```

---

# 🎥 Framer Motion Animation System

The project uses:
- `motion.div`
- `whileInView`
- `useScroll`
- `useTransform`
- Staggered animations
- Parallax effects

Animations are optimized using:
- `opacity`
- `transform`
- `scale`

Avoided:
- Width/height transitions
- Layout thrashing

---

# 📈 Performance Features

- Lazy loaded charts
- Dynamic imports
- API caching
- Redis-ready rate limiting
- Optimized rendering
- Skeleton loaders
- CDN-ready assets

---

# 🛠 Production Optimizations

- SEO-friendly architecture
- Accessibility support
- Responsive design
- Type-safe structure
- Error boundaries
- Optimized bundle size
- Edge deployment support

---

# 🧪 Future Improvements

Potential enhancements:
- AI weather summaries
- Voice-based weather search
- WebSocket live updates
- Multi-language support
- PWA offline support
- Dark/light theme toggle

---

# 🚀 Deployment

## Deploy on Vercel

### Install Vercel CLI

```bash
npm install -g vercel
```

### Deploy

```bash
vercel
```

---

# ☁ MongoDB Setup

1. Create MongoDB Atlas account
2. Create cluster
3. Copy connection string
4. Add to `.env.local`

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/weather-app
```

---

# 📦 Build for Production

```bash
npm run build
```

---

# ▶️ Start Production Server

```bash
npm start
```

---

# 📌 Complete User Flow

1. User lands on cinematic Hero section
2. Scroll animations initialize
3. User searches a city
4. Backend API fetches weather data
5. Weather cards animate into view
6. Forecast & analytics render
7. Search history stores in MongoDB
8. Smooth storytelling continues

---

# 📊 Scalability Strategy

- Redis caching
- Edge rendering
- CDN optimization
- API fallback systems
- Lazy loading
- Dynamic imports
- Monitoring with Sentry

---

# 🎯 Final Result

✔ Real-Time Weather Forecasting App  
✔ Framer Motion Cinematic UI  
✔ Scroll-Based Storytelling  
✔ Animated Forecast Cards  
✔ Secure Backend APIs  
✔ MongoDB Integration  
✔ Analytics Dashboard  
✔ Responsive Design  
✔ Production-Ready Architecture  

---

# 👨‍💻 Author

Developed using:
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- MongoDB
- OpenWeather API

---

# 📄 License

This project is licensed under the MIT License.
