# MASTER PROMPT — STOCKPULSE INDIA  
## Production-Grade Full Stack Fintech Platform + Browser Extension

---

# 1. Context and Role

You are a senior full-stack developer, UI/UX architect, animation designer, browser extension engineer, and performance optimization specialist responsible for building a complete fintech ecosystem called **StockPulse India**.

This project should not feel like a beginner dashboard or simple portfolio project. The final platform should behave and look like a real-world premium fintech product inspired by:
- **TradingView** — for advanced chart systems and professional financial visualization.
- **Zerodha** — for lightweight fintech dashboards and clean trading interfaces.
- **Groww** — for modern responsive layouts and beginner-friendly user experience.
- **Bloomberg Dashboards** — for enterprise-grade data presentation and analytics systems.
- **Modern SaaS Platforms** — for scalable architecture and polished interactions.

The application should feel:
- **Smooth and interactive** — ensuring responsive and engaging user interactions.
- **Premium and modern** — creating a visually polished fintech experience.
- **Responsive across all devices** — adapting naturally to mobile, tablet, and desktop screens.
- **Highly scalable** — supporting future feature expansion without architectural issues.
- **Visually polished** — maintaining consistent typography, spacing, and UI hierarchy.
- **Production-ready** — following enterprise engineering standards and deployment practices.
- **Professionally engineered** — using modular, maintainable, and scalable architecture.

The application should guide users naturally through financial information using smooth animations, responsive layouts, interactive dashboards, and modern fintech storytelling patterns.

The project must strictly use:
- **Next.js 16 App Router** — for scalable modern React application architecture.
- **React 19** — for component-based rendering and modern frontend patterns.
- **TypeScript** — to ensure strict typing and maintainable large-scale applications.
- **Tailwind CSS v4** — for utility-first responsive styling and design consistency.
- **Framer Motion** — for smooth motion systems and animation-driven storytelling.
- **Recharts** — for responsive and interactive financial charts.
- **Radix UI** — for accessible and reusable UI primitives.
- **Axios** — for centralized API communication and request handling.
- **Date-fns** — for lightweight and modern date utilities.

The entire system should prioritize:
- **Clean architecture** — keeping the codebase scalable and maintainable.
- **Performance optimization** — ensuring fast rendering and smooth interactions.
- **Accessibility** — making the platform usable for all users.
- **Reusable components** — reducing duplication and improving scalability.
- **Responsive design** — adapting layouts naturally across devices.
- **Maintainability** — simplifying future updates and feature additions.
- **Scalable engineering practices** — preparing the project for long-term growth.
- **Production-grade quality** — matching enterprise-level engineering standards.

Avoid:
- **Deprecated APIs** — because outdated implementations reduce long-term maintainability.
- **Messy folder structures** — as poor organization affects scalability and readability.
- **Monolithic components** — to prevent oversized and hard-to-maintain code.
- **Duplicate logic** — because repeated functionality increases technical debt.
- **Heavy animations** — which negatively impact performance and user experience.
- **Poor responsiveness** — ensuring layouts work correctly across all screen sizes.
- **Unnecessary dependencies** — to keep bundle size optimized and maintainable.

---

# 2. Objective

The main objective is to build a complete fintech ecosystem that combines:
- **Stock market analytics platform** — for professional financial data visualization.
- **Browser extension system** — allowing quick financial interactions directly from the browser.
- **Scalable backend architecture** — supporting authentication, APIs, and future scalability.
- **Modern dashboard interface** — providing clean analytics and user management.
- **Watchlist management** — enabling users to track selected stocks efficiently.
- **Authentication handling** — ensuring secure login and session management.
- **Interactive market visualization tools** — making financial data engaging and understandable.

The final product should feel deployable in a real-world production environment rather than appearing like a student-level project or static template.

Users should experience:
- **Smooth financial interactions** — making the platform feel responsive and intuitive.
- **Real-time market analytics** — creating a dynamic fintech environment.
- **Premium dashboard storytelling** — guiding users naturally through financial information.
- **Fast and responsive performance** — maintaining smooth rendering across devices.
- **Modern fintech aesthetics** — using visually polished design systems.
- **Interactive chart systems** — helping users analyze financial data effectively.

