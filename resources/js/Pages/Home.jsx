import React from 'react';
import { Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import PopupBanner from '@/Components/PopupBanner';


export default function Home({ products = [] }) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <PopupBanner />

      <main className="pt-0">
        <section
          className="relative h-[90vh] w-full flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>

          {/* konten hero */}
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide leading-tight text-white">
              Sigiarto <span className="text-yellow-400">Mart</span>
            </h1>
            <p className="mt-4 text-base md:text-xl text-gray-300 max-w-xl mx-auto">
              Solusi lengkap kebutuhan sembako dan frozen food Anda.
            </p>
            <Link
              href="/barang"
              className="mt-8 inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full text-base md:text-lg font-medium transition"
            >
              Lihat Produk
            </Link>
          </div>
        </section>

        <section className="py-16 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center text-white">Kategori Produk</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <KategoriCard title="Sembako" img="/images/sembako.jpg" />
            <KategoriCard title="Snack" img="/images/snack.jpg" />
            <KategoriCard title="Frozen Food" img="/images/frozen.jpg" />
          </div>
        </section>

        <section className="py-16 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center text-white">Produk Terbaru</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-400">
                Belum ada produk tersedia.
              </p>
            )}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/barang"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </section>

        
        {/*  about opsional hapus yo gpp */}
        <section className="bg-gray-800 py-16 px-4 rounded-lg max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-6 text-white">Tentang Kami</h2>
            <p className="text-gray-300 text-lg">
              Kami menyediakan berbagai produk sembako, snack, dan frozen food berkualitas dengan
              harga terjangkau. Belanja praktis dan cepat!
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-yellow-700 text-center p-6 mt-10 text-yellow-100">
  <p className="text-sm">
    &copy; {new Date().getFullYear()} Toko Sembako & Frozen Food.
    <a
      href="/admin/hash"
      className="hover:opacity-60 transition-opacity"
      title="Keranjang Rahasia"
    >
      🛒
    </a>
    All rights reserved.
  </p>
</footer>

    </div>
  );
}

function KategoriCard({ title, img }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-md hover:shadow-yellow-500/40 transition overflow-hidden">
      <img src={img} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow hover:shadow-yellow-500/60 transition overflow-hidden">
      <img
        src={product.gambar ? `/storage/${product.gambar}` : '/images/no-image.png'}
        alt={product.nama}
        onError={(e) => (e.target.src = '/images/no-image.png')}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate text-white">{product.nama}</h3>
        <p className="text-sm text-gray-400 capitalize">{product.kategori}</p>
        <p className="text-yellow-400 font-bold mt-2">Rp {product.harga.toLocaleString()}</p>
        <Link
          href={`/barang/${product.id}`}
          className="block mt-4 bg-yellow-500 text-white text-center py-2 rounded hover:bg-yellow-600 transition"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
