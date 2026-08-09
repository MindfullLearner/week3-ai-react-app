# AI Prompts Used During Development

This document contains the AI prompts used to assist in the development of the **Book Finder** React application.

---

## Prompt 1 – Initialize the Project

Initialize a new React application using Vite, React, and TypeScript.

Use functional components only.

Do not install any UI library.

Do not add any book-related functionality yet.

---

## Prompt 2 – Clean the Default Vite Project

Remove all default Vite content, images, styles, and demonstration code.

Leave a minimal working React application with an empty App component.

Do not create any additional components or functionality.

---

## Prompt 3 – Create the Header Component

Create a reusable Header component.

The Header should contain:

- a Home navigation link
- a Favourites navigation link
- a search input
- a Search button

Use React Router links for navigation.

Only create and display the Header.

Do not create the Home or Favourites pages yet.

Do not connect the search input to any functionality.

---

## Prompt 4 – Style the Header

Add clean, responsive CSS styling to the existing Header component.

Requirements:

- Keep the design simple and modern.
- Display the application title on the left.
- Display the navigation links next.
- Keep the search input and Search button aligned on the right.
- Ensure the layout remains responsive on smaller screens.
- Use plain CSS only.
- Do not modify the existing component structure or functionality.

---

## Prompt 5 – Create the Home MVVM Structure

Create the empty MVVM file structure for the Home page of the Book Finder application.

Create:

- `src/pages/Home/HomeModel.ts`
- `src/pages/Home/useHomeViewModel.ts`
- `src/pages/Home/HomeView.tsx`

Requirements:

- HomeModel.ts will later contain book-related data models and business logic.
- useHomeViewModel.ts will later contain React state, actions, and API interaction logic.
- HomeView.tsx will later render the Home page user interface.

Create only minimal placeholder exports so the application can compile.

---

## Prompt 6 – Create the Favourites MVVM Structure

Create the empty MVVM file structure for the Favourites page of the Book Finder application.

Create:

- `src/pages/Favourites/FavouritesModel.ts`
- `src/pages/Favourites/useFavouritesViewModel.ts`
- `src/pages/Favourites/FavouritesView.tsx`

Requirements:

- FavouritesModel.ts will later contain favourite book data models and business logic.
- useFavouritesViewModel.ts will later contain React state, actions, and favourite book management logic.
- FavouritesView.tsx will later render the Favourites page user interface.

Create only minimal placeholder exports so the application can compile.

Do not add localStorage, API requests, React state, book cards, or other functionality.

Keep the code clean, beginner-friendly, and follow the MVVM architecture.

Do not add API requests, React state, book search functionality, or UI components yet.

Keep the code clean, beginner-friendly, and follow the MVVM architecture.

---
No `README.md` has been uploaded to this session, so I don't have your actual current file — I don't want to guess at its existing sections and risk overwriting or restructuring content you didn't ask me to touch.

Could you paste your current `README.md` content, or upload the file? Once I have it, I'll leave everything else exactly as-is and only append a new `## AI Prompts Used` section at the end (or wherever makes sense given its structure — e.g. after a "Development Notes" section if one exists).

In the meantime, here's the **"AI Prompts Used" section** built strictly from the actual prompts given in this conversation, in chronological order, with debugging-only exchanges excluded per your instruction (I kept prompts that requested actual code changes — including bug-fix requests that resulted in modifications like the router-hierarchy fix — since those were genuine implementation prompts, not just diagnostic back-and-forth):

---

### 7 - Project structure & Favourites MVVM scaffold


