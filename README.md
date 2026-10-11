# Next.js Starter Template

A modern **Next.js 14**.2.4 starter template featuring robust authentication, internationalization, theme switching, and component libraries to kickstart your next web application.

> [next-intl example](https://github.com/amannn/next-intl/tree/main/examples/example-app-router-next-auth) was used as tempalte for this template :)

## **Features**
- 🚀 **[Next.js](https://nextjs.org)** v14.2.4 with React 18.3.1 and [pnpm](https://pnpm.io) package management
- 🔒 **Authentication & Authorization** with **[NextAuth.js](https://next-auth.js.org)** using custom credentials.
- 🌍 **[Next-Intl](http://next-intl.dev)** for seamless internationalization with support for **2 languages**.
- 🎨 **[shadcn/ui](https://ui.shadcn.com)** component library for pre-styled and accessible UI components.
- 🌗 **[Next-Themes](https://ui.shadcn.com/docs/dark-mode/next)** for smooth light/dark mode switching.
- 📊 **[Vercel Analytics](https://vercel.com/docs/analytics)** for monitoring user engagement and performance metrics. 
- 📄 Prebuilt pages:
  - **Login Page**: User authentication via credentials.
  - **Public Page**: Accessible to all visitors.
  - **Admin Page**: Restricted to authorized admin users.
  - **Feedback Form**: using [Formspark](http://formspark.io)

## Getting Started

### Local developement

```bash
# Get the repo
git clone https://github.com/emenems/nextjs-template
cd nextjs-template

# Install dependencies
pnpm install

# Prepare environment
cp .env.example .env.local
vi .env.local

# Run local server
pnpm dev

# Go to localhost:3000 and login using creds stored in .env.local file
```

### Deploy to Vercel

This project is optimized for deployment on Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://github.com/emenems/nextjs-template)

## To Do

- add docker support

## Tips

- To include the Cookie consent
  - check [this video](https://www.youtube.com/watch?v=P5rGGE2nBCg) for cookiebot integration
  - check [this repo](https://github.com/vercel/examples/tree/main/edge-middleware/cookies) cookie consent handling
