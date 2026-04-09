import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

// CartPage receives cart array, removeFromCart, updateQuantity from App
const CartPage = ({ cart, removeFromCart, updateQuantity }) => {

  // Total price = sum of (price × quantity) for every item
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Delivery is free above ₹999
  const delivery = total > 999 ? 0 : 99;

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        // Empty state
        <div className="text-center py-24 flex flex-col items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-gray-400 text-lg">Your cart is empty</p>
          <Link
            to="/"
            className="mt-2 bg-violet-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-violet-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Cart items list */}
          <div className="flex-1 flex flex-col gap-4">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4 sticky top-24">
              <h2 className="font-bold text-gray-900 text-lg">Order Summary</h2>

              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? "text-green-600 font-medium" : "font-medium text-gray-900"}>
                    {delivery === 0 ? "FREE" : `₹${delivery}`}
                  </span>
                </div>
                {delivery > 0 && (
                  <p className="text-xs text-gray-400">Add ₹{(999 - total).toLocaleString()} more for free delivery</p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span className="text-violet-600 text-lg">₹{(total + delivery).toLocaleString()}</span>
              </div>

              <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer">
                Proceed to Checkout
              </button>

              <Link to="/" className="text-center text-sm text-violet-600 hover:underline">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;