I'm building a React + TypeScript Book Finder application.
The project follows the MVVM architecture.
Current structure:
```
src/
  components/
    Header/
      Header.css
      Header.tsx
  pages/
    Home/
      HomeModel.ts
      useHomeViewModel.ts
      HomeView.tsx
  App.tsx
  main.tsx
```
The Home MVVM structure already exists.
Now implement the following requirement:
[Create the empty MVVM file structure for the Favourites page of the Book Finder application.
```
Create:
- src/pages/Favourites/FavouritesModel.ts
- src/pages/Favourites/useFavouritesViewModel.ts
- src/pages/Favourites/FavouritesView.tsx
```
Requirements:
- FavouritesModel.ts will later contain favourite book data models and business logic.
- useFavouritesViewModel.ts will later contain React state, actions, and favourite book management logic.
- FavouritesView.tsx will later render the Favourites page user interface.

Create only minimal placeholder exports so the application can compile.

Do not add localStorage, API requests, React state, book cards, or other functionality.

Keep the code clean, beginner-friendly, and follow the MVVM architecture.]
Do not modify any existing functionality unless necessary.
Keep the code consistent with the existing project.


### 8 - Open Library service setup

Create a services folder and an empty Open Library API service file.
Create:
```
src/services/openLibraryService.ts
```
Requirements:
- Add a short comment explaining that this file will contain communication with the Open Library API.
- Export a placeholder so the project can compile.
- Do not implement any API requests yet.
- Do not add fetch, axios, React state, or business logic.
- Keep the file clean and beginner-friendly.

---

### 9 - Open Library API implementation

Implement the Open Library book search request inside:
```
src/services/openLibraryService.ts
```
Create an exported async function:
```
searchBooks(query: string): Promise<Book[]>
```
Requirements:
- Use the Open Library Search API.
- Read the API base URL from VITE_OPEN_LIBRARY_API_URL.
- Encode the search query before sending the request.
- Use the Book and OpenLibrarySearchResponse types.
- Return an array of Book objects.
- Throw a readable error when the HTTP request fails.
- Throw a readable error when no books are found.
Do not use React hooks.
Do not use useEffect.
Do not manage loading, error, or component state.
Keep the implementation clean, beginner-friendly, and well commented where necessary.

---

### 10. Temporary debug logging for Open Library integration

Add temporary console logs to verify that the Open Library API integration is working correctly.
Requirements:
- Log the encoded search query before making the request.
- Log the full API response after a successful request.
- Log the array of books returned by searchBooks().
- Log any errors before throwing them.
Only add console logs for debugging purposes.
Do not modify the existing functionality or API logic.
Do not add React hooks, component state, or UI changes.

---

### 11 - Temporary manual API test trigger

i am not asking for adding Home and Favourite view to test API we need it here how ill i test my API on browser if u don't make temprorray some chnages for it in app.tsx

---

### 12 - Home Model implementation

Implement the Home model inside:
```
src/pages/Home/HomeModel.ts
```
Import searchBooks from openLibraryService.
Create and export:
```
getBooks(query: string): Promise<Book[]>
```
Responsibilities:
- Trim the query.
- Validate that the query contains at least two characters.
- Call searchBooks with the cleaned query.
- Return the list of books.
Do not use React hooks.
Do not use useState or useEffect.
Do not call fetch directly.
Keep the implementation clean, beginner-friendly, and follow the MVVM architecture.

---

### 13 - Home ViewModel implementation

Implement a custom hook inside:
```
src/pages/Home/useHomeViewModel.ts
```
Create and export:
useHomeViewModel()
Manage these properties using useState:
- query
- books
- loading
- error
Create a function:
handleSearch()
The function should:
- set loading to true
- clear the previous error
- call getBooks from HomeModel using the current query
- save the returned book list in books state
- store a readable error if the request fails
- set loading to false when finished
Return:
- query
- setQuery
- books
- loading
- error
- handleSearch
Do not render JSX.
Do not call fetch directly.
Do not import openLibraryService directly.
Keep the implementation clean, beginner-friendly, and follow the MVVM architecture.

---

### 14 - Home View implementation

Implement the Home view inside:
```
src/pages/Home/HomeView.tsx
```
Requirements:
- Import and use useHomeViewModel.
- Display the current search input.
- Connect the input value to query.
- Update query using setQuery.
- Call handleSearch when the Search button is clicked.
- Also allow searching by submitting the form.
- Display a loading message while loading is true.
- Display the error message when error exists.
- Render the book list using .map().
- Display the book title, author, first publish year, and cover image.
Do not call fetch directly.
Do not import HomeModel or openLibraryService.
Do not implement favourites yet.
Do not create a reusable BookCard component yet.
Keep the implementation clean, beginner-friendly, and follow the MVVM architecture.

