import { useState } from 'react'

const ProductCard = ({ product, addToCart }) => {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-3 left-3 bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-semibold text-gray-900">{product.name}</h3>
          <p className="text-indigo-600 font-bold text-lg mt-1">₹{product.price.toLocaleString()}</p>
        </div>
        <button
          onClick={handleAdd}
          disabled={added}
          className={`mt-auto w-full py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer
            ${added ? 'bg-green-500 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'}`}
        >
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
