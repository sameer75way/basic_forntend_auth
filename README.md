# 🚀 Basic Frontend Auth (Production-Ready Template)

A scalable, production-grade frontend authentication system built with **React 19, TypeScript (strict), Redux Toolkit, RTK Query, React Router v7, Zod, and Tailwind CSS v4**.

This project follows enterprise-level architecture principles and strict TypeScript standards.

---

# 🏗️ Architecture Overview

This project enforces:

- ✅ Strict TypeScript (`no any`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`)
- ✅ Clean separation of concerns (slice / api / model)
- ✅ Data Router (React Router v7)
- ✅ RTK + RTK Query only (no local component state for auth)
- ✅ Zod validation everywhere
- ✅ Route-level access control
- ✅ Auth state persistence
- ✅ RBAC-ready user model
- ✅ Tailwind v4 (single styling system)

---

# 🧰 Tech Stack

| Layer        | Technology                          |
|-------------|--------------------------------------|
| Framework   | React 19 + TypeScript (strict mode)  |
| State Mgmt  | Redux Toolkit + RTK Query            |
| Routing     | React Router v7 (Data Router API)    |
| Validation  | Zod + React Hook Form                |
| Styling     | Tailwind CSS v4 (@tailwindcss/vite)  |
| Build Tool  | Vite                                 |

---

# ✨ Features

## 🔓 Public Routes
- `/` — Landing page
- `/login`
- `/signup`

➡ Automatically redirect to `/home` if already authenticated.

---

## 🔐 Protected Routes
- `/home` — Dashboard layout

➡ Redirect to `/` if not authenticated.

---

## 🔁 Authentication Flow

- Access token stored in Redux state
- Refresh token stored in `localStorage`
- Session survives page refresh
- Logout clears Redux + storage
- Auth state rehydrated on app load

---

## 🧠 RBAC-Ready

Every authenticated user contains:

```ts
role: 'user' | 'admin'
```

Sidebar and route-level role filtering can be enabled easily.

---

## 🧾 Validation (Zod)

- Email validation
- Password length rules
- Confirm password cross-field validation (signup)
- Fully inferred TypeScript types via `z.infer<>`

---

## ⚡ RTK Query

- Uses `fakeBaseQuery()` to simulate API using `localStorage`
- Fully typed request/response
- Easily swappable to real backend

To connect to a real API:
- Replace `queryFn` with `query`
- Replace `fakeBaseQuery` with `fetchBaseQuery`

---

# 📁 Project Structure

```
src/
├── app/
│   ├── hooks.ts                 # Typed Redux hooks
│   └── store.ts                 # Store configuration
│
├── features/
│   └── auth/
│       ├── api/
│       │   └── authApi.ts       # RTK Query login/signup
│       ├── model/
│       │   ├── types.ts         # User + AuthState interfaces
│       │   └── validation.ts    # Zod schemas
│       └── slice/
│           └── authSlice.ts     # Auth reducer + persistence
│
├── pages/
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   └── HomePage.tsx
│
├── shared/
│   ├── components/
│   │   ├── form/
│   │   │   └── FormInput.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Sidebar.tsx
│   │
│   └── routes/
│       ├── ProtectedRoute.tsx
│       ├── PublicOnlyRoute.tsx
│       └── router.tsx
│
└── main.tsx
```

---

# 🔐 Route Protection Rules

| Route | Not Authenticated | Authenticated |
|-------|-------------------|---------------|
| `/` | ✅ Allowed | 🔁 Redirect to `/home` |
| `/login` | ✅ Allowed | 🔁 Redirect to `/home` |
| `/signup` | ✅ Allowed | 🔁 Redirect to `/home` |
| `/home` | 🔁 Redirect to `/` | ✅ Allowed |

---

# 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Run Development Server

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

# 📜 Available Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check + build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

# 🔄 Connecting to a Real Backend

### Replace this in `authApi.ts`:

```ts
login: builder.mutation<AuthApiResponse, LoginInput>({
  query: (body) => ({
    url: '/auth/login',
    method: 'POST',
    body,
  }),
}),
```

### And change baseQuery:

```ts
baseQuery: fetchBaseQuery({
  baseUrl: 'https://your-api.com',
}),
```

You can then:
- Move refresh token to HTTP-only cookie
- Keep access token in memory
- Implement auto-refresh flow

---

# 🛡️ Production Considerations

- Store access token in memory only
- Use HTTP-only cookies for refresh tokens
- Add Axios/RTK middleware for auto refresh
- Add error boundary wrapper
- Add role-based route filtering
- Add network awareness handling
- Add toast notification system
- Add lazy loading + route splitting

---

# 🧪 Strict TypeScript Settings

Recommended `tsconfig.json` flags:

```json
{
  "strict": true,
  "noImplicitAny": true,
  "exactOptionalPropertyTypes": true,
  "noUncheckedIndexedAccess": true,
  "verbatimModuleSyntax": true
}
```

---

# 🏁 Summary

This template provides:

- Clean enterprise-level auth architecture
- Fully typed state and API
- Scalable folder structure
- Route-level access control
- Validation-first approach
- Backend-ready RTK Query layer

It is designed to be a foundation for real SaaS-grade applications.

---

# 📌 Future Enhancements

- 🔄 Refresh token auto-renew flow
- 🎭 Role-based protected routes
- 🎞 Framer Motion transitions
- 🌐 Network detection handling
- 📦 Code splitting + lazy routes
- 🔔 Toast notification system
- 🧱 Error boundaries

---

Built with production discipline and scalability in mind.