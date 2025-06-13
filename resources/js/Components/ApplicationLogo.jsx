export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/images/logo.png"
            alt="Logo"
            className="h-10 w-auto" // contoh ukuran, bisa disesuaikan
        />
    );
}
