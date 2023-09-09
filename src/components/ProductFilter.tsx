import { useState } from "react";

type Props = {
    categories: Array<string>,
    filterProduct: (category: string) => void
}

const ProductFilter = ({categories, filterProduct}: Props) => {
    const [selectValue, setSelectValue] = useState('Apple');

    return (
        <div className="flex items-center bg-purple-400 px-20 py-5 justify-between">
            <h1 className="text-2xl font-bold text-white">Anonim Market</h1>
            <div className="flex items-center gap-2 w-6/12">
                <label className="text-gray-700 text-sm font-bold">Filter Product</label>
                <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex-1 p-2.5"
                    value={selectValue}
                    onChange={(e) => {
                        setSelectValue(e.target.value);
                        filterProduct(e.target.value);
                    }}>
                        {categories.map((category, idx) => (
                            <option key={`category-${idx}`} value={category}>{category}</option>
                        ))}
                </select>
            </div>
        </div>
    );
}

export default ProductFilter