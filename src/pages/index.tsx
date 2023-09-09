import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useCallback, useEffect, useState } from 'react';
import ProductFilter from '@/components/ProductFilter'
import Cards from '@/components/Cards';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState<any>({});

  async function getCategory() {
    try {
      const resp = await fetch('https://dummyjson.com/products/categories');
      const category = await resp.json();
      setCategories(category);
    } catch (error) {}
  }
  
  async function getProduct() {
    try {
      const resp = await fetch('https://dummyjson.com/products');
      const products = await resp.json();
      setProducts(products);
    } catch (error) {}
  }

  async function getProductByCategory(category: string) {
    try {
      const resp = await fetch(`https://dummyjson.com/products/category/${category}`);
      const products = await resp.json();
      setProducts(products);
    } catch (error) {}
  }

  const filterProduct = useCallback(
    (category: string) => {
      getProductByCategory(category);
    },
    [],
  )
  

  useEffect(() => {
    getCategory();
    getProduct();
  }, [])
  
  return (
    <div>
      <ProductFilter categories={categories} filterProduct={filterProduct} />
      <div className="grid grid-cols-4 gap-10 my-5 w-10/12 m-auto">
        {products.products?.map((product: any) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Cards title={product.title} description={product.description} images={product.images} price={product.price} />
          </Link>
        ))}
      </div>
    </div>
  )
}
