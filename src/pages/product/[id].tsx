import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/router';

const ProductDetail = () => {
    const [product, setProduct] = useState<any>({});
    const [imageIsView, setImageIsView] = useState<string>('')
    const router = useRouter();
    const {id} = router.query;

    async function getProduct() {
        try {
            const resp = await fetch(`https://dummyjson.com/products/${id}`);
            const product = await resp.json();
            setProduct(product);
            setImageIsView(`${product.images?.[0]}-0`)
        } catch (error) {}
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <div className='grid grid-cols-5 gap-7 w-2/3 m-auto'>
                <div className='col-span-2'>
                    <img className='object-fill h-60 w-full' src={imageIsView?.split('-')[0] ?? product.images?.[0]} alt="product" />
                    <div className='flex gap-4 mt-3'>
                        {Array.isArray(product.images) && product.images.map((image: string, idx: number) => (
                            <button key={`image-${idx}`}
                                className={[
                                    'rounded cursor-pointer p-2',
                                    imageIsView.split('-')[1] == String(idx) ? 'border-teal-500 border-2 border-solid' : ''].join(' ')}
                                onClick={() => setImageIsView(`${image}-${idx}`)}>
                                <img src={image} alt="images" className='w-12 max-h-12' />
                            </button>
                        ))}
                    </div>
                </div>
                <div className='col-span-3'>
                    <h1 className='text-3xl font-bold mb-2'>{product.title}</h1>
                    <p className='mb-3'>rating {product.rating}</p>
                    <p className='text-3xl mb-2'>USD {product.price}</p>
                    <p className='mb-3'>{product.description}</p>
                    <p className='font-bold text-lg mb-1 text-teal-500'>Detail</p>
                    <ul>
                        <li>
                            <p>brand: {product.brand}</p>
                        </li>
                        <li>
                            <p>stock: {product.stock}</p>
                        </li>
                        <li>
                            <p>category: {product.category}</p>
                        </li>
                        <li>
                            <p>discount: {product.discountPercentage}%</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail