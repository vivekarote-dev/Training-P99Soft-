import { Link } from 'react-router-dom'

const Navbar = ({ cartCount }) => (
  <nav className="sticky top-0 z-50 bg-white shadow-md">
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-indigo-600">ShopEasy</Link>

      <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <Link to="/" className="hover:text-indigo-600 transition-colors">Shop</Link>
        <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
      </div>

      <Link to="/cart" className="relative p-2 rounded-full hover:bg-indigo-50 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  </nav>
)

export default Navbar
