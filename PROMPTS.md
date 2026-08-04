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

Do not add API requests, React state, book search functionality, or UI components yet.

Keep the code clean, beginner-friendly, and follow the MVVM architecture.

---

