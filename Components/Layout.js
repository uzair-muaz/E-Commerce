import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import { Menu } from '@headlessui/react'
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

function Layout({ title, children }) {
  // status is a flag it tells if the session is still loading or not
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemCount, setCartItemCount] = useState(0);
  //use Effect only renders on the client side thats why it resolves the hydaration problem (SSR issue)
  useEffect(() => {
    setCartItemCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
  }, [cart.cartItems])

  const logoutClickHander = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: "/login" });
  }

  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position='bottom-center' limit={1} />

      <div className="flex flex-col min-h-screen justify-between">
        <header>
          <nav className="flex justify-between shadow-md h-12 items-center px-4">
            <Link legacyBehavior href="/">
              <a className="text-lg font-bold">Amazona</a>
            </Link>

            <div>
              <Link legacyBehavior href="/cart">
                <a className="p-2">Cart
                  {cartItemCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemCount}
                    </span>
                  )}
                </a>
              </Link>
              {/* if loading show loading */}
              {status === 'loading' ? ('Loading')
                // else check if user exists than show user
                : session?.user ? <Menu as='div' className="relative inline-block">
                  <Menu.Button className="text-sky-600">{session.user.name}</Menu.Button>
                  <Menu.Items className="absolute bg-white shadow-lg right-0 w-56 origin-top-right rounded mt-1 border-sky-300 border-2">
                    <Menu.Item>
                      <DropdownLink href="/profile" className="dropdown">Profile</DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink href="/order-history" className="dropdown">Order History</DropdownLink>
                    </Menu.Item>
                    <Menu.Item >
                      <a className='dropdown' href='#' onClick={logoutClickHander}>Logout</a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
                  //else Show Login
                  : (
                    <Link legacyBehavior href='/login'>
                      <a className='p-2'>Login</a>
                    </Link>
                  )}

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
