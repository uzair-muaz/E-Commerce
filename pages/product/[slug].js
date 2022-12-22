import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../Components/Layout'
import data from '../../utils/data';

export default function ProductScreen() {

    const { query } = useRouter();
    const { slug } = query;
    const product = data.products.find(x => x.slug === slug);
    if (!product) {
        return <h1> Product not found !!!  </h1>
    }
    return (
        <Layout title={product.name} >
            <div className='py-2'>
                {/* back button */}
                <Link legacyBehavior href="/">
                    <a>
                        <button className="primary-button"> Back to products</button>
                    </a>
                </Link>
            </div>

            <div className='grid md:grid-cols-4 md:gap-3 py-2'>
                {/* product image */}
                <div className='md: col-span-2 bg-yellow-300'>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={640}
                        height={640}
                        layout="responsive"
                    ></Image>
                </div>

                {/* product info*/}
                <div>
                    <ul>
                        <li>
                            <h1 className="text-lg">{product.name}</h1>
                        </li>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>
                            {product.rating} of {product.numReviews} reviews
                        </li>
                        <li>Description: {product.description}</li>
                    </ul>
                </div>

                {/* price */}
                <div>
                    {/* the upper div cover the whole screen to display the card properly we use another div */}
                    <div className='card p-5'>
                        <div className='flex mb-2 justify-between'>
                            <div className=''>Price  </div>
                            <div className=''>${product.price}</div>
                        </div>

                        <div className="mb-2 flex justify-between">
                            <div>Status</div>
                            <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
                        </div>
                        <button
                            className="primary-button w-full"
                        // onClick={addToCartHandler}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>

            </div>
        </Layout >
    )
}