The platform should visually communicate financial data in a clean, engaging, and professional manner.

---

# 3. UI and Animation Requirements

The user interface should feel cinematic, immersive, modern, and highly polished. Every section should transition naturally into the next so the platform feels connected instead of static.

Use Framer Motion for:
- **Fade animations** — creating smooth UI entry transitions.
- **Scroll-triggered transitions** — improving storytelling during navigation.
- **Hover micro-interactions** — making UI elements feel responsive and interactive.
- **Floating motion effects** — adding subtle depth and motion to layouts.
- **Smooth section reveals** — enhancing content presentation.
- **Staggered content animations** — improving readability and visual hierarchy.
- **Animated chart rendering** — making financial data feel dynamic and alive.

The design system should include:
- **Modern gradients** — for premium visual depth.
- **Premium shadows** — creating layered UI hierarchy.
- **Financial-themed colors** — matching fintech branding aesthetics.
- **Responsive spacing** — ensuring layouts remain clean on all devices.
- **Clean typography** — improving readability and professionalism.
- **Glassmorphism where appropriate** — adding modern UI styling carefully.

Animations should improve usability and visual quality rather than distract users.

Animations must remain GPU-friendly by primarily using:
- **transform** — for lightweight movement rendering.
- **opacity** — for efficient fade transitions.

Avoid:
- **Layout thrashing** — because it causes rendering instability.
- **Heavy repaint animations** — which negatively impact performance.
- **Laggy transitions** — reducing the premium feel of the platform.
- **Excessive motion effects** — which may overwhelm users.
- **Poor mobile animation performance** — ensuring smooth rendering across all devices.

The UI should remain smooth even on lower-end devices.

---

# 4. Layout Requirements

The layout architecture should remain modular, readable, scalable, and responsive while maintaining strong visual hierarchy.

The platform should include:
- **Cinematic hero section** — creating a premium first impression.
- **Market overview dashboard** — summarizing important financial data.
- **Financial chart system** — visualizing market analytics clearly.
- **Trending stocks section** — highlighting active market movements.
- **Watchlist interface** — enabling personalized stock tracking.
- **Search functionality** — helping users quickly access stock information.
- **User dashboard** — managing analytics and account interactions.
- **Profile management** — handling user account details and preferences.
- **Settings pages** — managing themes, notifications, and controls.
- **Help and support sections** — assisting users with troubleshooting and guidance.

Responsive layouts must adapt naturally across:
- **Mobile devices** — ensuring optimized touch interactions.
- **Tablets** — balancing responsive spacing and readability.
- **Desktop screens** — supporting full financial dashboard experiences.
- **Ultra-wide displays** — maintaining proper layout scaling and balance.

Prevent:
- **Overflow issues** — ensuring layouts remain visually stable.
- **Broken charts** — maintaining responsive chart rendering.
- **Clipped text** — preserving readability across all devices.
- **Layout instability** — preventing content shifting during rendering.
- **Tiny touch targets** — improving mobile usability and accessibility.

The mobile experience should feel intentionally optimized instead of simply shrinking desktop layouts.

---

# 5. Contact System Requirements

Create a complete contact and communication system that allows users to:
- **Submit queries** — enabling direct communication with the platform.
- **Request support** — helping users solve issues quickly.
- **Send feedback** — improving user-driven platform refinement.
- **Contact the platform team** — creating clear communication channels.

The contact system should include:
- **Validation handling** — preventing incorrect or incomplete submissions.
- **Loading states** — communicating processing status clearly.
- **Success feedback** — confirming successful form actions.
- **Error handling** — gracefully handling failed submissions.
- **Accessible form interactions** — supporting usability for all users.

Forms should feel responsive, smooth, visually polished, and easy to use.

Prevent:
- **Empty submissions** — ensuring required information is provided.
- **Invalid inputs** — maintaining proper form validation.
- **Broken requests** — preventing unstable submission behavior.
- **Confusing validation states** — clearly explaining errors to users.

All user actions should provide immediate visual feedback so users always understand the status of their submissions.

---

# 6. Backend Requirements

