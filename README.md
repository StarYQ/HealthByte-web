# HealthByte-web
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install all dependencies:
```bash
npm install
```

> **Before this next step, make sure that you have a `.env` file in the project root.**
> 
Then, generate the Prisma Client:
```bash
npx prisma generate
```

Finally, anytime you want to interact with the project locally, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## NOTE:
If the site crashes upon visiting a page after pulling an updated version, try
```bash
rm -rf node_modules && rm -rf .next && npm install
```
and run ```npm run dev``` again.
