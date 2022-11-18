import Head from 'next/head';
import Header from './Header';
import Search from './Search';

export default function Layout({ title, keywords, description, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='keywords' content={keywords} />
        <meta name='description' content={description} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Search />
      <main className='container mx-auto my-7'>{children}</main>
    </>
  );
}

Layout.defaultProps = {
  title: 'Welcome to Devspace',
  keywords: 'development, coding, programming',
  description: 'project from Udemy.com',
};
