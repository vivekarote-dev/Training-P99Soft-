import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

// Build category list dynamically from products data
const categories = ["All", ...new Set(products.map((p) => p.category))];

// Home receives addToCart, wishlist array, and toggleWishlist from App
const Home = ({ addToCart, wishlist, toggleWishlist }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  // search query state — filters products by name
  const [search, setSearch] = useState("");

  // Filtering logic:
  // 1. Filter by category (skip if "All")
  // 2. Then filter by search query (case-insensitive name match)
  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <main>
      {/* ── Hero Banner ── */}
      <section className="bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              New Arrivals 2026
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Style That Speaks <br />
              <span className="text-yellow-300">For Itself</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-md">
              Discover premium fashion, footwear, and accessories curated just for you.
            </p>
            <div className="flex gap-3 justify-center md:justify-start flex-wrap">
              <button
                onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}
                className="bg-white text-violet-700 font-semibold px-6 py-3 rounded-xl hover:bg-yellow-300 hover:text-violet-900 transition-colors cursor-pointer"
              >
                Shop Now
              </button>
              <button className="border border-white/50 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                View Collections
              </button>
            </div>
          </div>

          {/* Hero image grid */}
          <div className="flex-1 flex justify-center">
            <div className="grid grid-cols-2 gap-3 max-w-xs w-full">
              {products.slice(0, 4).map((p) => (
                <div key={p.id} className="rounded-xl overflow-hidden aspect-square shadow-lg">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: "Products", value: "200+" },
            { label: "Happy Customers", value: "10K+" },
            { label: "Brands", value: "50+" },
            { label: "Free Shipping", value: "₹999+" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-extrabold text-violet-600">{s.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Products Section ── */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-12">

        {/* Top bar: title + search + category filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Products</h2>
              <p className="text-gray-500 text-sm mt-1">
                {filtered.length === 0 ? "No products found" : `Showing ${filtered.length} item${filtered.length > 1 ? "s" : ""}`}
              </p>
            </div>

            {/* Search bar — filters by product name as you type */}
            <div className="relative w-full md:w-64">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
              />
              {/* Clear button appears when there's text */}
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer
                  ${activeCategory === cat
                    ? "bg-violet-600 text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-violet-400 hover:text-violet-600"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid or empty state */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No products match "{search}"</p>
            <button onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-4 text-violet-600 hover:underline text-sm cursor-pointer">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                addToCart={addToCart}
                isWishlisted={wishlist.includes(p.id)}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-400 mt-16 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <span className="text-white font-bold text-lg">My<span className="text-violet-400">Shop</span></span>
            <p className="text-sm mt-2 max-w-xs">Premium fashion and accessories delivered to your door.</p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-white font-semibold mb-1">Shop</span>
              <a href="#" className="hover:text-white transition-colors">New Arrivals</a>
              <a href="#" className="hover:text-white transition-colors">Best Sellers</a>
              <a href="#" className="hover:text-white transition-colors">Sale</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-semibold mb-1">Help</span>
              <a href="#" className="hover:text-white transition-colors">FAQ</a>
              <a href="#" className="hover:text-white transition-colors">Shipping</a>
              <a href="#" className="hover:text-white transition-colors">Returns</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-800 text-xs text-center">
          © 2026 MyShop. All rights reserved.
        </div>
      </footer>
    </main>
  );
};

export default Home;
