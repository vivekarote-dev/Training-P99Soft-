import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'

const CartPage = ({ cart, removeFromCart, updateQuantity }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = subtotal > 999 ? 0 : 99
  const total = subtotal + delivery

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-24 flex flex-col items-center gap-4">
          <p className="text-gray-400 text-lg">Your cart is empty</p>
          <Link to="/" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-4">
            {cart.map(item => (
              <CartItem key={item.id} item={item} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4 sticky top-24">
              <h2 className="font-bold text-gray-900 text-lg">Order Summary</h2>
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? 'text-green-600 font-medium' : 'font-medium text-gray-900'}>
                    {delivery === 0 ? 'FREE' : `₹${delivery}`}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span className="text-indigo-600 text-lg">₹{total.toLocaleString()}</span>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer">
                Proceed to Checkout
              </button>
              <Link to="/" className="text-center text-sm text-indigo-600 hover:underline">← Continue Shopping</Link>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default CartPage