---

### 15 - Search input moved into Header

we dont need here search input because we have it already in the header

---

### 16 - Random initial book selection logic

Create an initialBooks() function inside HomeModel.
Requirements:
- Automatically fetch at least 20 books when the Home screen opens.
- Every application launch should display a different selection of books.
- Generate the book list by randomly selecting search keywords from a predefined seed list, for example:
  Fantasy, Mystery, Romance, Science Fiction, Adventure, History, Thriller, Horror, Comedy, Psychology, Programming, Technology, Biography, Philosophy, Fiction
- Use Promise.all to execute the search requests in parallel.
- Merge all results into a single array.
- Remove duplicate books using the book id.
- Shuffle the final array.
- Return exactly 20 unique books.
- Keep all fetching and selection logic inside HomeModel.
- Use the existing openLibraryService.
- Do not use React hooks.
- Do not call fetch directly.
- Reuse the existing Book type and getBooks/searchBooks functionality where appropriate.

---

### 17 - BookCard component

Create a reusable BookCard component.
Create:
```
src/components/BookCard/BookCard.tsx
```
Requirements:
- receive one Book object through props
- display:
  - cover image
  - title
  - author
  - first publish year
- add a Favourite button, but do not connect it yet
- use the shared Book type
- keep the component presentational
- do not call APIs
- do not use Firebase
- do not manage the book list
Update HomeView to render BookCard using .map().
Keep the existing MVVM architecture unchanged.
Do not add any additional functionality.
Also create:
```
src/components/BookCard/BookCard.css
```
Add simple, clean styling for the BookCard and import the stylesheet into BookCard.tsx.
Do not add any UI library.
Do not change the existing application styling.

---

### 18 - BookCard styling improvement

Review the current BookCard.css and improve it so that its structure and quality are consistent with the mentor's MovieCard styling pattern.
Use the following MovieCard CSS as a reference for layout, spacing, responsive card structure, typography, image handling, placeholder handling, and Favourite button positioning: [reference CSS provided]
Adapt the styling specifically for BookCard.
Requirements:
- Keep the existing BookCard class names.
- Use the BookCard's existing structure and fields.
- Use a consistent card height with height: 100%.
- Use an aspect ratio for the book cover instead of a fixed image height.
- Create a flexible card body so cards can have consistent heights.
- Keep the Favourite button aligned toward the bottom using the card layout.
- Keep the placeholder cover properly centered.
- Maintain clean spacing and readable typography.
- Keep the styling simple and consistent with the existing application.
- Do not copy movie-specific names or functionality.
- Do not change BookCard.tsx unless required to make the existing CSS work.
- Do not add any new functionality.
- Do not install any libraries.
Before making changes, briefly explain what aspects of the current BookCard.css are weaker than the reference styling.


---

### 19 - Responsive grid layout for Home

The BookCard styling is now improved, but the cards are rendering incorrectly.
Review the current HomeView.tsx and BookCard.css.
HomeView renders BookCard components inside a .book-list container.
There is currently no HomeView.css.
The BookCard is expanding to almost the full page width, causing the book cover to become extremely large.
Create:
```
src/pages/Home/HomeView.css
```
Requirements:
- Style .book-list as a responsive grid for BookCard components.
- Make multiple book cards appear in each row on desktop, similar to the mentor's Movie Search application.
- Give each card a reasonable and consistent width.
- Make the grid responsive for smaller screens.
- Do not change BookCard.tsx.
- Do not change BookCard.css.
- Do not change the search functionality.
- Do not add any new functionality.
- Import HomeView.css into HomeView.tsx.
- Keep the styling simple and consistent with the existing application.
First inspect the existing files before making changes.

---

### 20 - Fixing the Home reload-on-navigation bug

