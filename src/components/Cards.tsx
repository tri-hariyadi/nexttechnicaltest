
type Props = {
    title: string,
    description: string,
    price: number,
    images: Array<string>
}

const Cards = ({title, description, images, price}: Props) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg h-full">
            <div>
                <img className='object-contain h-48 w-96' src={images[0]} alt="Sunset in the mountains"></img>
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    {description}
                </p>
                <p className="font-bold text-lg mt-2">USD {price}</p>
            </div>
        </div>
    )
}

export default Cards