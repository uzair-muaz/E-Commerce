import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen justify-between">
        <header>
          <nav className="flex justify-between shadow-md h-12 items-center px-4">
            <Link legacyBehavior href="/">
              <a className="text-lg font-bold">Amazona</a>
            </Link>

            <div>
              <Link legacyBehavior href="/cart">
                <a className="p-2">Cart</a>
              </Link>
              <Link legacyBehavior href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-4 px-4 "> {children} </main>

        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Amazona</p>
        </footer>
      </div>
    </>
  );
}

export default Layout;
