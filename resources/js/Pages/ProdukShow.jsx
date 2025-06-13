import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function ProdukShow({ product }) {
  const [cart, setCart] = useState([]);

  const handleAddToCart = () => {
    // Simpan sementara di localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, {
      id: product.id,
      nama: product.nama,
      harga: product.harga,
      gambar: product.gambar,
      qty: 1,
    }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Produk ditambahkan ke keranjang!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <main className="max-w-4xl mx-auto p-6 pt-20">
        <Link
          href="/barang"
          className="inline-block mb-6 text-yellow-400 hover:text-yellow-500 font-semibold"
        >
          &larr; Kembali ke Produk
        </Link>

        <div className="bg-gray-800 rounded-xl shadow p-6 flex flex-col md:flex-row gap-8">
          <img
            src={product.gambar ? `/storage/${product.gambar}` : '/images/no-image.png'}
            alt={product.nama}
            onError={(e) => (e.target.src = '/images/no-image.png')}
            className="w-full md:w-1/2 h-auto rounded-lg object-cover"
          />

          <div className="flex flex-col justify-between w-full">
            <div>
              <h1 className="text-3xl font-extrabold mb-4">{product.nama}</h1>
              <p className="text-yellow-400 font-semibold capitalize mb-4">{product.kategori}</p>
              <p className="text-yellow-500 text-2xl font-bold mb-6">
                Rp {product.harga.toLocaleString()}
              </p>
              <p className="text-gray-300 mb-6">
                Stok tersedia: <span className="font-semibold">{product.stok}</span>
              </p>
              <button
                onClick={handleAddToCart}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-2 rounded-lg transition"
              >
                Tambahkan ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
