import React from 'react';
import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function ProdukIndex({ auth, products, sort }) {
  const handleSort = (field) => {
    const isSameField = sort.sort === field;
    const direction = isSameField && sort.direction === 'asc' ? 'desc' : 'asc';

    router.get('/dashboard/admin/produk', { sort: field, direction }, { preserveState: true });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Produk</h2>}
    >
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Produk</h1>
          <Link
            href="/dashboard/admin/produk/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Tambah Produk
          </Link>
        </div>

        <div className="overflow-auto bg-white rounded shadow">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 cursor-pointer" onClick={() => handleSort('nama')}>
                  Nama {sort.sort === 'nama' ? (sort.direction === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="p-3 cursor-pointer" onClick={() => handleSort('kategori')}>
                  Kategori {sort.sort === 'kategori' ? (sort.direction === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="p-3 cursor-pointer" onClick={() => handleSort('harga')}>
                  Harga {sort.sort === 'harga' ? (sort.direction === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="p-3 cursor-pointer" onClick={() => handleSort('stok')}>
                  Stok {sort.sort === 'stok' ? (sort.direction === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="p-3">Gambar</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    Tidak ada produk.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="p-3">{product.nama}</td>
                    <td className="p-3 capitalize">{product.kategori}</td>
                    <td className="p-3">Rp {product.harga.toLocaleString('id-ID')}</td>
                    <td className="p-3">{product.stok}</td>
                    <td className="p-3">
                      {product.gambar ? (
                        <img
                          src={`/storage/${product.gambar}`}
                          alt={product.nama}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="p-3">
                      <Link
                        href={`/dashboard/admin/produk/${product.id}/edit`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