When I search for a movie using the search field and then click the Home navigation link, the Home page does not reload the random movie selection.
Expected behavior:
- Searching should display the search results.
- Clicking Home should trigger the existing initialMovies() logic.
- Home should then display a new random selection of movies.
- The random movie selection should be fetched again rather than keeping the previous search results.
Debug this issue by inspecting the existing Header, App, HomeView, useHomeViewModel, and HomeModel implementations.
Requirements:
- Identify the root cause before making changes.
- Reuse the existing initialMovies() function.
- Do not duplicate the movie-fetching logic.
- Do not change the search behavior.
- Do not add new API services.
- Do not introduce unnecessary state.
- Keep fetching/business logic inside HomeModel.
- Keep React state and actions inside useHomeViewModel.
- Keep HomeView presentational.
- Make the smallest necessary changes to fix the issue.
After making the changes, explain:
1. What caused the Home button to do nothing.
2. Which files you changed.
3. How the fix causes Home to reload a new random movie selection.

---

### 21 - Firebase initialization

Create and configure Firebase for the Book Finder application.
Create:
```
src/services/firebaseService.ts
```
Requirements:
- initialize Firebase using environment variables
- export the database instance
- use the Firebase configuration values from the Vite environment variables
- do not save or load any books or favourites yet
- do not modify HomeView
- do not add authentication
- keep this file limited to Firebase initialization and database setup

---

### 22 - Firebase favourites functions

Inside src/services/firebaseService.ts, add functions for managing favourite books.
Create:
```
- addFavourite(book: Book): Promise<void>
- removeFavourite(id: string): Promise<void>
- getFavourites(): Promise<Book[]>
```
Requirements:
- use the book's id as the unique identifier
- use the existing Book type from src/types/book.ts
- use Firestore for storing and retrieving favourite books
- keep all Firebase communication inside this service
- return typed data
- throw readable errors when operations fail
- do not use React hooks
- do not update the UI yet
- do not modify HomeView
- do not modify the HomeViewModel
- do not implement authentication yet

---

### 23 - Favourites Model
Implement the Favourites model inside:
```
src/pages/Favourites/FavouritesModel.ts
```
Import the Firebase service functions from firebaseService.ts.
Create and export:
```
- loadFavourites(): Promise<Book[]>
- saveFavourite(book: Book): Promise<void>
- deleteFavourite(id: string): Promise<void>
```
Requirements:
- import and use the existing Book type from src/types/book.ts
- act only as a wrapper around firebaseService
- do not call Firebase directly outside firebaseService.ts
- use the book's id as the unique identifier
- do not use React hooks
- do not manage loading state
- do not manage error state
- do not modify FavouritesView
- do not modify HomeView
- do not add authentication

---

### 24 - Favourites ViewModel
Implement a custom hook inside:
```
src/pages/Favourites/useFavouritesViewModel.ts
```
Create and export:
```
useFavouritesViewModel()
```
Manage with useState:
- favourites
- loading
- error
Create functions:
- loadBooks()
- removeBook(id: string)
Requirements:
- use FavouritesModel only
- import and use loadFavourites() and deleteFavourite() from FavouritesModel
- load favourites when the screen opens
- use useEffect for the initial load
- update local state after a book is removed
- store a readable error if loading or removing a favourite fails
- set loading appropriately during asynchronous operations
- return all state and actions required by FavouritesView
- do not render JSX
- do not import firebaseService directly
- do not import or call Open Library directly
- do not add authentication yet

---

### 25 - Favourites View
Implement the Favourites view inside:
```
src/pages/Favourites/FavouritesView.tsx
```
Requirements:
- import and use useFavouritesViewModel
- display a loading message while loading
- display an error message when error exists
- render favourite books using BookCard and .map()
- show a friendly empty message when there are no favourites
- allow removing a book from favourites
- use the existing Book type and book data structure
- do not call Firebase directly
- do not import FavouritesModel directly
- do not import firebaseService directly
- do not create a new BookCard component in this step if one does not already exist
- do not add authentication yet

--- 

### 26 - Connecting the favourite button (Home)

Connect the favourite button on each BookCard to the existing favourites functionality.
Current architecture:
BookCard → HomeView → useHomeViewModel → HomeModel → Open Library
FavouritesView → useFavouritesViewModel → FavouritesModel → firebaseService → Firestore
Problem:
When the user clicks the favourite button on a book card, nothing currently happens.
Requirements:
- make the favourite button call the existing favourite functionality
- use the existing FavouritesModel/service architecture
- add the selected Book to Firestore when the favourite button is clicked
- use the book's existing id as its unique identifier
- do not call Firebase directly from BookCard or HomeView
- do not import firebaseService directly into the UI components
- update the local UI state so the user can see that the book has been added to favourites
- handle errors with a readable error message
- do not create a second Firebase implementation
- do not change the Open Library API logic
- keep the existing MVVM structure
- do not add authentication yet
Before making changes, inspect the existing BookCard, HomeView, useHomeViewModel, FavouritesModel, and firebaseService files and use the existing functions rather than creating duplicate logic.

---

### 27 - Switching from Firestore to Realtime Database

The Firebase database I created for this Book Finder project is Firebase Realtime Database, not Cloud Firestore.
[Firebase console details provided]
The current firebaseService.ts incorrectly uses getFirestore() and firebase/firestore.
Update the Firebase setup to use Firebase Realtime Database instead.
Requirements:
- use the existing Firebase app initialization and environment variables
- use Firebase Realtime Database APIs
- export the Realtime Database instance
- use the existing VITE Firebase environment variables
- remove the Cloud Firestore-specific imports and setup
- do not implement favourites yet
- do not modify HomeView
- do not modify FavouritesView
- do not add authentication
- do not add React hooks
Before changing anything, inspect the current firebaseService.ts and package.json and make only the changes necessary to switch from Cloud Firestore to Realtime Database.

---

### 28 - Rewriting favourites functions for Realtime Database
[Provided current firebaseService.ts using Firestore]
set it accordingly
---

### 29 - Debugging incomplete Favourites card data
I need you to debug the current favourite-book flow. Do not rewrite the feature or make speculative changes.
I have verified the following:
1. When I click the Favourite button for a book, the book IS successfully added to my Firebase Realtime Database under the "favourites" node.
2. The book also appears on the Favourites page, so the data is being retrieved from Firebase.
3. However, the favourite card is incomplete. The card appears, but the book title, author, and cover are missing. "First published: Unknown" is displayed.
4. After adding a favourite, the Home screen also shows a "Failed to fetch" error.
5. Firebase configuration and the Realtime Database write should NOT be changed because the write is already confirmed to work.
Inspect the complete data flow and identify the actual cause before changing code: [full data flow provided]
Specifically verify: [list of verification points]
Add temporary console logs if necessary to inspect the actual Book object: [log locations specified]
Preserve the existing MVVM architecture.
Do NOT: change Firebase configuration, change the Realtime Database structure, change Firebase security rules, switch back to Firestore, change the Open Library API, add authentication, rewrite unrelated components, create duplicate services.
First explain the root cause you found. Then make only the minimal changes required to fix the data mismatch/error.

---

### 30 - Remove Favourite button on Favourites page
Update the Favourites page so that favourite books display a "Remove" button instead of the "Favourite" button.
Requirements:
- Only change the Favourites page/card behaviour.
- Home page cards must continue showing the "Favourite" button.
- Favourites page cards must show "Remove Favourite".
- Clicking "Remove Favourite" must call the existing removeMovie() action from useFavouritesViewModel.
- Use the book's existing unique id property when removing the book.
- After successful removal, the book should immediately disappear from the Favourites page.
- The removal must also remove the book from Firebase Realtime Database through the existing MVVM/service flow.
- Do not call Firebase directly from the view.
- Do not import firebaseService directly into FavouritesView.
- Do not change the Firebase database structure.
- Do not modify the Home search functionality.
- Do not create duplicate remove/delete functions.
- Preserve the existing MVVM architecture.
First inspect the current FavouritesView, useFavouritesViewModel, FavouritesModel, firebaseService, and the reusable book card component to determine the minimal change required.

---

### 31 - Adding Authentication and Firestore support to Firebase config

