import { useState } from "react";

// ProductCard receives: product data, addToCart fn, wishlist state, toggleWishlist fn
const ProductCard = ({ product, addToCart, isWishlisted, toggleWishlist }) => {
  // Local state to show "Added!" feedback for 1.5s after clicking
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">

      {/* Product image with category badge + wishlist button */}
      <div className="relative overflow-hidden h-56 bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category label top-left */}
        <span className="absolute top-3 left-3 bg-white text-violet-600 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
          {product.category}
        </span>

        {/* Heart / wishlist button top-right */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
          aria-label="Toggle wishlist"
        >
          {/* Filled heart if wishlisted, outline if not */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"
            fill={isWishlisted ? "#ef4444" : "none"}
            stroke={isWishlisted ? "#ef4444" : "#9ca3af"}
            strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Card content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-base leading-snug">{product.name}</h3>
          <p className="text-violet-600 font-bold text-lg mt-1">₹{product.price.toLocaleString()}</p>
        </div>

        {/* Add to Cart button — changes to green "Added!" briefly */}
        <button
          onClick={handleAdd}
          disabled={added}
          className={`mt-auto w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer
            ${added
              ? "bg-green-500 text-white cursor-default"
              : "bg-violet-600 hover:bg-violet-700 text-white active:scale-95"
            }`}
        >
          {added ? "✓ Added to Cart!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
