# Job Posting and Email Automation Website

This application is a comprehensive solution for companies seeking an automated platform to manage job postings and efficiently communicate with potential candidates. By automating email and SMS notifications, companies can keep candidates updated on job opportunities, ensuring a seamless hiring process.

---

## Overview

The Job Posting and Email Automation Website is built using the MERN stack and offers a responsive, user-friendly interface powered by Twilio for SMS notifications and Nodemailer for email automation. This application allows companies to easily manage job postings, automatically send job updates, and keep track of candidate engagement.

## Key Benefits for Companies

- **Automated Communication**: Sends job alerts and updates to candidates, ensuring prompt communication.
- **Streamlined Job Management**: Allows companies to post, update, and manage job listings in real-time.
- **Increased Efficiency**: Reduces the need for manual follow-ups and repetitive communication tasks.
- **Enhanced Candidate Experience**: Keeps candidates informed and engaged, which can improve the candidate experience and employer brand.

---

## Features

- **User Registration (Company)**:

  - Companies can register by providing basic details.
  - Email and mobile verification are required to activate the account, preventing unverified users from posting jobs.

- **Company Login**:

  - Supports JWT or session-based authentication for secure and persistent login sessions.

- **Job Posting**:

  - Authenticated companies can post jobs with details such as job title, job description, experience level, candidate requirements, and end date.

- **Candidate Email Automation**:

  - Companies can send job alerts or updates to multiple candidates via email.
  - Automated emails include job details and sender information, providing candidates with timely and relevant updates.

- **Logout**:
  - Companies can log out, with tokens or sessions cleared for security.

---

## Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email Service**: Nodemailer
- **SMS Service**: Twilio

---

## Project Setup

### Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)
- [Twilio Account](https://www.twilio.com/)
- [Gmail Account](https://mail.google.com/) or another SMTP server

### Frontend Setup

1. **Navigate to the Frontend Directory**:

   ```bash
   cd frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Environment Variables**:  
   Create a `.env` file in the `frontend` directory with the following content:

   ```plaintext
   VITE_APP_BACKEND_URL="your_backend_url"
   ```

4. **Start the Frontend Server**:
   ```bash
   npm run dev
   ```

### Backend Setup

1. **Navigate to the Backend Directory**:

   ```bash
   cd server
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Environment Variables**:  
   Create a `.env` file in the `server` directory with the following content:

   ```plaintext
   MONGODB_URL="your_mongodb_url"
   MAIL_HOST="smtp.gmail.com"
   MAIL_USER="your_email"
   MAIL_PASS="your_email_password"
   JWT_SECRET="your_jwt_secret"
   PORT=4000
   TWILIO_ACCOUNT_SID="your_twilio_account_sid"
   TWILIO_AUTH_TOKEN="your_twilio_auth_token"
   TWILIO_FROM_NUMBER="your_twilio_registered_number"
   APPLICATION_BASE_URL="http://localhost:5173" # For local development
   # APPLICATION_BASE_URL="your_hosted_frontend_url" # For production
   ```

4. **Start the Backend Server**:
   ```bash
   npm run dev
   ```

---