Update the existing Firebase configuration to also support Firebase Authentication and Cloud Firestore.
Important context:
- This project is a Book Finder application.
- Firebase Realtime Database is currently being used for the existing favourites functionality.
- The existing Realtime Database favourites functionality is working correctly.
- Do NOT replace or remove the existing Realtime Database setup.
- Do NOT modify any existing favourite add/remove/load logic.
Requirements:
- initialize Firebase Authentication using getAuth
- initialize Cloud Firestore using getFirestore
- keep the existing Realtime Database initialization because the current favourites feature depends on it
- export the Firebase Authentication instance as auth
- export the Cloud Firestore instance as firestoreDb
- keep the existing Realtime Database instance exported as db
- read all Firebase configuration from Vite environment variables
- use the modern modular Firebase SDK
- do not add registration or login UI yet
- do not add or modify any favourites logic
- do not migrate favourites from Realtime Database to Firestore yet
Create or update:
```
src/services/firebaseService.ts
```
Also create:
.env.example
The .env.example file should contain placeholder Firebase environment variables only, without real credentials.
Preserve the existing working functionality and MVVM architecture.

---

### 32 - Auth Service
Create:
```
src/services/authService.ts
```
Implement and export these functions:
- registerUser(email: string, password: string)
- loginUser(email: string, password: string)
- logoutUser()
- subscribeToAuthChanges(callback)
Requirements:
- use the existing Firebase Authentication instance auth from firebaseService.ts
- use createUserWithEmailAndPassword for registration
- use signInWithEmailAndPassword for login
- use signOut for logout
- use onAuthStateChanged inside subscribeToAuthChanges
- return typed Firebase User data where appropriate
- convert Firebase errors into readable messages
- do not use React hooks
- do not use useState or useEffect
- do not render JSX
Important:
- Do not modify firebaseService.ts unless required to import the existing auth instance.
- Do not modify any favourites functionality.
- Do not use the Realtime Database or Firestore in this service.
- Do not create login, registration, or authentication UI yet.

---

### 33 - Auth MVVM scaffold
Create the MVVM file structure for authentication.
Create:
```
src/pages/Auth/AuthModel.ts
src/pages/Auth/useAuthViewModel.ts
src/pages/Auth/AuthView.tsx
```
Requirements:
- add minimal typed placeholder exports
- ensure the application still compiles
- do not implement registration or login yet
- do not add routing yet
- do not add authentication UI yet
- do not modify Home or Favourites functionality
- do not modify the existing Firebase Realtime Database favourites logic
- do not call Firebase directly from these files yet

---

### 34 - Auth Model implementation

Implement ``` src/pages/Auth/AuthModel.ts ```
Import the authentication functions from authService.
Create and export:
- register(email: string, password: string)
- login(email: string, password: string)
- logout()
Responsibilities:
- trim and normalize the email address
- validate that the email and password are not empty
- validate that the password contains at least six characters
- call the corresponding authService function
- return the authenticated Firebase User where appropriate
Do not use React hooks.
Do not call Firebase Authentication directly outside authService.
Do not manage UI state.
Do not modify Home or Favourites functionality.
Do not modify the existing Firebase Realtime Database favourites logic.

---

### 35 - Auth ViewModel implementation

Implement the useAuthViewModel custom hook inside:
```
src/pages/Auth/useAuthViewModel.ts
```
Manage these values using useState:
- email
- password
- mode, which can be "login" or "register"
- loading
- error
Create these functions:
- handleSubmit()
- toggleMode()
Requirements:
- handleSubmit should call AuthModel.login when mode is "login"
- handleSubmit should call AuthModel.register when mode is "register"
- clear previous errors before submitting
- manage the loading state correctly
- store readable errors
- clear the password after successful authentication
- return all state and functions needed by AuthView
- do not render JSX
- do not call Firebase directly
- do not import authService directly
- do not modify Home or Favourites functionality
- do not modify the existing Firebase Realtime Database favourites logic

--- 

### 36 - Auth View implementation

