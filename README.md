This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### About

This project is part two of a course found on Udemy (https://www.udemy.com/course/nextjs-dev-to-deployment/). It deals with how Markdown Files are incorporeated into a blog-post type project. The following technology is used:

- Next.js
- Tailwind (styling)
- fs module (node.js module to enable use of local files to replace API data);
  useful tip: https://github.com/vercel/next.js/discussions/12124
- path module (module provides utilities for working with file and directory paths).
- grey-matter (parses a string with front-matter into an object)
- markdown files/syntax
- marked (package used to parse the markdown content)
- icon use with react-icons

**The project also handles:**

- sorting by date
- category filtering and labeling (specific colors added for specific categories of content)
- pagination (previous, next and number of pages)
- separate category list
-

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
