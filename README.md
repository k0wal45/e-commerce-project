# E-Commerce Project Documentation

## Introduction

The E-Commerce Project is a comprehensive web application designed to provide users with a seamless online shopping experience. Leveraging modern web technologies, the platform enables users to browse products, add items to their shopping cart, and complete purchases securely.

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

In this application we have for now 2 roles, amdin and editer. Admin has acces to every single funcionality inside of the dashboard. On the other hand editer is not decided yet but probbably it will have only access to edit or add and edit listings.

## Admin:
- **e-mail**: admin@admin.com
- **password**: adminpassword


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