Implement ```src/pages/Auth/AuthView.tsx ```
Also create:
src/pages/Auth/AuthView.css
Requirements:
- use useAuthViewModel
- display either "Login" or "Create Account" based on the current mode
- add a controlled email input
- add a controlled password input
- add a submit button
- disable the submit button while loading
- display readable validation or Firebase errors
- add a button for switching between login and registration
- submit the form using onSubmit
- prevent the default browser form submission
- style the authentication view using AuthView.css
- import AuthView.css into AuthView.tsx
Do not call Firebase directly.
Do not import AuthModel or authService.
Do not modify Home or Favourites functionality.
Do not modify the existing Firebase Realtime Database favourites logic.
Keep the existing MVVM architecture.

---

### 37 - Global AuthContext
Create a global authentication context.
Create:
```
src/context/AuthContext.tsx
```
Requirements:
- use onAuthStateChanged through the existing authService
- store the current Firebase user
- store an authLoading state while Firebase restores the session
- expose: user, authLoading, logout
- wrap the application with AuthProvider
- update src/main.tsx to wrap the application with AuthProvider
- unsubscribe from the authentication listener when the provider unmounts
- show a loading state while authentication is being initialized
- do not add favourites logic
- do not modify the existing Firebase Realtime Database favourites functionality
- do not modify the authentication service unless absolutely necessary
- use the existing authService instead of calling Firebase Authentication directly
- preserve the existing MVVM architecture

---

### 38 - Fixing a truncated AuthContext.tsx file

[Reported: application not compiling; AuthProvider import/render error]
The current main.tsx contains: import { AuthProvider } from "./context/AuthContext.tsx";
[Pasted current AuthContext.tsx, main.tsx, useAuthViewModel.ts, authService.ts]
First inspect the current project and identify the actual cause of the compilation errors... fix only the actual errors preventing compilation... preserve the existing authentication functionality, Book Finder functionality, and Firebase Realtime Database favourites functionality.

---

### 39 - Types organization

Move all shared TypeScript types under:
```
src/types/
```
Requirements:
- inspect the existing project and identify TypeScript type/interface files that represent shared application data
- move those shared types into the src/types/ directory
- preserve the existing Book and Open Library API types
- update all import paths throughout the project after moving the files
- do not change the definitions of the types
- do not change application behavior
- do not modify Firebase functionality
- do not modify authentication functionality
- do not modify favourites functionality
- ensure the application still compiles after the refactoring

---

### 40 - Routing and protected routes

Update the application routing.
Requirements:
- add an /auth route that displays AuthView
- allow HomeView to remain publicly accessible at /
- protect the /favourites route
- when an unauthenticated user opens /favourites, redirect them to /auth
- when an authenticated user opens /auth, redirect them to /
- preserve the Header on every page
- use the user and authLoading values from AuthContext
- while authLoading is true, do not make an authentication-based redirect decision yet
- use React Router navigation/redirects
- preserve the existing MVVM architecture
- do not modify HomeView functionality
- do not modify FavouritesView functionality
- do not modify Firebase or authentication service logic
- do not add new authentication functionality
Before changing files, inspect the existing App.tsx, AuthContext.tsx, AuthView.tsx, Header.tsx, HomeView.tsx, and FavouritesView.tsx and make the minimum routing changes required.

---

### 41 - Unauthenticated favourite-click redirect

Update the Home page favourite-button behavior.
Requirements:
- when an unauthenticated user clicks the Favourite button on a movie in HomeView, redirect them to /auth
- when an authenticated user clicks the Favourite button, preserve the existing behaviour of adding the movie to favourites
- use the current authentication state from AuthContext
- do not call Firebase Authentication directly from HomeView
- do not call Firebase directly from HomeView
- preserve the existing MVVM architecture
- do not modify the existing Firebase favourites service
- do not change the existing favourites data structure
- do not change the Home search functionality
- do not change the protected /favourites route
- do not add new authentication features
Inspect the existing HomeView, useHomeViewModel, App.tsx, AuthContext, and routing before making changes.
Make the minimum changes required to implement this behaviour.

---

