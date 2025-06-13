import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { auth } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
      setShow(false);
      setIsOpen(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 bg-transparent ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* logo kosong */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 text-white font-bold tracking-wide">
          <img src="/images/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
          <span className="text-xl">TOKO SEMBAKO</span>
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className="hidden md:flex space-x-6 text-white font-medium uppercase text-sm">
          <NavLinks auth={auth} />
        </nav>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-80 text-white px-6 py-4 space-y-4 absolute w-full top-full left-0 z-40">
          <NavLinks auth={auth} isMobile />
        </div>
      )}
    </header>
  );
}

function NavLinks({ auth, isMobile = false }) {
  const linkClass = `block ${isMobile ? 'py-2' : 'hover:text-yellow-400 transition'} uppercase`;
  return (
    <>
      <Link href="/" className={linkClass}>Beranda</Link>
      <Link href="/barang" className={linkClass}>Produk</Link>
      <Link href="/about" className={linkClass}>Tentang</Link>
      <Link href="/kontak" className={linkClass}>Kontak</Link>
      <Link href="/cart" className={linkClass}>keranjang</Link>
      {auth.user ? (
        <>
          <Link href="/dashboard" className={linkClass}>Dashboard</Link>
          <Link method="post" href="/logout" as="button" className={`${linkClass} text-red-400`}>Logout</Link>
        </>
      ) : (
        <Link href="/login" className={linkClass}>Login</Link>
      )}
    </>
  );
}
