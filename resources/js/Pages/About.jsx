import React from 'react';
import Header from '@/Components/Header';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header />

      <main className="py-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-yellow-400 text-center">Tentang Kami</h1>

        <section className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <p className="text-gray-300 text-lg leading-relaxed">
            Kami adalah penyedia sembako, snack, dan frozen food berkualitas dengan harga terjangkau.
            Berkomitmen memberikan layanan terbaik agar pelanggan puas dan nyaman berbelanja.
          </p>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            Tim kami berdedikasi untuk menjaga kualitas produk dan selalu menghadirkan inovasi dalam
            pelayanan agar kebutuhan sehari-hari Anda terpenuhi dengan mudah dan cepat.
          </p>
        </section>
      </main>
    </div>
  );
}
