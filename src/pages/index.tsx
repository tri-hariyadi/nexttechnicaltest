/* eslint-disable react-hooks/exhaustive-deps */
import { Inter } from 'next/font/google'
import { useCallback, useEffect, useRef, useState } from 'react';
import ProductFilter from '@/components/ProductFilter'
import Cards from '@/components/Cards';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] });

type Product = {
  id: number,
  title: string,
  price: number,
  images: Array<string>
}

type DataProduct = {
  products: Array<Product>,
  limit: number,
  skip: number,
  total: number
}

type staticProps = {
    categories: Array<any>,
    products: DataProduct
}


export default function Home({categories, products}: staticProps) {
  const [dataProducts, setDataProducts] = useState<DataProduct>({
    products: [],
    skip: 0,
    limit: 10,
    total: 0
  });                                  
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const filterByCategory = useRef(false);
  const loader = useRef(null);

  async function getProduct(skip = 0) {
    console.log('PerPage', perPage)
    try {
      setLoading(true);
      const resp = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip > 0 ? skip : perPage}&select=title,price,description,images`);
      const data = await resp.json();
      setDataProducts((prev: DataProduct) => ({
        products: skip > 0 ? data.products : [...prev.products, ...data.products],
        limit: data.limit,
        skip: data.skip,
        total: data.total
      }));
    } catch (error) {}
    setLoading(false);
  }

  async function getProductByCategory(category: string) {
    try {
      const resp = await fetch(`https://dummyjson.com/products/category/${category}`);
      const products = await resp.json();
      setDataProducts((prev: DataProduct) => ({
        ...prev,
        products: products.products
      }));
    } catch (error) {}
  }

  const filterProduct = useCallback(
    (category: string) => {
      filterByCategory.current = true;
      if (!category) {
        filterByCategory.current = false;
        return getProduct(10);
      }
      getProductByCategory(category);
    },
    [],
  );

  useEffect(() => {
    if (Object.keys(products).length) {
      setDataProducts({
        products: products.products,
        limit: products.limit,
        skip: products.skip,
        total: products.total
      });
    }
  }, [products]);

  useEffect(() => {
    if (perPage > 10) {
      getProduct();
    }
  }, [perPage])
  

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting && !filterByCategory.current) {
      setPerPage(prev => prev + 5);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  
  return (
    <div>
      <ProductFilter categories={categories} filterProduct={filterProduct} />
      <div className="grid grid-cols-1 place-items-center md:place-items-stretch md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-9 w-10/12 m-auto">
        {dataProducts?.products?.map((product: any) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Cards title={product.title} description={product.description} images={product.images} price={product.price} />
          </Link>
        ))}
      </div>
      {loading && <p className='fixed bottom-0 left-0 right-0 bg-teal-500 text-center font-semibold text-xl text-white py-1 opacity-80'>
        Loading...
      </p>}
      <div ref={loader} />
      <footer className="flex justify-center items-center bg-gray-200 py-6 mt-48">
            <p className='text-gray-500 font-semibold text-lg'>Made with ❤️</p>
        </footer>
    </div>
  )
}

export async function getStaticProps() {
  const data = {
    categories: [],
    products: []
  }

  async function getCategory() {
    try {
      const resp = await fetch('https://dummyjson.com/products/categories');
      data.categories = await resp.json();
    } catch (error) {}
  }
  
  async function getProduct() {
    try {
      const resp = await fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price,description,images');
      data.products = await resp.json();
    } catch (error) {}
  }

  await Promise.all([getCategory(), getProduct()]);

  return {
    props: {...data}
  }
} 
