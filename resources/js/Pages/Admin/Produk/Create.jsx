import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    nama: '',
    kategori: '',
    harga: '',
    stok: '',
    gambar: null,
  });

  const [preview, setPreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/dashboard/admin/produk');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData('gambar', file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block font-semibold">Nama Produk</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={data.nama}
            onChange={(e) => setData('nama', e.target.value)}
          />
          {errors.nama && <div className="text-red-500">{errors.nama}</div>}
        </div>

        <div>
          <label className="block font-semibold">Kategori</label>
          <select
            className="w-full border p-2 rounded"
            value={data.kategori}
            onChange={(e) => setData('kategori', e.target.value)}
          >
            <option value="">Pilih Kategori</option>
            <option value="sembako">Sembako</option>
            <option value="snack">Snack</option>
            <option value="frozen">Frozen Food</option>
          </select>
          {errors.kategori && <div className="text-red-500">{errors.kategori}</div>}
        </div>

        <div>
          <label className="block font-semibold">Harga</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={data.harga}
            onChange={(e) => setData('harga', e.target.value)}
          />
          {errors.harga && <div className="text-red-500">{errors.harga}</div>}
        </div>

        <div>
          <label className="block font-semibold">Stok</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={data.stok}
            onChange={(e) => setData('stok', e.target.value)}
          />
          {errors.stok && <div className="text-red-500">{errors.stok}</div>}
        </div>

        <div>
          <label className="block font-semibold">Gambar (opsional)</label>
          <input
            type="file"
            className="w-full"
            accept="image/*"
            onChange={handleFileChange}
          />
          {errors.gambar && <div className="text-red-500">{errors.gambar}</div>}
        </div>

        {preview && (
          <div className="mt-4">
            <p className="font-semibold mb-1">Preview Gambar:</p>
            <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded border" />
          </div>
        )}

        <button
          type="submit"
          disabled={processing}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
