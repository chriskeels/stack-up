# StackUp 💰  
*A teen-friendly money and budgeting app*

---

## Project Overview

StackUp is a web application designed to help teenagers understand, track, and improve how they manage their money. The app makes it easy to log income and expenses, see where money goes, and get personalized tips for saving and budgeting. Instead of confusing spreadsheets or boring finance apps, StackUp uses simple visuals and AI-powered guidance to help teens build healthy financial habits.

---

## Problem Summary

Many students grow up without learning how to budget, save, or manage money. They often use cash apps and spend without tracking, which causes them to run out of money, feel stressed, and repeat bad financial habits. StackUp solves this by giving teens a clear, simple way to see their money and make smarter decisions.

---

## Features

- Secure user accounts and login  
- Dashboard showing balance, spending, and savings goals  
- Add, edit, and delete income and expenses  
- Category-based spending tracking  
- Savings goals with progress tracking  
- **AI Spending Insights**
  - Analyzes user spending
  - Gives personalized tips like:
    - “You’re spending a lot on food — try cooking twice a week to save $30”
    - “You’re close to your savings goal — keep going!”

---

## Tech Stack

**Full-Stack Framework**
- Next.js 15+ (App Router with Server & Client Components)
- React 19

**Backend**
- Next.js API Routes (in `/app/api`)
- Node.js
- JWT Authentication (jsonwebtoken)
- Password Hashing (bcryptjs)

**Database**
- PostgreSQL (via Neon or local)
- pg (Node.js client)

**Frontend Styling**
- Custom CSS (no framework)

**AI**
- OpenAI API (GPT-4 for spending insights)

**Tools**
- Git & GitHub
- Next.js Dev Server
- Postman (optional for API testing)

---

## How to Run the Project

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd stack-up
```

### 2. Set up environment variables
Copy `.env.local.example` to `.env.local` and fill in your values:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
DATABASE_URL=postgresql://username:password@host:5432/stackup
JWT_SECRET=your-secure-random-string-here
OPENAI_API_KEY=your-openai-api-key-here
NODE_ENV=development
```

### 3. Install dependencies
```bash
npm install
```

### 4. Initialize the database (first time only)
The database schema is automatically created when you start the app. The `app/layout.jsx` runs the `app/lib/schema.sql` on startup.

### 5. Start the development server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 6. Build for production
```bash
npm run build
npm start
```

---

---

## Features Explained

### Core Functionality
- **User Accounts & Authentication:** Secure registration and login using JWT tokens and bcrypt password hashing
- **Dashboard:** Real-time view of total balance, spending, savings, and recent transactions
- **Transactions:** Add, edit, and delete income and expense transactions with categories and notes
- **Savings Goals:** Set savings targets and track progress with visual progress bars
- **Quick Actions:** One-click buttons (Deposit, Transfer, Withdraw, Cards) to quickly prefill the transaction form

### AI Integration: Spending Insights
The app uses OpenAI's GPT-4.1-mini model to analyze user spending patterns and provide personalized financial advice:

- **Real-time analysis:** Examines total income, expenses, and savings goals
- **Smart recommendations:** Generates tips like:
  - "You're spending $X on groceries — try meal planning to save $Y per month"
  - "Great job! You're on track to reach your savings goal"
  - "Consider reducing impulse purchases — set a daily spending limit"
- **Motivational tone:** Tips are encouraging and practical for teens

The AI endpoint (`/api/ai/insights`) is called when users view the dashboard and displays tips in a dedicated card.

---

## Notes

StackUp is built to help teens take control of their money in a simple, stress-free way. By combining budgeting tools with AI-powered insights, the app makes financial literacy more engaging and useful in real life.

The app uses PostgreSQL (via Neon for cloud hosting) for reliability and OpenAI's API for intelligent, personalized spending advice that adapts to each user's habits.
