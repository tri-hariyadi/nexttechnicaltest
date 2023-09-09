import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {formatter} from '@/utils/currencyFormatter';

const ProductDetail = ({product}: any) => {
    const [imageIsView, setImageIsView] = useState<string>('');

    useEffect(() => {
        if (product) {
            setImageIsView(`${product?.images?.[0]}-0`)
        }
    }, [product]);


    return (
        <div className='flex h-screen w-screen justify-center items-center py-6 px-5 md:px-0'>
            <div className="flex justify-center gap-10 max-w-screen-lg flex-col md:flex-row">
                <div className='basis-1/2 shrink-0 grow-0'>
                    <div className='w-full h-auto'>
                        <Image
                            src={imageIsView?.split('-')[0] ?? product?.images?.[0]}
                            alt="profile"
                            sizes="100vw"
                            width={100}
                            height={100}
                            className='w-full h-96 object-contain'
                        />
                    </div>
                    <div className='flex gap-4 mt-3'>
                        {Array.isArray(product?.images) && product?.images.map((image: string, idx: number) => (
                            <button key={`image-${idx}`}
                                className={[
                                    'rounded cursor-pointer px-2 relative w-16 h-16',
                                    imageIsView.split('-')[1] == String(idx) ? 'border-teal-500 border-2 border-solid' : ''].join(' ')}
                                onClick={() => setImageIsView(`${image}-${idx}`)}>
                                <Image
                                    src={image}
                                    alt="Picture of the author"
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-xl"
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <div className='basis-1/2'>
                    <h1 className='text-3xl font-bold mb-2'>{product?.title}</h1>
                    <p className='mb-3'>rating {product?.rating}</p>
                    <p className='text-3xl mb-2'>{formatter(product?.price || 0)}</p>
                    <p className='mb-3'>{product?.description}</p>
                    <p className='font-bold text-lg mb-1 text-teal-500'>Detail</p>
                    <div className="h-[1px] w-full bg-teal-500 mb-2"></div>
                    <ul>
                        <li>
                            <p>brand: {product?.brand}</p>
                        </li>
                        <li>
                            <p>stock: {product?.stock}</p>
                        </li>
                        <li>
                            <p>category: {product?.category}</p>
                        </li>
                        <li>
                            <p>discount: {product?.discountPercentage}%</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context: any) {
    const resp = await fetch(`https://dummyjson.com/products/${context.params.id}`);
    const product = await resp.json();
    return {
        props: {product}
    }
}

export default ProductDetail