Create a scalable backend architecture capable of handling:
- **Authentication** — managing secure login and session systems.
- **APIs** — enabling structured frontend-backend communication.
- **Market data processing** — handling financial analytics efficiently.
- **Watchlist persistence** — storing user-selected stock information.
- **Session management** — maintaining secure user activity.
- **Future scalability requirements** — preparing the backend for expansion.

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
- **Secure** — protecting user and application data.
- **Modular** — supporting reusable backend systems.
- **Scalable** — preparing for larger datasets and future APIs.
- **Maintainable** — simplifying long-term development.
- **Production-ready** — following enterprise backend engineering standards.

Sensitive values such as JWT secrets, API keys, and database credentials must only exist inside `.env` files and should never be exposed publicly.

---

# 7. Data Processing Requirements

The platform should efficiently process:
- **Stock market data** — supporting financial analytics visualization.
- **Analytics information** — helping users understand market trends.
- **Watchlist data** — storing personalized stock tracking information.
- **API responses** — managing external service communication.
- **User-related data** — handling account and interaction systems securely.

Use Axios for API communication and keep all request handling centralized, reusable, and modular.

The system should properly handle:
- **Loading states** — communicating request progress clearly.
- **API failures** — preventing application crashes during request issues.
- **Retry logic** — improving reliability during unstable network conditions.
- **Empty responses** — gracefully handling missing data scenarios.
- **Invalid data** — validating responses before rendering.
- **Network interruptions** — maintaining stable user experience during failures.

Avoid:
- **Repeated API logic** — reducing duplication and technical debt.
- **Inefficient fetching patterns** — improving application performance.
- **Unnecessary rerenders** — maintaining optimized rendering behavior.
- **Scattered request handling** — keeping the data layer centralized and maintainable.

The data layer should remain optimized, scalable, and maintainable.

---

# 8. Output Requirements

The final output should include:
- **Premium fintech dashboard** — providing polished financial experiences.
- **Browser extension ecosystem** — enabling lightweight browser interactions.
- **Responsive layouts** — adapting naturally across screen sizes.
- **Animated financial charts** — making analytics visually engaging.
- **Scalable backend architecture** — supporting future expansion.
- **Reusable UI components** — improving maintainability and scalability.
- **Smooth motion systems** — enhancing UI storytelling and responsiveness.
- **Secure authentication** — protecting user sessions and access.
- **API integrations** — supporting market data communication.
- **Production-grade engineering quality** — matching enterprise-level standards.

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
- **Remove unnecessary sections** — preventing project clutter.
- **Remove duplicate utilities** — maintaining clean architecture.
- **Remove dead components** — avoiding unused code accumulation.
- **Maintain clean architecture** — supporting scalability and maintainability.

Avoid unnecessary project clutter.

---

# 9. Error Handling and Documentation

The platform should gracefully handle:
- **API failures** — preventing unstable user experiences.
- **Invalid requests** — validating incorrect interactions safely.
- **Empty states** — communicating missing data clearly.
- **Loading delays** — providing feedback during processing.
- **Authentication failures** — handling secure access properly.
- **Unexpected runtime issues** — preventing complete application crashes.

Provide:
- **Retry options** — allowing users to retry failed actions.
- **Loading indicators** — visually communicating processing states.
- **User-friendly feedback** — improving clarity during interactions.
- **Graceful fallbacks** — ensuring stability during failures.
- **Clean empty-state interfaces** — maintaining polished UX during missing content.

The application should never completely break because of failed requests.

Documentation should clearly explain:
- **Reusable utilities** — helping developers understand shared systems.
- **Architecture decisions** — documenting structural engineering choices.
- **API setup** — simplifying integration and maintenance.
- **Environment configuration** — guiding deployment and development setup.
- **Complex reusable systems** — improving long-term maintainability.

Avoid excessive comments everywhere, but document critical systems clearly enough for long-term maintainability.

---

# 10. Performance and Scalability

Performance optimization is extremely important. The platform should feel lightweight, smooth, responsive, and fast across all devices.

Implement:
- **Lazy loading** — reducing initial load time.
- **Dynamic imports** — optimizing bundle delivery.
- **Optimized rendering** — improving UI performance.
- **Efficient animation handling** — maintaining smooth motion systems.
- **Memoization where appropriate** — reducing unnecessary recalculations.
- **Reusable state management** — improving scalability and maintainability.

