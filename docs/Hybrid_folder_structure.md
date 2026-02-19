frontend/
├── src/
│   ├── api/                    # API helper functions
│   │   └── auth.js            # login, register, token handling
│   │
│   ├── auth/                   # Everything auth
│   │   ├── AuthContext.jsx    # Context provider + useAuth hook
│   │   ├── Login.jsx          # Login page
│   │   ├── Register.jsx       # Register page
│   │   └── ProtectedRoute.jsx # Route wrapper (redirects to /login)
│   │
│   ├── recipes/                # Everything recipes
│   │   ├── RecipesGrid.jsx    # All recipes page (grid + search)
│   │   ├── RecipeView.jsx     # Single recipe page (cook mode)
│   │   ├── RecipeCard.jsx     # Reusable card component
│   │   └── RecipeImportForm.jsx # Import/edit form with URL parsing
│   │
│   ├── boards/                 # Everything boards
│   │   ├── BoardsGrid.jsx     # All boards page
│   │   ├── BoardDetail.jsx    # Single board page (recipes in board)
│   │   └── BoardModal.jsx     # Create/edit modal
│   │
│   ├── layout/                 # Shared layout
│   │   ├── Layout.jsx         # Main layout wrapper (Outlet)
│   │   └── Navbar.jsx         # Nav bar with URL import input
│   │
│   ├── App.jsx                 # Main app with Routes
│   ├── main.jsx                # Entry point (BrowserRouter)
│   └── index.css               # Global CSS design system
│
├── public/                     # Static assets (served at root)
│   ├── Simmer_logo.svg        # App logo
│   ├── REd_Simmer.svg         # Red logo variant
│   ├── text_in_a_circlesvg.svg # Circle text SVG
│   ├── _redirects              # Netlify redirect rules
│   └── assets/                 # Additional static assets
│
├── docs/                       # Project documentation
│   └── Hybrid_folder_structure.md
│
├── index.html                  # HTML entry point
├── package.json
├── eslint.config.js
└── vite.config.js              # Vite config (proxy to backend)
