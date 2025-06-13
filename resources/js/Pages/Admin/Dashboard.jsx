import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function Dashboard({ auth, products = [], logs = [] }) {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.kategori).filter(Boolean)));
    return cats;
  }, [products]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLogType, setSelectedLogType] = useState('');

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(p => p.kategori === selectedCategory);
  }, [products, selectedCategory]);

  const filteredLogs = useMemo(() => {
    if (!selectedLogType) return logs;
    return logs.filter(l => l.tipe === selectedLogType);
  }, [logs, selectedLogType]);

  const totalStok = useMemo(() => {
    return products.reduce((sum, p) => sum + (p.stok || 0), 0);
  }, [products]);

  const formatter = useMemo(() => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }), []);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Selamat datang, {auth.user.name}!</h1>
          <p className="text-gray-700 mb-6">Kamu berhasil login ke dashboard.</p>

          {/* Ringkasan sederhana */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <div className="p-6 bg-gray-100 rounded shadow flex flex-col items-center justify-center">
    <h3 className="font-semibold text-lg mb-2">Jumlah Kategori</h3>
    <p className="text-3xl font-bold">{categories.length}</p>
  </div>
  <div className="p-6 bg-gray-100 rounded shadow flex flex-col items-center justify-center">
    <h3 className="font-semibold text-lg mb-2">Total Produk</h3>
    <p className="text-3xl font-bold">{products.length}</p>
  </div>
  <div className="p-6 bg-gray-100 rounded shadow flex flex-col items-center justify-center">
    <h3 className="font-semibold text-lg mb-2">Total Stok Semua Barang</h3>
    <p className="text-3xl font-bold">{totalStok}</p>
  </div>
</div>


          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Daftar Produk</h2>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border p-2 rounded mb-4"
            >
              <option value="">Kategori</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.length === 0 ? (
                <p className="text-gray-500 col-span-full">Tidak ada produk di kategori ini.</p>
              ) : (
                filteredProducts.map((product) => (
                  <div key={product.id} className="border rounded p-4 shadow-sm">
                    <h3 className="font-semibold">{product.nama}</h3>
                    <p className="text-sm text-gray-600 capitalize">{product.kategori}</p>
                    <p className="font-bold text-yellow-600 mt-1">{formatter.format(product.harga)}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Riwayat Inventory</h2>
            <select
              value={selectedLogType}
              onChange={(e) => setSelectedLogType(e.target.value)}
              className="border p-2 rounded mb-4"
            >
              <option value="">Semua Tipe</option>
              <option value="masuk">Masuk</option>
              <option value="keluar">Keluar</option>
            </select>

            <div className="overflow-auto max-h-96 border rounded shadow">
              <table className="w-full text-left border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border border-gray-300">Tanggal</th>
                    <th className="p-2 border border-gray-300">Produk</th>
                    <th className="p-2 border border-gray-300">Tipe</th>
                    <th className="p-2 border border-gray-300">Jumlah</th>
                    <th className="p-2 border border-gray-300">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">
                        Tidak ada data riwayat.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="border-t">
                        <td className="p-2 whitespace-nowrap">{new Date(log.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                        <td className="p-2">{log.product.nama}</td>
                        <td className={`p-2 font-semibold ${log.tipe === 'masuk' ? 'text-green-600' : 'text-red-600'}`}>
                          {log.tipe.charAt(0).toUpperCase() + log.tipe.slice(1)}
                        </td>
                        <td className="p-2">{log.jumlah}</td>
                        <td className="p-2">{log.keterangan || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </AuthenticatedLayout>
  );
}
