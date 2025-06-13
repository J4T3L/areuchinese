import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function InventoryForm({ title, buttonColor, products, form, onSubmit }) {
  return (
    <div className="mb-6 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-3" autoComplete="off" noValidate>
        <select
          className={`border p-2 w-full rounded ${form.errors.product_id ? 'border-red-500' : 'border-gray-300'}`}
          value={form.data.product_id}
          onChange={(e) => form.setData('product_id', e.target.value)}
          required
        >
          <option value="">Pilih Produk</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nama}
            </option>
          ))}
        </select>
        {form.errors.product_id && <p className="text-red-500 text-sm">{form.errors.product_id}</p>}

        <input
          type="number"
          min="1"
          className={`border p-2 w-full rounded ${form.errors.jumlah ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Jumlah"
          value={form.data.jumlah}
          onChange={(e) => form.setData('jumlah', e.target.value)}
          required
        />
        {form.errors.jumlah && <p className="text-red-500 text-sm">{form.errors.jumlah}</p>}

        <input
          type="text"
          className="border p-2 w-full rounded border-gray-300"
          placeholder="Keterangan (opsional)"
          value={form.data.keterangan}
          onChange={(e) => form.setData('keterangan', e.target.value)}
        />
        {form.errors.keterangan && <p className="text-red-500 text-sm">{form.errors.keterangan}</p>}

        <button
          type="submit"
          disabled={form.processing || !form.data.product_id || !form.data.jumlah}
          className={`${buttonColor} text-white px-4 py-2 rounded disabled:opacity-50 w-full`}
        >
          Simpan {title}
        </button>
      </form>
    </div>
  );
}

export default function Index({ auth, products, logs, purchases }) {
  const masuk = useForm({ product_id: '', jumlah: '', keterangan: '' });
  const keluar = useForm({ product_id: '', jumlah: '', keterangan: '' });

  const submitMasuk = async (e) => {
    e.preventDefault();
    await masuk.post('/dashboard/admin/inventory/masuk', {
      onSuccess: () => masuk.reset(),
    });
  };

  const submitKeluar = async (e) => {
    e.preventDefault();
    await keluar.post('/dashboard/admin/inventory/keluar', {
      onSuccess: () => keluar.reset(),
    });
  };

  const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth() + 1);
  const [filterTipe, setFilterTipe] = React.useState('semua');
  const [filterPembayaran, setFilterPembayaran] = React.useState('semua');

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Inventory</h2>}
    >
      <div className="p-6 max-w-7xl mx-auto">
        <div className="md:flex md:space-x-6">
          <div className="md:w-1/3 space-y-6">
            <InventoryForm
              title="Barang Masuk"
              buttonColor="bg-green-600 hover:bg-green-700"
              products={products}
              form={masuk}
              onSubmit={submitMasuk}
            />

            <InventoryForm
              title="Barang Keluar"
              buttonColor="bg-red-600 hover:bg-red-700"
              products={products}
              form={keluar}
              onSubmit={submitKeluar}
            />
          </div>

          <div className="md:w-2/3 mt-10 md:mt-0 space-y-10">
            {/* Log Barang Masuk/Keluar */}
            <div className="bg-white p-4 rounded shadow overflow-auto max-h-[300px]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <h2 className="text-lg font-semibold">Riwayat Barang Masuk/Keluar</h2>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    className="border rounded px-2 py-1"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {new Date(0, i).toLocaleString('id-ID', { month: 'long' })}
                      </option>
                    ))}
                  </select>

                  <select
                    className="border rounded px-2 py-1"
                    value={filterTipe}
                    onChange={(e) => setFilterTipe(e.target.value)}
                  >
                    <option value="semua">Semua</option>
                    <option value="masuk">Barang Masuk</option>
                    <option value="keluar">Barang Keluar</option>
                  </select>

                  <a
                    href={`/dashboard/admin/inventory/download?month=${selectedMonth}&tipe=${filterTipe}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                  >
                    Download
                  </a>
                </div>
              </div>

              <table className="w-full text-left border border-gray-300 table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Tanggal</th>
                    <th>Produk</th>
                    <th>Tipe</th>
                    <th>Jumlah</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-gray-500">
                        Tidak ada data riwayat.
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id} className="border-t">
                        <td className="p-2 whitespace-nowrap">
                          {new Date(log.created_at).toLocaleString('id-ID', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </td>
                        <td>{log.product.nama}</td>
                        <td className={log.tipe === 'masuk' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                          {log.tipe.charAt(0).toUpperCase() + log.tipe.slice(1)}
                        </td>
                        <td>{log.jumlah}</td>
                        <td>{log.keterangan || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Log Pembelian */}
            <div className="bg-white p-4 rounded shadow overflow-auto max-h-[300px]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <h2 className="text-lg font-semibold">Riwayat Pembelian</h2>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    className="border rounded px-2 py-1"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {new Date(0, i).toLocaleString('id-ID', { month: 'long' })}
                      </option>
                    ))}
                  </select>

                  <select
                    className="border rounded px-2 py-1"
                    value={filterPembayaran}
                    onChange={(e) => setFilterPembayaran(e.target.value)}
                  >
                    <option value="semua">Semua</option>
                    <option value="cash">Cash</option>
                    <option value="transfer">Transfer Bank</option>
                  </select>

                  <a
                    href={`/dashboard/admin/inventory/purchase/download?month=${selectedMonth}&pembayaran=${filterPembayaran}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                  >
                    Download Pembelian
                  </a>
                </div>
              </div>

              <table className="w-full text-left border border-gray-300 table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Tanggal</th>
                    <th>Nama Pembeli</th>
                    <th>Alamat</th>
                    <th>No HP</th>
                    <th>Metode Pembayaran</th>
                    <th>Total Pembelian</th>
                  </tr>
                </thead>
                <tbody>
                  {(!purchases || purchases.length === 0) ? (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-gray-500">
                        Tidak ada data pembelian.
                      </td>
                    </tr>
                  ) : (
                    purchases.map((purchase) => (
                      <tr key={purchase.id} className="border-t">
                        <td className="p-2 whitespace-nowrap">
                          {new Date(purchase.created_at).toLocaleString('id-ID', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </td>
                        <td>{purchase.nama}</td>
                        <td>{purchase.alamat}</td>
                        <td>{purchase.telepon}</td>
                        <td>{purchase.pembayaran === 'cash' ? 'Cash' : 'Transfer Bank'}</td>
                        <td>Rp {purchase.total.toLocaleString()}</td>
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
