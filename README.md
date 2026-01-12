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

**Frontend**
- Next.js  
- React  
- Tailwind CSS  

**Backend**
- Next.js API Routes  
- Node.js  
- JWT Authentication  

**Database**
- PostgreSQL  

**AI**
- OpenAI API  

**Tools**
- Git & GitHub  
- Vite / Next.js Dev Server  
- Postman  

---

## How to Run the Project

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd stackup
```

### 2. Install dependencies
```bash
cd client
npm install
cd ../server
npm install
```

### 3. Set up environment variables
Create a file called `server/.env` and add:
```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/stackup
JWT_SECRET=yourSecretKey
OPENAI_API_KEY=yourOpenAIKey
```

### 4. Start the backend
```bash
cd server
npm run dev
```

### 5. Start the frontend
Open a new terminal and run:
```bash
cd client
npm run dev
```

### 6. Open in your browser
```
http://localhost:5173
```

---

## Final Notes

StackUp is built to help teens take control of their money in a simple, stress-free way. By combining budgeting tools with AI-powered insights, the app makes financial literacy more engaging and useful in real life.
