# RecipeBox - Week 3 GitHub Issues (Deployment & Presentation)

Copy these into your GitHub Project on **Sunday, Feb 15**

---

## Day 17 - Saturday, Feb 14 (Deploy Everything!)
**Labels:** `day-17`, `deployment`

### Issue 29: Deploy Backend to Railway/Render
**Status:** Backlog

**Tasks:**
- [ ] Choose platform: Railway or Render (both have free tiers)
- [ ] Create account on chosen platform
- [ ] Create new PostgreSQL database instance
- [ ] Note database connection URL
- [ ] Deploy backend:
  - Connect GitHub repo (or use CLI)
  - Set environment variables:
    - `DATABASE_URL` (from PostgreSQL instance)
    - `JWT_SECRET` (same as local or generate new)
    - `PORT` (usually 3000 or auto-assigned)
    - `NODE_ENV=production`
- [ ] Wait for deployment to complete
- [ ] Copy deployment URL (e.g., `https://recipebox-api.railway.app`)
- [ ] Test health check endpoint in browser

**Acceptance Criteria:**
- Backend is live and accessible
- Can visit deployment URL without errors
- Database is connected

---

### Issue 30: Set Up Production Database
**Status:** Backlog

**Tasks:**
- [ ] Connect to production database using provided connection string
- [ ] Run schema.sql to create tables:
  - Option 1: Use Railway/Render dashboard SQL console
  - Option 2: Connect via `psql` from terminal
  - Option 3: Create migration script and run it
- [ ] Verify all 4 tables exist (users, boards, recipes, recipe_boards)
- [ ] Create a test user account via API
- [ ] Test auth endpoints:
  - POST /api/auth/register
  - POST /api/auth/login
- [ ] Test recipe endpoints with Thunder Client/Yaak pointing to production URL

**Acceptance Criteria:**
- Production database has all tables
- Can create account and login in production
- API endpoints work when called from external client

---

### Issue 31: Deploy Frontend to Vercel/Netlify
**Status:** Backlog

**Tasks:**
- [ ] Choose platform: Vercel or Netlify (both have free tiers)
- [ ] Create account on chosen platform
- [ ] Update frontend API base URL:
  - Create `.env.production` file
  - Set `VITE_API_URL=https://your-backend-url.railway.app`
  - Update all API calls to use `import.meta.env.VITE_API_URL`
- [ ] Build frontend locally to test: `npm run build`
- [ ] Deploy frontend:
  - Connect GitHub repo
  - Set build command: `npm run build`
  - Set output directory: `dist`
  - Deploy!
- [ ] Copy deployment URL (e.g., `https://recipebox.vercel.app`)
- [ ] Visit deployed site in browser

**Acceptance Criteria:**
- Frontend is live and accessible
- Can visit site and see login page
- No console errors in browser

---

### Issue 32: Production Testing & CORS Fix
**Status:** Backlog

**Tasks:**
- [ ] Open deployed frontend in browser
- [ ] Try to login → will likely fail with CORS error!
- [ ] Fix CORS in backend (`app.js`):
  ```javascript
  const cors = require('cors');
  app.use(cors({
    origin: 'https://your-frontend-url.vercel.app',
    credentials: true
  }));
  ```
- [ ] Redeploy backend with CORS fix
- [ ] Test full user flow in production:
  1. Sign up new account
  2. Login
  3. Import recipe from URL
  4. Create board
  5. Assign recipe to board
  6. View recipe in cook mode
  7. Delete recipe
  8. Logout
- [ ] Test on mobile device (phone/tablet)
- [ ] Fix any issues found

**Acceptance Criteria:**
- Can complete full user flow in production
- No CORS errors
- Works on mobile
- All features functional

---

## Day 19 - Monday, Feb 16 (Demo & Presentation)
**Labels:** `day-19`, `presentation`

### Issue 33: Record Demo Video
**Status:** Backlog

**Tasks:**
- [ ] Plan demo flow (write script):
  1. Show problem (messy recipe blog)
  2. Show solution (paste URL into RecipeBox)
  3. Show extraction and preview
  4. Show editing capabilities
  5. Show board organization
  6. Show cook mode (beautiful, clean)
  7. Show responsive design (resize browser)
