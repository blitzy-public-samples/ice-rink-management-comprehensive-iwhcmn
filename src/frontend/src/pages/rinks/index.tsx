import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import RinkList from '../../components/Rink/RinkList';

const RinksPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Ice Rinks | Ice Rink Management and Booking System</title>
        <meta name="description" content="Browse and book ice rinks in your area" />
      </Head>
      <main>
        <h1>Ice Rinks</h1>
        <RinkList />
      </main>
    </Layout>
  );
};

export default RinksPage;

// TODO: Implement SEO optimizations for the rinks page
// TODO: Add breadcrumb navigation for better user experience
// TODO: Implement server-side rendering (SSR) or static site generation (SSG) for improved performance