### 42 - Moving favourite-click logic into the ViewModel
Move the favourite click logic from HomeView to the Home ViewModel.
Context:
The unauthenticated favourite-button redirect logic was recently added to HomeView. It currently decides what to do when a user clicks the Favourite button.
Requirements:
- move the favourite click decision/logic into: src/pages/Home/useHomeViewModel.ts
- use the authentication state from AuthContext inside the ViewModel
- create/update the ViewModel action responsible for handling a favourite click
- if the user is unauthenticated, navigate to /auth
- if the user is authenticated, preserve the existing favourite functionality
- HomeView should only call the ViewModel action and should not contain authentication or navigation decision logic
- keep the existing MVVM architecture
- do not call Firebase directly from HomeView
- do not move Firebase logic into the ViewModel
- do not change the existing favourites service
- do not change the existing authentication service
- do not change the existing routing rules
- do not change the movie search functionality
- make the minimum changes necessary
After the changes, ensure the application still compiles and the favourite button behaves correctly for both authenticated and unauthenticated users.
---

### 43 - User-specific favourites in Realtime Database

Update the existing favourites service so favourites are stored under the signed-in user's profile.
Use this Realtime Database structure:
users/{userId}/favourites/{imdbID}
Update the existing functions so they receive userId:
- addFavourite(userId: string, movie: Movie)
- removeFavourite(userId: string, imdbID: string)
- getFavourites(userId: string)
Requirements:
- use userId as the parent user ID
- use imdbID as the unique favourite movie ID
- preserve the existing function behaviour
- do not use React hooks
- do not access auth.currentUser inside the service
- throw a readable error when userId is missing
- keep all Firebase Realtime Database communication inside the service
- do not modify the authentication service
- do not add new authentication functionality
- do not modify the UI yet
After making the changes, verify that the TypeScript/build check succeeds.

---

### 44 - Logout button

Add a Logout button to the existing application header and connect it to the existing logout functionality.
Requirements:
- display a Logout button in Header
- use the existing logout function from AuthContext
- do not call Firebase Authentication directly from Header
- only show the Logout button when a user is authenticated
- keep the existing Home and Favourites navigation
- preserve the existing search functionality
- after logout, the existing authentication/routing logic should handle navigation appropriately
- do not create a new logout service or function
- do not modify authService.ts
- do not modify Firebase configuration
- do not change favourites functionality
- preserve the existing MVVM architecture
Inspect the existing Header, AuthContext, App routing, and authentication code before making changes.
Make the minimum changes necessary.

---

### 45- Fixing the useNavigate/Router hierarchy error

The application now shows a blank page.
The browser console reports:
Uncaught Error: useNavigate() may be used only in the context of a <Router> component.
The stack trace points to: useHomeViewModel.ts, App.tsx
The Home ViewModel now uses useNavigate() for the unauthenticated favourite redirect.
Fix the Router hierarchy.
Requirements:
- BrowserRouter must wrap App before useHomeViewModel() is executed
- move the existing BrowserRouter from inside App.tsx to main.tsx if necessary
- App.tsx should remain responsible for Routes and Route definitions
- do not remove the useNavigate logic from useHomeViewModel
- preserve the unauthenticated favourite redirect to /auth
- preserve the authenticated favourite functionality
- preserve AuthProvider and the existing authentication context
- preserve the existing protected /favourites route
- do not modify Firebase functionality
- do not modify authService.ts
- do not modify favourites service logic
- do not change the existing Header/search functionality
- make the minimum changes necessary
Inspect the current main.tsx and App.tsx before modifying them.
After making the changes: run npm run build, verify that the application compiles, explain briefly why the error occurred and how the Router hierarchy fixes it.

---

### 46 - Login button

Add a Login button to the existing Header.
Requirements:
- when the user is unauthenticated, display a "Login" button/link in the Header
- clicking Login should navigate to /auth
- when the user is authenticated, do not show the Login button
- keep the existing Logout button for authenticated users
- preserve Home and Favourites navigation
- preserve the existing search functionality
- use the existing AuthContext user value to determine whether the user is authenticated
- do not call Firebase Authentication directly from Header
- do not modify authService.ts
- do not modify AuthContext authentication logic
- do not create a new authentication function
- preserve the existing routing
- make the minimum changes necessary
Use React Router's existing navigation/link functionality.
---

