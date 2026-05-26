# MASTER PROMPT — STOCKPULSE INDIA  
## Production-Grade Full Stack Fintech Platform + Browser Extension

# 1. Context and Role

You are a senior full-stack developer, UI/UX architect, animation designer, browser extension engineer, and performance optimization specialist responsible for building a complete fintech ecosystem called **StockPulse India**.

This project should not feel like a beginner dashboard or simple portfolio project. The final platform should behave and look like a real-world premium fintech product inspired by:
- TradingView
- Zerodha
- Groww
- Bloomberg dashboards
- Modern SaaS financial platforms

The application should feel:
- Smooth and interactive
- Premium and modern
- Responsive across all devices
- Highly scalable
- Visually polished
- Production-ready
- Professionally engineered

The application should guide users naturally through financial information using smooth animations, premium layouts, responsive interactions, and modern dashboard storytelling.

The project must strictly use:
- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Recharts
- Radix UI
- Axios
- Date-fns

The entire system should prioritize:
- Clean architecture
- Performance optimization
- Accessibility
- Reusable components
- Responsive design
- Maintainability
- Scalable engineering practices
- Production-grade quality

Avoid:
- Deprecated APIs
- Messy folder structures
- Monolithic components
- Duplicate logic
- Heavy animations
- Poor responsiveness
- Unnecessary dependencies

---

# 2. Objective

The main objective is to build a complete fintech ecosystem that combines:
- Stock market analytics platform
- Browser extension system
- Scalable backend architecture
- Modern dashboard interface
- Watchlist management
- Authentication handling
- Interactive market visualization tools

The final product should feel deployable in a real-world production environment rather than appearing like a student-level project or static template.

Users should experience:
- Smooth financial interactions
- Real-time market analytics
- Premium dashboard storytelling
- Fast and responsive performance
- Modern fintech aesthetics
- Interactive chart systems

The platform should visually communicate financial data in a clean, engaging, and professional manner.

---

# 3. UI and Animation Requirements

The user interface should feel cinematic, modern, immersive, and highly polished. Every section should transition naturally into the next so the platform feels connected instead of static.

Use Framer Motion for:
- Fade animations
- Scroll-triggered transitions
- Hover micro-interactions
- Floating motion effects
- Smooth section reveals
- Staggered content animations
- Animated chart rendering

The design system should include:
- Modern gradients
- Premium shadows
- Financial-themed colors
- Responsive spacing
- Clean typography
- Glassmorphism where appropriate

Animations should improve usability and visual quality rather than distract users.

Animations must remain GPU-friendly by primarily using:
- transform
- opacity

Avoid:
- Layout thrashing
- Heavy repaint animations
- Laggy transitions
- Excessive motion effects
- Poor mobile animation performance

The UI should remain smooth even on lower-end devices.

---

# 4. Layout Requirements

The layout architecture should remain modular, readable, scalable, and responsive while maintaining strong visual hierarchy.

The platform should include:
- Cinematic hero section
- Market overview dashboard
- Financial chart system
- Trending stocks section
- Watchlist interface
- Search functionality
- User dashboard
- Profile management
- Settings pages
- Help and support sections

Responsive layouts must adapt naturally across:
- Mobile devices
- Tablets
- Desktop screens
- Ultra-wide displays

Prevent:
- Overflow issues
- Broken charts
- Clipped text
- Layout instability
- Tiny touch targets

The mobile experience should feel intentionally optimized instead of simply shrinking desktop layouts.

---

# 5. Contact System Requirements

Create a complete contact and communication system that allows users to:
- Submit queries
- Request support
- Send feedback
- Contact the platform team

The contact system should include:
- Validation handling
- Loading states
- Success feedback
- Error handling
- Accessible form interactions

Forms should feel responsive, smooth, visually polished, and easy to use.

Prevent:
- Empty submissions
- Invalid inputs
- Broken requests
- Confusing validation states

All user actions should provide immediate visual feedback so users always understand the status of their submissions.

---

# 6. Backend Requirements

Create a scalable backend architecture capable of handling:
- Authentication
- APIs
- Market data processing
- Watchlist persistence
- Session management
- Future scalability requirements

Use the following backend structure:

```txt
backend/
│
├── server.js
├── config/
├── models/
├── routes/
├── middleware/
├── controllers/
├── .env
└── package.json
```

The backend should follow proper separation of concerns:
- `routes/` should manage API endpoints and request routing.
- `controllers/` should contain business logic and response handling.
- `middleware/` should handle authentication, validation, security, and reusable request processing.
- `models/` should define schemas, validation logic, and database structures.
- `config/` should manage reusable environment configuration and external services.