- [ ] Set up screen recording (QuickTime, OBS, or Loom)
- [ ] Record 2-3 minute demo video:
  - Start on recipe blog (show the clutter)
  - Copy URL
  - Paste into RecipeBox
  - Show preview modal with extracted data
  - Edit an ingredient
  - Select boards
  - Save recipe
  - Navigate to cook mode
  - Highlight clean design
  - Show it on mobile (responsive)
- [ ] Add voiceover or captions explaining features
- [ ] Edit video (trim, add titles if needed)
- [ ] Export and save

**Acceptance Criteria:**
- 2-3 minute video showing full user flow
- Clear demonstration of key features
- Shows both desktop and mobile views
- Professional presentation

---

### Issue 34: Create Presentation Slides
**Status:** Backlog

**Tasks:**
- [ ] Create slides (Google Slides, PowerPoint, Keynote):
  
  **Slide 1: Title**
  - RecipeBox
  - Your name
  - "A Beautiful Recipe Organizer"
  
  **Slide 2: The Problem**
  - Screenshot of cluttered recipe blog
  - Bullet points: ads, long intros, hard to save
  
  **Slide 3: The Solution**
  - Screenshot of RecipeBox clean interface
  - Key features: extract, organize, cook mode
  
  **Slide 4: Tech Stack**
  - Frontend: React, CSS
  - Backend: Express, Node.js
  - Database: PostgreSQL with JSONB
  - Deployment: Vercel + Railway
  
  **Slide 5: Key Features**
  - Schema.org extraction (70-80% of sites)
  - Multi-board organization
  - Editable preview before saving
  - Beautiful cook mode
  
  **Slide 6: Technical Challenges**
  - Schema.org parsing (multiple formats)
  - JSONB for flexible ingredient storage
  - Many-to-many board relationships
  
  **Slide 7: What I Learned**
  - Full-stack development
  - Data extraction and parsing
  - Database design (many-to-many)
  - Deployment and production debugging
  
  **Slide 8: Future Features** (stretch goals)
  - Nested boards
  - AI extraction fallback
  - Serving size scaling
  - Search by ingredient
  
  **Slide 9: Live Demo**
  - "Let me show you!"
  
  **Slide 10: Questions?**
  - Thank you!
  - Links to live site and GitHub

**Acceptance Criteria:**
- 8-10 slides total
- Clear, readable text (not too much per slide)
- Screenshots of your actual app
- Professional design
- Tells a story (problem → solution → tech → learnings)

---

### Issue 35: Practice Presentation
**Status:** Backlog

