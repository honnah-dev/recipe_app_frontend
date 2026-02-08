frontend/
├── src/
│   ├── api/                    # All API calls
│   │   ├── auth.js            # login, signup, getMe
│   │   ├── recipes.js         # extract, create, get, update, delete
│   │   └── boards.js          # create, get, update, delete
│   │
│   ├── auth/                   # Everything auth
│   │   ├── AuthContext.jsx    # Context provider
│   │   ├── Login.jsx          # Login page
│   │   ├── Signup.jsx         # Signup page
│   │   └── ProtectedRoute.jsx # Route wrapper
│   │
│   ├── recipes/                # Everything recipes
│   │   ├── RecipesGrid.jsx    # All recipes page
│   │   ├── RecipeView.jsx     # Single recipe page (cook mode)
│   │   ├── RecipeCard.jsx     # Reusable card component
│   │   └── RecipeImportForm.jsx # Import modal
│   │
│   ├── boards/                 # Everything boards
│   │   ├── BoardsGrid.jsx     # All boards page (Pinterest-style grid)
│   │   ├── BoardDetail.jsx    # Single board page (recipes in board)
│   │   └── BoardModal.jsx     # Create/edit modal
│   │
│   ├── layout/                 # Shared layout stuff
│   │   ├── Layout.jsx         # Main layout wrapper
│   │   └── Navigation.jsx     # Nav bar with URL input
│   │
│   ├── shared/                 # Reusable UI components
│   │   ├── Spinner.jsx        # Loading spinner
│   │   ├── ErrorMessage.jsx   # Error display
│   │   └── EmptyState.jsx     # "No recipes yet" states
│   │
│   ├── App.jsx                 # Main app with routes
│   ├── main.jsx                # Entry point
│   └── styles.css              # Your CSS design system
│
├── public/                      # Static assets (served at root)
│   └── assets/                  # Images, logos, icons
│       └── logo.png             # App logo (accessible at /assets/logo.png)
├── package.json
└── vite.config.js