import React, { useEffect, useRef } from 'react';

export default function Hash() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 1.0;
      audio.play().catch(err => {
        console.warn('Autoplay diblokir oleh browser:', err);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-4">
        <h1 className="text-xl font-bold text-red-700">Anda jawir dilarang masuk</h1>

        <img
          src="/images/popup.jpg"
          alt="Gambar Rahasia"
          className="rounded-lg shadow-lg mx-auto"
        />

        <p className="text-gray-800 font-medium">
          Lu olang bukan china jadi balik
        </p>

        <audio ref={audioRef} autoPlay loop hidden>
          <source src="/images/yopon.mp3" type="audio/mp3" />
          Browser kamu tidak mendukung audio.
        </audio>
      </div>
    </div>
  );
}
