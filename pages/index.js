import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { sortByDate } from '@/utils/index';

export default function HomePage({ posts }) {
  //console log client-side
  //console.log(posts);
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Latests Posts</h1>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
      <Link href='/blog'>
        <a className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-800 focus:outline-none focus:shadow-outline w-full'>
          All Posts
        </a>
      </Link>
    </Layout>
  );
}

// *accesses markdown files in posts folder, creates a slug and creates an array of objects to render

export async function getStaticProps() {
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

  //console.log(posts);

  // *uses function in utils to help sort by date, then only render six in total
  return {
    props: {
      posts: posts.sort(sortByDate).slice(0, 6),
    },
  };
}
