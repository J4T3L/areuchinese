import React from 'react';
import Header from '@/Components/Header';

export default function Kontak() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header />

      <main className="py-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-yellow-400 text-center">Kontak Kami</h1>

        <form className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
          <label className="block mb-4">
            <span className="text-gray-300">Nama</span>
            <input
              type="text"
              name="nama"
              placeholder="Nama Anda"
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-gray-200 px-3 py-2 focus:outline-yellow-400"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-300">Email</span>
            <input
              type="email"
              name="email"
              placeholder="email@contoh.com"
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-gray-200 px-3 py-2 focus:outline-yellow-400"
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-300">Pesan</span>
            <textarea
              name="pesan"
              rows="5"
              placeholder="Tulis pesan Anda..."
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-gray-200 px-3 py-2 focus:outline-yellow-400 resize-none"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-md transition"
          >
            Kirim Pesan
          </button>
        </form>
      </main>
    </div>
  );
}
