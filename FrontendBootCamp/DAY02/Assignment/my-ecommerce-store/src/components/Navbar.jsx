import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo — clicking takes you home */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">M</span>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            My<span className="text-violet-600">Shop</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-violet-600 transition-colors">Home</Link>
          <Link to="/" className="hover:text-violet-600 transition-colors">Shop</Link>
          <a href="#" className="hover:text-violet-600 transition-colors">Collections</a>
          <a href="#" className="hover:text-violet-600 transition-colors">About</a>
        </div>

        {/* Cart icon + badge */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-violet-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {/* Badge only shows when cart has items */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm font-medium text-gray-600 border-t border-gray-100">
          <Link to="/" className="py-2 hover:text-violet-600" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/" className="py-2 hover:text-violet-600" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/cart" className="py-2 hover:text-violet-600" onClick={() => setMenuOpen(false)}>Cart ({cartCount})</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
