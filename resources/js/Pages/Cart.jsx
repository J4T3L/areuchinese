import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import axios from 'axios';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telepon, setTelepon] = useState('');
  const [pembayaran, setPembayaran] = useState('cash');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const updateQty = (index, newQty) => {
    if (newQty < 1) return;
    const updatedCart = [...cart];
    updatedCart[index].qty = newQty;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
    if (!nama || !alamat || !telepon || !pembayaran) {
      alert('Harap lengkapi semua form.');
      return;
    }

    setLoading(true);

    try {
      await axios.post('/checkout', {
        nama,
        alamat,
        telepon,
        pembayaran,
        items: cart.map(item => ({
          product_id: item.id, 
          qty: item.qty,
          harga: item.harga,
        })),
      });

      alert('Checkout berhasil!');
      localStorage.removeItem('cart');
      setCart([]);
      setNama('');
      setAlamat('');
      setTelepon('');
      setPembayaran('cash');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Terjadi kesalahan saat checkout.');
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="max-w-4xl mx-auto p-6 pt-20">
        <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>

        {cart.length === 0 ? (
          <p className="text-gray-400">Keranjang masih kosong.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.gambar ? `/storage/${item.gambar}` : '/images/no-image.png'}
                      className="w-16 h-16 object-cover rounded"
                      alt={item.nama}
                    />
                    <div>
                      <h2 className="font-bold">{item.nama}</h2>
                      <p className="text-yellow-400">Rp {item.harga.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(index, item.qty - 1)}
                      className="bg-red-600 hover:bg-red-700 rounded px-2 py-1 font-bold"
                    >
                      -
                    </button>
                    <p className="font-bold text-yellow-500">{item.qty}</p>
                    <button
                      onClick={() => updateQty(index, item.qty + 1)}
                      className="bg-green-600 hover:bg-green-700 rounded px-2 py-1 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-6 text-right">
                <p className="text-xl font-semibold text-yellow-500">Total: Rp {total.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-10 bg-gray-800 p-6 rounded shadow space-y-4">
              <h2 className="text-xl font-bold text-white">Form Checkout</h2>

              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Nama Lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Alamat Lengkap"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="No Telepon"
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
              />
              <select
                className="w-full p-2 rounded bg-gray-700 text-white"
                value={pembayaran}
                onChange={(e) => setPembayaran(e.target.value)}
              >
                <option value="cash">Bayar di Tempat (Cash)</option>
                <option value="transfer">Transfer Bank</option>
              </select>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold"
              >
                {loading ? 'Memproses...' : 'Checkout Sekarang'}
              </button>
            </div>
          </>
        )}

        <Link
          href="/barang"
          className="inline-block mt-6 text-yellow-400 hover:text-yellow-500"
        >
          &larr; Lanjut Belanja
        </Link>
      </main>
    </div>
  );
}
