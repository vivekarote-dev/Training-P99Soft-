const CartItem = ({ item, removeFromCart, updateQuantity }) => (
  <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm">
    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />

    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h3>
      <p className="text-indigo-600 font-bold mt-1">₹{item.price.toLocaleString()}</p>
    </div>

    <div className="flex items-center gap-2">
      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-indigo-50 cursor-pointer">−</button>
      <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-indigo-50 cursor-pointer">+</button>
    </div>

    <p className="font-bold text-gray-900 text-sm w-20 text-right">₹{(item.price * item.quantity).toLocaleString()}</p>

    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer ml-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
)

export default CartItem
