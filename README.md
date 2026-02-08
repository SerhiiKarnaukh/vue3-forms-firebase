# Vue3 Forms with Firebase

![App Screenshot](https://github.com/SerhiiKarnaukh/vue3-forms-firebase/blob/master/products_store.jpg)

## Overview

A Vue.js 3 single-page application that implements a secure authentication system using Firebase. The primary objective is to restrict access to the main page until the user logs in, achieved through Firebase token-based authentication.

The application features two forms — **Registration** and **Login** — styled with Vuetify for a modern, professional appearance, and validated with Vuelidate to ensure data integrity before submission.

## Live Demo

You can test the app on a remote server: <https://vue3-forms-firebase.web.app>

You can create your own account or use test data.

### Test User

```
email: test@mail.com
password: 12345678
```

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Vue.js 3](https://vuejs.org/) | 3.5.x | Core UI framework (Composition & Options API) |
| [Vuex](https://vuex.vuejs.org/) | 4.1.x | Centralized state management |
| [Vue Router](https://router.vuejs.org/) | 5.0.x | Client-side routing with navigation guards |
| [Vuelidate](https://vuelidate-next.netlify.app/) | 2.0.x | Form validation |
| [Axios](https://axios-http.com/) | 1.13.x | HTTP client for API requests |
| [Vuetify](https://vuetifyjs.com/) | 3.11.x | Material Design UI component framework |
| [Vite](https://vitejs.dev/) | 7.x | Build tool and development server |
| [Firebase](https://firebase.google.com/) | REST API | Authentication and hosting |

## Features

- **User Registration** — sign-up form with email and password, validated by Vuelidate, submitted to the Firebase Auth REST API.
- **User Login** — login form with email and password, validated by Vuelidate; on success a Firebase ID token is stored locally.
- **Route Protection** — Vue Router navigation guards restrict access to authenticated-only pages; unauthenticated users are redirected to the login page.
- **Token-based Authentication** — Firebase tokens are generated during login and persisted in `localStorage` to maintain the session.
- **Product Catalog** — the protected main page fetches and displays product data from the [DummyJSON](https://dummyjson.com/) API.
- **Product Detail** — individual product pages with an image carousel.
- **Responsive Design** — Vuetify components with a mobile-friendly navigation drawer.
- **Theme Toggle** — switch between light and dark themes.
- **Error Handling** — Firebase error codes are mapped to user-friendly messages.

## Project Structure

```
src/
├── main.js                        # App entry point, Axios & plugin setup
├── App.vue                        # Root component
├── assets/                        # Static assets (logo, images)
├── components/
│   ├── TheNavbar.vue              # Responsive navigation bar with auth-aware links
│   ├── TheFooter.vue              # Footer with navigation links
│   └── ui/
│       └── AppMessage.vue         # Dismissible alert/message component
├── plugins/
│   ├── vuetify.js                 # Vuetify plugin configuration & custom theme
│   └── webfontloader.js           # Web font loading
├── router/
│   └── index.js                   # Routes and navigation guard
├── store/
│   ├── index.js                   # Vuex root store (global messages)
│   └── modules/
│       └── auth.module.js         # Auth state, login/register actions, token management
├── utils/
│   └── error.js                   # Firebase error-code-to-message mapping
└── views/
    ├── HomeView.vue               # Product listing (protected)
    ├── LoginView.vue              # Login form
    ├── SignupView.vue             # Registration form
    ├── ProductDetailView.vue      # Single product page (protected)
    └── NotFoundView.vue           # 404 page
```

## Architecture

### Authentication Flow

1. **Registration** — `SignupView` collects email and password, validates them with Vuelidate, then dispatches the `auth/register` Vuex action which POSTs to the Firebase `signUp` endpoint. On success the user is redirected to the login page.
2. **Login** — `LoginView` collects credentials, validates them, then dispatches `auth/login` which POSTs to the Firebase `signInWithPassword` endpoint. The returned ID token is saved to `localStorage` and Vuex state.
3. **Guard** — `router.beforeEach` checks each route's `meta.auth` flag against `store.getters['auth/isAuthenticated']`. Protected routes redirect unauthenticated users to `/login?message=auth`.
4. **Logout** — clears the token from both Vuex state and `localStorage`, then redirects to the login page.

### State Management (Vuex)

- **Root store** — holds a global `message` object (text + type) with auto-clear after 5 seconds.
- **`auth` module** (namespaced) — manages `token` state, `login`/`register` actions, and an `isAuthenticated` getter.

### Routing

| Path | View | Auth Required |
|---|---|---|
| `/` | `HomeView` | Yes |
| `/login` | `LoginView` | No |
| `/signup` | `SignupView` | No |
| `/product_detail/:product_id` | `ProductDetailView` | Yes |
| `*` | `NotFoundView` | No |

### Form Validation (Vuelidate)

Both forms enforce the following rules before submission:

- **Email** — required, must be a valid email format.
- **Password** — required, minimum length of 6 characters.

Validation errors are displayed inline beneath each field using Vuetify's `error-messages` prop.

## Prerequisites

### Node.js version

```
v22.20.0
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SerhiiKarnaukh/vue3-forms-firebase.git
cd vue3-forms-firebase
```

### 2. Configure environment variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_FB_KEY` | Your Firebase Web API key |
| `VITE_REMOTE_DJANGO_HOST` | URL of the companion Django backend (optional) |
| `VITE_REMOTE_VUE_HOST` | URL of the companion Vue app (optional) |

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run serve
```

### 7. Lint and fix files

```bash
npm run lint
```

## Deployment

The project is configured for **Firebase Hosting** with a GitHub Actions CI/CD pipeline (`.github/workflows/firebase-hosting-merge.yml`) that automatically deploys the `dist` folder on merge to the `master` branch.

Manual deploy:

```bash
npm run build
firebase deploy
```

## Customize Configuration

See [Vite Configuration Reference](https://vite.dev/config/).
