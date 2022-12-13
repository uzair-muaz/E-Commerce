import Layout from '../Components/Layout';
import ProductItem from '../Components/ProductItem';
import data from '../utils/data';

export default function Home() {
  return (
    <Layout title={'Home Page'}>
      <section className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4 ">
        {data.products.map((product) => (
          <ProductItem key={product.slag} product={product} />
        ))}
      </section>
    </Layout>
  );
}
