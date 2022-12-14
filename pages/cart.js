import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import { Store } from '../utils/Store'
import { XCircleIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
function CartScreen() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { cart: { cartItems } } = state;


    const removeItem = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };

    const updateCart = async (item, qty) => {
        const quantity = Number(qty);
        const { data } = await axios.get(`/api/products/${item._id}`);

        if (data.countInStock < quantity) {
            return toast.error('Sorry. Product is out of stock');
        }

        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
        toast.success('Product updated in the cart');
    };
    return (
        <Layout title={"Shopping Cart"} >
            <h1 className="mb-4 text-xl">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div>
                    <h1 className='text-xl'>Cart is empty.</h1>
                    <div>
                        <Link legacyBehavior href="/">
                            <a>
                                <button className="primary-button mt-3"> Go Shopping</button>
                            </a>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <table className="min-w-full ">
                            <thead className="border-b">
                                <tr>
                                    <th className="p-5 text-left">Item</th>
                                    <th className="p-5 text-right">Quantity</th>
                                    <th className="p-5 text-right">Price</th>
                                    <th className="p-5">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.slug} className="border-b">
                                        <td>
                                            <Link legacyBehavior href={`/product/${item.slug}`}>
                                                <a className="flex items-center">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                    ></Image>
                                                    &nbsp;
                                                    {item.name}
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="p-5 text-right">

                                            <select value={item.quantity} onChange={(e) => updateCart(item, e.target.value)}>
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>


                                        </td>
                                        <td className="p-5 text-right">${item.price}</td>
                                        <td className="p-5 text-center">
                                            <button onClick={() => removeItem(item)}>
                                                <XCircleIcon className="h-5 w-5"></XCircleIcon>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card p-5">
                        <ul>
                            <li>
                                <div className="pb-3 text-xl">
                                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                                </div>
                            </li>
                            <li>
                                <button
                                    onClick={() => router.push('login?redirect=/shipping')}
                                    className="primary-button w-full"
                                >
                                    Check Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>


            )}


        </Layout>

    )
}


//the server side didnt had the cookies with the client side had the cookies to solve this issue we turn off the server side rendering
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });