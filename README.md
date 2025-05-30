# E-Commerce Project Documentation

## About this project in a video

```soon```

## Introduction

The E-Commerce Project is a comprehensive web application designed to provide users with a seamless online shopping experience. Leveraging modern web technologies, the platform enables users to browse products, add items to their shopping cart, and complete purchases securely.

## Screenshots of my app
### Client side: 

<h4>Home Page</h4>
<img src="/Screenshots/screenshot1.png" width="600"/>
<img src="/Screenshots/screenshot2.png" width="600"/>

<h4>Shop Page</h4>
<img src="/Screenshots/screenshot3.png" width="600"/>
<img src="/Screenshots/screenshot4.png" width="600"/>

<h4>Listing Page</h4>
<img src="/Screenshots/screenshot5.png" width="600"/>
<img src="/Screenshots/screenshot6.png" width="600"/>

<h4>Favorites Page</h4>
<img src="/Screenshots/screenshot7.png" width="600"/>

### Dashboard & Auth

<h4>Login Page</h4>
<img src="/Screenshots/screenshotDashboard1.png" width="600"/>

<h4>Dashboard Main Page</h4>
<img src="/Screenshots/screenshotDashboard2.png" width="600"/>

<h4>Dashboard Listing Page</h4>
<img src="/Screenshots/screenshotDashboard3.png" width="600"/>
<img src="/Screenshots/screenshotDashboard5.png" width="600"/>

<h4>Dashboard Messages Page</h4>
<img src="/Screenshots/screenshotDashboard4.png" width="600"/>

## Technologies Used and Their Purposes

The project utilizes the following technologies:

- **Next.js**: A React-based framework that facilitates server-side rendering and static site generation, enhancing performance and SEO.

- **React**: A JavaScript library for building user interfaces, allowing for the creation of reusable and dynamic components.

- **TypeScript**: A superset of JavaScript that introduces static typing, improving code quality and maintainability.

- **JWT (JSON Web Token)**: A standard for securely transmitting information between parties as a JSON object, used for user authentication and authorization.

- **Middleware**: Functions that execute during the request-response cycle, used for tasks such as authentication, logging, and request modification.

- **MongoDb**: A NoSQL database that stores data in flexible, JSON-like documents, allowing for dynamic schemas and scalability.

- **Amazon S3 (Simple Storage Service)**: A scalable object storage service from AWS, designed for storing and retrieving any amount of data at any time.

# Log info for application

## Admin:
- **e-mail**: admin@admin.com
- **password**: adminpassword

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

```
├── not-found
├── about
├── api
│   ├── admin
│   │   ├── addListing
│   │   ├── deleteListing
│   │   ├── editListing
│   │   ├── formHandler
│   │   │   ├── clientFormSubmition
│   │   │   └── setMessageState
│   │   └── getData
│   │       ├── getAllListings
│   │       ├── getMessages
│   │       ├── getUsersStats
│   ├── auth
│   │   ├── generateToken
│   │   ├── isValid
│   │   ├── userData
│   ├── getData
│   │   ├── getListingById
│   │   └── getListings
│   └── store-visit
├── contact
├── dashboard
│   ├── listings
│   └── messages
├── data-protection
├── favorites
├── legal-notice
├── login
├── shop
│   ├── item/[...slug]
│   └── sale
```
## env schema

```
# Eleven Labs
ELEVEN_LABS_API_KEY=
# Mongo DB
MONGO_DB_USERNAME=
MONGO_DB_PASSWORD=
# AWS S3
AWS_S3_ACCESS_KEY_ID=
AWS_S3_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=
# Auth
JWT_SECRET=
# Hash Salt
HASH_SALT=
```
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
