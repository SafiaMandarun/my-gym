import { useNavigate } from "react-router";

/**
 * Componente Navbar che rappresenta una barra di navigazione fissa nella parte inferiore dello schermo.
 *
 * @returns {JSX.Element} La barra di navigazione.
 *
 * Funzionalità:
 * - Se l'utente è loggato, il bottone "Mia Dashboard" reindirizza alla dashboard, altrimenti alla pagina di prenotazioni.
 * - Il bottone "Attrezzi" reindirizza alla homepage.
 * - Il bottone "Login" reindirizza alla pagina di login se l'utente non è loggato, altrimenti mostra "Logout" e reindirizza alla pagina di logout.
 *
 * @component
 */
const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  let logged = false;
  if (token) {
    logged = true;
  }

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-800 text-white h-16 grid grid-cols-3">
      <button
        onClick={() => {
          navigate("/");
        }}
        className="flex flex-col items-center justify-center hover:bg-gray-700 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-6 h-6">
          <path
            fill="#f0f5ff"
            d="M96 64c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32l0 160 0 64 0 160c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-64-32 0c-17.7 0-32-14.3-32-32l0-64c-17.7 0-32-14.3-32-32s14.3-32 32-32l0-64c0-17.7 14.3-32 32-32l32 0 0-64zm448 0l0 64 32 0c17.7 0 32 14.3 32 32l0 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 64c0 17.7-14.3 32-32 32l-32 0 0 64c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-160 0-64 0-160c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32zM416 224l0 64-192 0 0-64 192 0z"
          />
        </svg>
        <p className="text-xs">Home</p>
      </button>

      <button
        onClick={() => {
          navigate(logged ? "/dashboard" : "/bookings");
        }}
        className="flex flex-col items-center justify-center hover:bg-gray-700 transition-all "
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6">
          <path
            fill="#f0f5ff"
            d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l80 0 0 56-80 0 0-56zm0 104l80 0 0 64-80 0 0-64zm128 0l96 0 0 64-96 0 0-64zm144 0l80 0 0 64-80 0 0-64zm80-48l-80 0 0-56 80 0 0 56zm0 160l0 40c0 8.8-7.2 16-16 16l-64 0 0-56 80 0zm-128 0l0 56-96 0 0-56 96 0zm-144 0l0 56-64 0c-8.8 0-16-7.2-16-16l0-40 80 0zM272 248l-96 0 0-56 96 0 0 56z"
          />
        </svg>
        <p className="text-xs">{logged ? "Mia Dashboard" : "Prenotazioni"}</p>
      </button>

      <button
        onClick={() => {
          navigate(logged ? "/logout" : "/login");
        }}
        className="flex flex-col items-center justify-center hover:bg-gray-700 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
          <path fill="#f0f5ff" d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
        </svg>
        <p className="text-xs">{logged ? "Logout" : "Login"}</p>
      </button>
    </nav>
  );
};

export default Navbar;
