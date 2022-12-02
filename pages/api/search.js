import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

//* api route needs to be created since we use getStaticProps & getStaticPaths
//* since we can't search through infinate possibilities.
//* note, when deploying to vercel, this is a serverless function without direct access to posts,
//* so posts will be chached/made searchable with a tool called Husky (script to cache posts).
//* see article by Matt Swainson on medium.com

export default (req, res) => {
  let posts;

  if (process.env.NODE_ENV === 'production') {
    //* fetch from cache
    posts = require('../../cache/data').posts;
  } else {
    const files = fs.readdirSync(path.join('posts'));

    posts = files.map((filename) => {
      const slug = filename.replace('.md', '');

      const markdownWithMeta = fs.readFileSync(
        path.join('posts', filename),
        'utf-8'
      );
      const { data: frontmatter } = matter(markdownWithMeta);

      return {
        frontmatter,
        slug,
      };
    });
  }
  const results = posts.filter(
    ({ frontmatter: { title, excerpt, category } }) =>
      title.toLowerCase().indexOf(req.query.q) != -1 ||
      excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      category.toLowerCase().indexOf(req.query.q) != -1
  );
  res.status(200).json(results);
};
