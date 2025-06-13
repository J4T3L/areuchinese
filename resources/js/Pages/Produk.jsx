import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Produk({ products = [], categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.kategori === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header />

      <main className="py-12 max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-white">
          Semua Produk
        </h1>

        <div className="flex justify-center mb-12 space-x-4 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2 rounded-full font-semibold ${
              selectedCategory === 'all'
                ? 'bg-yellow-500 text-gray-900'
                : 'bg-gray-800 hover:bg-yellow-500 text-yellow-400 hover:text-gray-900 transition'
            }`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold capitalize ${
                selectedCategory === cat
                  ? 'bg-yellow-500 text-gray-900'
                  : 'bg-gray-800 hover:bg-yellow-500 text-yellow-400 hover:text-gray-900 transition'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">Produk tidak ditemukan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function ProductCard({ product }) {
  const addToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = storedCart.findIndex((item) => item.id === product.id);

    if (existingItemIndex >= 0) {
      storedCart[existingItemIndex].qty += 1;
    } else {
      storedCart.push({ ...product, qty: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(storedCart));
    alert('Produk ditambahkan ke keranjang!');
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow hover:shadow-yellow-500/60 transition overflow-hidden">
      <img
        src={product.gambar ? `/storage/${product.gambar}` : '/images/no-image.png'}
        alt={product.nama}
        onError={(e) => (e.target.src = '/images/no-image.png')}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate text-white">{product.nama}</h3>
        <p className="text-sm text-gray-400 capitalize">{product.kategori}</p>
        <p className="text-yellow-400 font-bold mt-2">
          Rp {product.harga.toLocaleString()}
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            href={`/barang/${product.id}`}
            className="flex-1 bg-yellow-500 text-white text-center py-2 rounded hover:bg-yellow-600 transition"
          >
            Lihat Detail
          </Link>
          <button
            onClick={addToCart}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
