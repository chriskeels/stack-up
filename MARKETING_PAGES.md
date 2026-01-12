# Stack Up Marketing & Documentation Pages

## 6 New Public Pages Added

### 1. **Home Page** (`/home`)
- Hero section with app tagline and CTA buttons
- "Who Benefits Most?" section (teens, parents, educators)
- Feature preview highlighting 5 key benefits
- Navigation to all other pages
- **Status:** ✅ Public (no auth required)

### 2. **About Page** (`/about`)
- **CCC.1.1 Evidence** - Problem understanding
- Problem overview with Philadelphia context
- Real example: "Jordan's story" showing the problem in action
- Explanation of why problem is hard to solve (constraints)
- Consequences if unsolved (debt, stress, missed opportunities)
- Competitive analysis table (Mint vs YNAB vs PocketGuard vs StackUp)
- The gap StackUp fills
- **Status:** ✅ Public (no auth required)

### 3. **Why Stack Up?** (`/why-stackup`)
- **CCC.1.2 Evidence** - Solution planning
- Solution overview and value proposition
- 6 Core Features breakdown with cards
- Comparison table: Why choose StackUp over competitors
- Expected challenges + how we handle them
- 6-Sprint project plan documenting development
- Development note about relocation pause
- **Status:** ✅ Public (no auth required)

### 4. **Features Page** (`/features`)
- **CCC.1.3 Evidence (partial)** - Working app showcase
- 5 Feature spotlights (Transaction Tracker, Savings Goals, Dashboard, AI Insights, Quick Actions)
- "Why Stack Up Wins" section (4 key advantages)
- How AI solves the problem section
- CTA to try the app
- **Status:** ✅ Public (no auth required)

### 5. **Product Page** (`/product`)
- **CCC.1.3 Evidence (full)** - Working MVP
- Live interactive dashboard (protected behind auth)
- Feature preview boxes
- Sign-in/Create Account CTAs for non-authenticated users
- Dashboard features checklist
- **Status:** ✅ Auth-gated (requires login to see dashboard, but page itself is public)

### 6. **Rubric Evidence Page** (`/rubric-evidence`)
- **For Launchpad Staff Only** - Comprehensive rubric evidence documentation
- Admin-only authentication (checks for NEXT_PUBLIC_ADMIN_EMAIL)
- **CCC.1.1 Mapping:** Links to About page + problem.md
- **CCC.1.2 Mapping:** Links to Why Stack Up? page + tech architecture details
- **CCC.1.3 Mapping:** Links to all working features (Dashboard, Transactions, Goals, Auth)
- **TS.3.2 Mapping:** JWT + bcryptjs authentication details
- **TS.6.3 Mapping:** OpenAI AI integration details
- Features implementation table (all 6 features marked ✅ Complete)
- Submission summary table
- **Status:** 🔐 **Protected - Admin Only** (requires valid admin email from JWT token)

---

## Admin Access Setup

### For Launchpad Staff:

1. **Admin Email (default):** `rob@launchpadphilly.org`

2. **To change admin email:**
   - Update `.env.local`:
     ```
     NEXT_PUBLIC_ADMIN_EMAIL=your_staff_email@launchpadphilly.org
     ```
   - Only ONE admin email per instance

3. **How to Access Rubric Evidence:**
   - Create an account with your staff email (rob@launchpadphilly.org)
   - Log in with that email
   - "Evidence" link appears in navigation (pink color, highlighted)
   - Click to view comprehensive rubric mapping

---

## Navigation

All pages have a consistent marketing navigation bar with:
- Logo (back to home)
- Links to: Home → About → Why Stack Up? → Features → Product
- **Evidence link** (only visible to admin users)
- Auth status (Login/Logout or App link)

---

## Styling

- **Consistent design system:** Uses same CSS variables as app
- **Color scheme:** Purple (#6f4bff) primary, pink (#ff7ad5) accent
- **Responsive:** Works on mobile (520px+), tablet, desktop
- **Component-based cards:** Feature boxes, comparison tables, evidence sections

---

## File Structure

```
/app
  /home/page.jsx                 (Home page)
  /about/page.jsx                (About - CCC.1.1 evidence)
  /why-stackup/page.jsx          (Why Stack Up - CCC.1.2 evidence)
  /features/page.jsx             (Features - CCC.1.3 partial)
  /product/page.jsx              (Product - CCC.1.3 full, auth-gated)
  /rubric-evidence/page.jsx      (Admin-only evidence page)
  
  /styles/main.css               (Updated with 500+ lines of marketing styles)
  /components/Navigation.jsx     (Updated to show Evidence link for admins)
```

---

## Key Features

✅ **Public Pages** (5): Home, About, Why Stack Up?, Features, Product
✅ **Admin Pages** (1): Rubric Evidence (protected by admin email)
✅ **Smart Navigation:** Evidence link only shows for admin users
✅ **Comprehensive Evidence:** CCC.1.1, CCC.1.2, CCC.1.3 + TS.3.2, TS.6.3 all mapped
✅ **Real Examples:** Jordan's story, competitive analysis, challenge mitigation
✅ **Responsive Design:** Mobile-first, works on all screen sizes
✅ **Integrated:** Uses existing auth system, database, and app navigation

---

## How to Test

1. **Public pages:** No login needed
   - Visit `/home`, `/about`, `/why-stackup`, `/features`, `/product`

2. **Admin page (Rubric Evidence):**
   - Register/login with email: `rob@launchpadphilly.org`
   - Look for pink "Evidence" link in navbar
   - Click to see comprehensive rubric mapping

3. **Change admin email:**
   - Edit `.env.local`: `NEXT_PUBLIC_ADMIN_EMAIL=different@email.com`
   - Restart dev server
   - Only that email can access `/rubric-evidence`

---

## Next Steps

1. Update `NEXT_PUBLIC_ADMIN_EMAIL` in `.env.local` if using different staff email
2. Test all pages by visiting `/home` → `/about` → `/why-stackup` → `/features` → `/product`
3. Test admin access: log in as staff, verify "Evidence" link appears
4. Deploy to production (all pages ready)
