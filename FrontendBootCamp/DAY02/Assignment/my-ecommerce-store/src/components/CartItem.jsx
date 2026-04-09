// CartItem displays a single row in the cart page
// Props: item (product + quantity), removeFromCart, updateQuantity
const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm">

      {/* Product thumbnail */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
      />

      {/* Name + price */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug truncate">{item.name}</h3>
        <p className="text-violet-600 font-bold mt-1">₹{item.price.toLocaleString()}</p>
        <p className="text-gray-400 text-xs mt-0.5">{item.category}</p>
      </div>

      {/* Quantity controls: minus, number, plus */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-violet-50 hover:border-violet-400 transition-colors cursor-pointer"
        >
          −
        </button>
        <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-violet-50 hover:border-violet-400 transition-colors cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Line total: price × quantity */}
      <p className="font-bold text-gray-900 text-sm w-20 text-right">
        ₹{(item.price * item.quantity).toLocaleString()}
      </p>

      {/* Remove button */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer ml-2"
        aria-label="Remove item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
