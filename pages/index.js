import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../Components/Layout';
import ProductItem from '../Components/ProductItem';
import Product from '../Models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home({ products }) {

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry!!! Product is out of stock', { autoClose: 1500, closeOnClick: true, });
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart', {
      autoClose: 1500,
      closeOnClick: true,
    });
  };

  return (
    <Layout title={'Home Page'}>
      <section className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4 ">
        {products.map((product) => (
          <ProductItem key={product.slag} product={product} addToCartHandler={addToCartHandler} />
        ))}
      </section>
    </Layout>
  );
}

//This function runs before loading the page 
export async function getServerSideProps() {
  await db.connect();
  //lean function cuts out the meta data of mongoDB
  var products = await Product.find().lean();
  products = products.map(db.convertDocToObj);
  await db.disconnect();


  return {
    props: {
      products,
    },
  };
}
