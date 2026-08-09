# Book Finder

A React + TypeScript application for searching books via the Open Library API, saving personal favourites, and managing a signed-in user session — built following the **MVVM (Model–View–ViewModel)** architecture.

🌐 **Live Demo:** [BookFinder](https://week3-ai-react-app.vercel.app/)

## Features

- 🔍 Search for books using the Open Library Search API
- 🎲 A random, varied selection of books shown on the Home screen on every visit
- ❤️ Save books to a personal Favourites list (stored per signed-in user)
- 🗑️ Remove books from Favourites
- 🔐 Email/password authentication (register, login, logout)
- 🔒 Protected `/favourites` route — redirects unauthenticated users to `/auth`
- 📱 Responsive, grid-based UI

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool and dev server
- **React Router** — client-side routing and protected routes
- **Firebase Authentication** — email/password auth
- **Firebase Realtime Database** — favourites storage, scoped per user
- **Open Library Search API** — book search and data
- Plain CSS (no UI framework)

## Architecture: MVVM

Each feature (Home, Favourites, Auth) follows the same three-layer pattern:

```
Model        → business logic, validation, calls to services (no React)
ViewModel    → React state + actions (custom hook, no JSX)
View         → presentational component (renders ViewModel output)
```

Services (`openLibraryService`, `firebaseService`, `authService`) are the only files that talk to external APIs/Firebase directly. Models call services; ViewModels call Models; Views call ViewModels. No layer skips ahead.

## Project Structure

```
src/
  components/
    Header/
      Header.tsx
      Header.css
    BookCard/
      BookCard.tsx
      BookCard.css
    ProtectedRoute.tsx
    RedirectIfAuthenticated.tsx
  context/
    AuthContext.tsx
  pages/
    Home/
      HomeModel.ts
      useHomeViewModel.ts
      HomeView.tsx
      HomeView.css
    Favourites/
      FavouritesModel.ts
      useFavouritesViewModel.ts
      FavouritesView.tsx
      FavouritesView.css
    Auth/
      AuthModel.ts
      useAuthViewModel.ts
      AuthView.tsx
      AuthView.css
  services/
    openLibraryService.ts
    firebaseService.ts
    authService.ts
  types/
    book.ts
    auth.ts
  App.tsx
  main.tsx
```

## Data Flow

**Home (search & browse):**
```
Open Library API → openLibraryService → HomeModel → useHomeViewModel → HomeView → BookCard
```

**Favourites (per signed-in user):**
```
Firebase Realtime Database → firebaseService → FavouritesModel → useFavouritesViewModel → FavouritesView → BookCard
```
Structure in the database: `users/{userId}/favourites/{bookId}`

**Authentication:**
```
Firebase Authentication → authService → AuthModel → useAuthViewModel → AuthView
                                       ↘ AuthContext (global user/authLoading/logout, consumed via useAuth())
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy `.env.example` to `.env` and fill in your own values:
```bash
cp .env.example .env
```

```
VITE_OPEN_LIBRARY_API_URL=https://openlibrary.org

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Get the Firebase values from **Firebase Console → Project settings → General → Your apps → SDK setup**, and the Realtime Database URL from **Firebase Console → Realtime Database**.

### 3. Run the app
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

## Routing

| Route         | Access                          | Description                          |
|---------------|----------------------------------|---------------------------------------|
| `/`           | Public                          | Home — search and browse books        |
| `/favourites` | Protected (signed-in users only) | View and manage saved favourites      |
| `/auth`       | Public (redirects if signed in)  | Login / Create account                |

Clicking the Favourite button while signed out redirects to `/auth` instead of saving.


