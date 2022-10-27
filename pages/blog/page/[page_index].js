import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import Pagination from '@/components/Pagination';
import { sortByDate } from '@/utils/index';
import { POSTS_PER_PAGE } from '@/config/index';

export default function BlogPage({ posts, numPages, currentPage }) {
  //console log client-side
  console.log(posts);
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Blog</h1>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>

      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  );
}

// ? not console.logging paths as expected, but still works

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

// *accesses markdown files in posts folder, creates a slug and creates an array of objects to render

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1);

  const files = fs.readdirSync(path.join('posts'));

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

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = posts
    .sort(sortByDate)
    .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE);

  //console.log(posts);

  // *uses function in utils to help sort by date
  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
    },
  };
}