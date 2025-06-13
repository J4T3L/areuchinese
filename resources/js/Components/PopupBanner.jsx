import { useEffect, useState, useRef } from 'react';

export default function PopupBanner() {
    const [showPopup, setShowPopup] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const alreadyShown = localStorage.getItem('popup_shown');
        if (!alreadyShown) {
            setShowPopup(true);
            localStorage.setItem('popup_shown', 'true');
        }
    }, []);

    useEffect(() => {
        if (showPopup && audioRef.current) {
            audioRef.current.play().catch((err) => {
                console.warn('Gagal autoplay audio:', err);
            });
        }
    }, [showPopup]);

    const closePopup = () => {
        setShowPopup(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    if (!showPopup) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-md w-full">
                <button
                    onClick={closePopup}
                    className="absolute top-2 right-2 text-black hover:text-gray-600 text-xl"
                >
                    &times;
                </button>

                <img
                    src="/images/popup.jpg"
                    alt="Ehehe"
                    className="w-full h-auto rounded mb-4"
                />

                <div className="text-center">
                    <h2 className="text-lg font-semibold text-green-700">Lu jawir ya!</h2>
                    <p className="text-sm text-gray-600">
                        Lu mau ngapain kontol. Lu bukan china
                    </p>
                </div>

                <audio ref={audioRef} src="/images/yopon.mp3" preload="auto" />
            </div>
        </div>
    );
}
