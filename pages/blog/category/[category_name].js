import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { getPosts } from '@/lib/posts';

export default function CategoryBlogPage({ posts, categoryName }) {
  //console log client-side
  //console.log(posts);
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>
        Posts in {categoryName}
      </h1>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </Layout>
  );
}

// * extract categories from markdown files

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return frontmatter.category.toLowerCase();
  });

  //console.log(categories);

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths,
    fallback: false,
  };
}

// *accesses markdown files in posts folder, creates a slug and creates an array of objects to render

export async function getStaticProps({ params: { category_name } }) {
  //console.log(category_name);
  const files = fs.readdirSync(path.join('posts'));

  const posts = getPosts();

  //console.log(posts);

  // * filter posts by category

  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  // *uses function in utils to help sort by date, then only render six in total
  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
    },
  };
}
