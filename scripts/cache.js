//* search works in local development, but due to posts not being accessed due to issues
//*  with the "fs.readdirSync(path.join('posts'))" method, posts need to be chached for
//* every commit, for deployed version to get access.
//* data file in cache folder is created below, which can be accessed on deployment.
//* see package.json for running script

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function postData() {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map((filename) => {
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
  return `export const posts = ${JSON.stringify(posts)}`;
}

//*check if cache folder exists, if not create it
try {
  fs.readdirSynch('cache');
} catch (error) {
  fs.mkdirSync('cache');
}

//*write data to file in cache folder and verify
fs.writeFile('cache/data.js', postData(), function (err) {
  if (err) return console.log(err);
  console.log('Posts Cached...');
});