The backend must remain:
- Secure
- Modular
- Scalable
- Maintainable
- Production-ready

Sensitive values such as JWT secrets, API keys, and database credentials must only exist inside `.env` files and should never be exposed publicly.

---

# 7. Data Processing Requirements

The platform should efficiently process:
- Stock market data
- Analytics information
- Watchlist data
- API responses
- User-related data

Use Axios for API communication and keep all request handling centralized, reusable, and modular.

The system should properly handle:
- Loading states
- API failures
- Retry logic
- Empty responses
- Invalid data
- Network interruptions

Avoid:
- Repeated API logic
- Inefficient fetching patterns
- Unnecessary rerenders
- Scattered request handling

The data layer should remain optimized, scalable, and maintainable.

---

# 8. Output Requirements

The final output should include:
- Premium fintech dashboard
- Browser extension ecosystem
- Responsive layouts
- Animated financial charts
- Scalable backend architecture
- Reusable UI components
- Smooth motion systems
- Secure authentication
- API integrations
- Production-grade engineering quality

Use the following frontend structure:

```txt
src/
 ├── app/
 ├── components/
 │    ├── charts/
 │    ├── dashboard/
 │    ├── market/
 │    ├── ui/
 │    ├── animations/
 │    └── layout/
 ├── hooks/
 ├── services/
 ├── lib/
 ├── utils/
 ├── constants/
 ├── styles/
 └── types/
```

If new modules or features are added later:
- Remove unnecessary sections
- Remove duplicate utilities
- Remove dead components
- Maintain clean architecture

Avoid unnecessary project clutter.

---

# 9. Error Handling and Documentation

The platform should gracefully handle:
- API failures
- Invalid requests
- Empty states
- Loading delays
- Authentication failures
- Unexpected runtime issues

Provide:
- Retry options
- Loading indicators
- User-friendly feedback
- Graceful fallbacks
- Clean empty-state interfaces

The application should never completely break because of failed requests.

Documentation should clearly explain:
- Reusable utilities
- Architecture decisions
- API setup
- Environment configuration
- Complex reusable systems

Avoid excessive comments everywhere, but document critical systems clearly enough for long-term maintainability.

---

# 10. Performance and Scalability

Performance optimization is extremely important. The platform should feel lightweight, smooth, responsive, and fast across all devices.

Implement:
- Lazy loading
- Dynamic imports
- Optimized rendering
- Efficient animation handling
- Memoization where appropriate
- Reusable state management

Avoid:
- Oversized bundles
- Heavy client-side rendering
- Unnecessary rerenders
- Animation lag
- Performance bottlenecks

The architecture should support future feature expansion, additional APIs, larger datasets, and long-term scalability.

---

# 11. Technology Stack

The project must strictly use:
- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Recharts
- Radix UI
- Axios
- Date-fns

Follow modern engineering practices including:
- Strict TypeScript typing
- Reusable component architecture
- Modular folder organization
- Clean naming conventions
- Scalable code structure
- Maintainable engineering standards

Avoid:
- Deprecated APIs
- Hardcoded hacks
- Duplicate logic
- Oversized components
- Messy state management
- Unnecessary complexity

Avoid using `any` types unless absolutely necessary.

---

# Extension Structure

```txt
extension/
│
├── manifest.json
├── popup.html
├── popup.css
├── popup.js
├── background.js
├── auth.js
├── api.js
├── storage.js
└── icons/
```

The browser extension should support:
- Authentication handling
- Popup interactions
- Background services
- API communication
- Local storage management
- Session persistence

The popup experience should feel:
- Fast
- Minimal
- Responsive
- Modern
- Visually premium

Avoid placing all extension logic inside a single file.

---

# Dashboard Structure

```txt
dashboard/
│
├── index.html
├── dashboard.js
├── dashboard.css
├── profile.html
├── settings.html
└── help.html
```

The dashboard should provide:
- Analytics visualization
- User profile management
- Settings handling
- Support systems
- Interactive financial insights

The interface should remain:
- Readable
- Responsive
- Modern
- Easy to navigate
- Visually balanced

The dashboard should never feel cluttered or confusing.

---

# Final Expectations

The final result should feel like a real-world fintech ecosystem created by an experienced engineering team rather than a beginner project or static portfolio demo.

The platform should include:
- Premium UI/UX
- Smooth motion systems
- Responsive layouts
- Browser extension ecosystem
- Scalable backend architecture
- Production-grade code quality
- Secure authentication handling
- Strong performance optimization
- Reusable component systems
- Modern engineering standards

The final product should feel:
- Enterprise-grade
- Highly polished
- Real-world deployable
- Scalable for future growth
- Professionally engineered
- Visually premium
