import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { sortByDate } from '@/utils/index';

// * function used on multiple pages to collect and sort through and return markdown data

const files = fs.readdirSync(path.join('posts'));

export function getPosts() {
  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    //console.log(markdownWithMeta);
    // *use grey-matter to parse file content into objects (data object also renamed to frontmatter)
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });
  return posts.sort(sortByDate);
}
