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
- husky (used to run script to automatically add post files to cache on every commit)

**The project also handles:**

- sorting by date
- category filtering and labeling (specific colors added for specific categories of content)
- pagination (previous, next and number of pages)
- separate category list

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployed on Vercel

https://devspaceblog-blue.vercel.app/
