import { useState } from 'react'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

const categories = ['All', ...new Set(products.map(p => p.category))]

const Home = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = products
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Shop the Latest Trends</h1>
        <p className="text-white/80 text-lg mb-8">Premium fashion delivered to your door</p>
        <button
          onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-yellow-300 hover:text-indigo-900 transition-colors cursor-pointer"
        >
          Shop Now
        </button>
      </section>

      {/* Products */}
      <section id="products" className="max-w-6xl mx-auto px-6 py-12">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Our Products</h2>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer
                ${activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-400 hover:text-indigo-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>No products found for "{search}"</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All') }}
              className="mt-3 text-indigo-600 hover:underline text-sm cursor-pointer">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6 text-center mt-16">
        <p className="text-white font-bold text-lg mb-1">ShopEasy</p>
        <p className="text-sm">© 2026 ShopEasy. All rights reserved.</p>
      </footer>
    </main>
  )
}

export default Home
