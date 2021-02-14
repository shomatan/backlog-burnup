import React from 'react';
import Head from 'next/head';

export const Header = (): JSX.Element => {
  return (
    <Head>
      <title>Backlog Burn Up</title>
      <link rel="icon" href="/favicon.ico" />
      <link href="https://unpkg.com/sanitize.css" rel="stylesheet" />
    </Head>
  );
};

export default Header;
