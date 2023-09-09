import Image from "next/image";
import {formatter} from '@/utils/currencyFormatter';

type Props = {
    title: string,
    description: string,
    price: number,
    images: Array<string>
}

const Cards = ({title, description, images, price}: Props) => {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg h-full border border-gray-200 border-solid">
            <div className="relative h-60 w-full">
                <Image
                    src={images[0]}
                    alt="profile"
                    sizes="100vw"
                    fill
                    className='w-full h-96 object-contain'
                />
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    {description}
                </p>
                <p className="font-bold text-lg mt-2 text-teal-500">{formatter(price)}</p>
            </div>
        </div>
    )
}

export default Cards