Avoid:
- **Oversized bundles** — preventing slow application loading.
- **Heavy client-side rendering** — improving runtime performance.
- **Unnecessary rerenders** — maintaining optimized UI updates.
- **Animation lag** — preserving smooth interactions.
- **Performance bottlenecks** — ensuring scalability under larger workloads.

The architecture should support future feature expansion, additional APIs, larger datasets, and long-term scalability.

---

# 11. Technology Stack

The project must strictly use:
- **Next.js 16 App Router** — for scalable React architecture.
- **React 19** — for modern frontend rendering patterns.
- **TypeScript** — for strict typing and maintainability.
- **Tailwind CSS v4** — for utility-first responsive styling.
- **Framer Motion** — for animation systems and transitions.
- **Recharts** — for financial data visualization.
- **Radix UI** — for accessible component primitives.
- **Axios** — for API request handling.
- **Date-fns** — for lightweight date utilities.

Follow modern engineering practices including:
- **Strict TypeScript typing** — reducing runtime issues.
- **Reusable component architecture** — improving scalability.
- **Modular folder organization** — simplifying maintainability.
- **Clean naming conventions** — improving readability.
- **Scalable code structure** — preparing for future growth.
- **Maintainable engineering standards** — supporting long-term development.

Avoid:
- **Deprecated APIs** — reducing future compatibility issues.
- **Hardcoded hacks** — maintaining clean architecture.
- **Duplicate logic** — preventing unnecessary complexity.
- **Oversized components** — improving maintainability.
- **Messy state management** — keeping application logic organized.
- **Unnecessary complexity** — simplifying development workflows.

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
- **Authentication handling** — managing secure extension access.
- **Popup interactions** — enabling lightweight user workflows.
- **Background services** — supporting asynchronous extension functionality.
- **API communication** — connecting extension systems to backend services.
- **Local storage management** — maintaining extension state and preferences.
- **Session persistence** — preserving authentication state securely.

The popup experience should feel:
- **Fast** — opening instantly without delays.
- **Minimal** — avoiding unnecessary clutter.
- **Responsive** — adapting properly to different viewports.
- **Modern** — matching premium fintech aesthetics.
- **Visually premium** — maintaining polished UI quality.

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
- **Analytics visualization** — helping users understand market performance.
- **User profile management** — handling account-related functionality.
- **Settings handling** — controlling preferences and personalization.
- **Support systems** — assisting users with troubleshooting and guidance.
- **Interactive financial insights** — making analytics more engaging and understandable.

The interface should remain:
- **Readable** — improving content clarity and usability.
- **Responsive** — adapting naturally across devices.
- **Modern** — maintaining up-to-date fintech aesthetics.
- **Easy to navigate** — simplifying user interaction flows.
- **Visually balanced** — preserving proper UI hierarchy and spacing.

The dashboard should never feel cluttered or confusing.

---

# Final Expectations

The final result should feel like a real-world fintech ecosystem created by an experienced engineering team rather than a beginner project or static portfolio demo.

The platform should include:
- **Premium UI/UX** — delivering polished and modern experiences.
- **Smooth motion systems** — improving engagement and responsiveness.
- **Responsive layouts** — ensuring usability across all screen sizes.
- **Browser extension ecosystem** — expanding platform accessibility.
- **Scalable backend architecture** — supporting future growth.
- **Production-grade code quality** — following enterprise engineering standards.
- **Secure authentication handling** — protecting user access and sessions.
- **Strong performance optimization** — maintaining fast rendering and smooth interactions.
- **Reusable component systems** — improving scalability and maintainability.
- **Modern engineering standards** — matching real-world development practices.

The final product should feel:
- **Enterprise-grade** — matching professional fintech platforms.
- **Highly polished** — maintaining premium visual quality.
- **Real-world deployable** — supporting actual production deployment.
- **Scalable for future growth** — enabling feature and system expansion.
- **Professionally engineered** — following maintainable architecture patterns.
- **Visually premium** — creating a modern fintech user experience.