**Tasks:**
- [ ] Write presentation script (what you'll say for each slide)
- [ ] Practice presenting out loud:
  - Introduce yourself and project
  - Explain the problem
  - Show the solution (slides)
  - Do live demo OR show recorded video
  - Discuss technical decisions
  - Share what you learned
  - Answer practice questions
- [ ] Time yourself (aim for 5-7 minutes total)
- [ ] Practice at least 3 times
- [ ] Prepare answers for common questions:
  - "Why PostgreSQL over MongoDB?"
  - "Why JSONB instead of separate tables?"
  - "How does schema.org extraction work?"
  - "What was the hardest part?"
  - "What would you do differently?"

**Acceptance Criteria:**
- Can present confidently without reading slides
- Demo flows smoothly
- Stays within time limit (5-7 min)
- Ready to answer technical questions

---

### Issue 36: Write README Documentation
**Status:** Backlog

**Tasks:**
- [ ] Create comprehensive README.md in root of repo:

```markdown
# RecipeBox

A beautiful recipe organizer that extracts recipes from URLs and organizes them with custom boards.

## Features

- 🔗 Import recipes from any URL (schema.org extraction)
- ✏️ Edit extracted data before saving
- 📁 Organize with custom boards
- 🏷️ Multi-board tagging (one recipe in multiple boards)
- 👨‍🍳 Beautiful cook mode (NYT Cooking-inspired)
- 📱 Fully responsive design

## Tech Stack

**Frontend:**
- React (Vite)
- CSS (custom design system)
- React Router

**Backend:**
- Express.js
- PostgreSQL (JSONB for ingredients/instructions)
- JWT authentication
- bcrypt password hashing

**Deployment:**
- Frontend: Vercel
- Backend: Railway
- Database: Railway PostgreSQL

## Installation

### Backend Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Create database:
   ```bash
   createdb recipebox_dev
   psql recipebox_dev < db/schema.sql
   ```
4. Create `.env` file:
   ```
   PORT=3000
   DATABASE_URL=postgresql://localhost/recipebox_dev
   JWT_SECRET=your-secret-key
   ```
5. Start server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Create `.env` file:
   ```
   VITE_API_URL=http://localhost:3000
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## Database Schema

4 tables:
- `users` - User accounts
- `boards` - User-created boards (flat structure)
- `recipes` - Recipes with JSONB ingredients/instructions
- `recipe_boards` - Many-to-many join table

## API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Recipes
- `POST /api/recipes/extract` - Extract from URL (preview only)
- `POST /api/recipes` - Save recipe
- `GET /api/recipes` - Get all user recipes
- `GET /api/recipes/:id` - Get single recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

### Boards
- `POST /api/boards` - Create board
- `GET /api/boards` - Get all boards
- `GET /api/boards/:id/recipes` - Get recipes in board
- `PUT /api/boards/:id` - Update board
- `DELETE /api/boards/:id` - Delete board

## Future Enhancements

- Nested board hierarchy
- AI extraction fallback for non-schema.org sites
- Serving size scaling
- Search by ingredient
- PDF export
- Grocery list generator

## Author

[Your Name] - [Your GitHub] - [Your Email]

## License

MIT
```

**Acceptance Criteria:**
- README is comprehensive and clear
- Installation instructions work
- API endpoints documented
- Professional presentation

---

# Week 3 Summary

**Total Issues:** 8  
**Days Covered:** 17, 19 (Day 18 Sunday is off)

**Focus:**
- Day 17: Deploy backend, frontend, fix CORS, test production
- Day 19: Demo video, presentation slides, practice, README

---

# Deployment Tips

## Railway/Render Tips:
- **Railway:** Easier, automatic deploys from GitHub
- **Render:** Also easy, free tier available
- **Both:** Have PostgreSQL built-in

## Common Issues:

### CORS Errors
Add to `app.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

### Environment Variables
Make sure ALL environment variables are set in platform dashboard:
- `DATABASE_URL`
- `JWT_SECRET`
- `PORT`
- `NODE_ENV=production`

### Database Connection
Railway/Render provide connection string like:
```
postgresql://user:pass@host:5432/dbname
```

Copy this EXACTLY into `DATABASE_URL`.

## Frontend Environment Variables

Create `.env.production`:
```
VITE_API_URL=https://your-backend.railway.app
```

Update API calls to use:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

---

# Presentation Tips

## Do:
- ✅ Show the problem first (cluttered recipe blog)
- ✅ Demo the solution (your clean app)
- ✅ Explain technical decisions (JSONB, schema.org)
- ✅ Share what you learned
- ✅ Be proud of your work!

## Don't:
- ❌ Apologize for "simple" features
- ❌ Focus on what you didn't build
- ❌ Read slides word-for-word
- ❌ Go over time limit

## Practice Questions:

**"Why did you use JSONB instead of separate tables?"**
> "My instructor recommended it for simplicity in the 18-day timeline. JSONB lets me store ingredients and instructions as arrays with a single INSERT, which matches how schema.org provides the data. For MVP, this was the right choice. If I scale up, I could refactor to separate tables for advanced features like ingredient search."

**"What was the hardest part?"**
> "Schema.org parsing was tricky because different sites structure their data differently. Some use arrays of objects, some use arrays of strings, some nest instructions in HowToSection elements. I had to write a robust parser that handles all these variations."

**"What would you do differently?"**
> "I'd add automated testing from the start. Manual testing worked for this timeline, but having unit tests for the recipe parser would have caught edge cases faster."

---

# Final Checklist

**Before Presentation:**
- [ ] Backend deployed and working
- [ ] Frontend deployed and working
- [ ] Production tested (full user flow)
- [ ] Demo video recorded
- [ ] Slides created
- [ ] Practiced presentation 3+ times
- [ ] README documentation complete
- [ ] GitHub repo cleaned up (remove test files, add .gitignore)
- [ ] Prepared for questions

---

**You're going to crush the presentation!** 🎉

You built a full-stack app in 18 days - be proud! 💪
