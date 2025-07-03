import { useNavigate } from "react-router"; // Importa la funzione useNavigate per la navigazione tra le pagine

const Hero = () => {
  const token = localStorage.getItem("authToken");
  let logged = false;
  if (token) {
    logged = true;
  }
  const navigate = useNavigate(); // Inizializza la funzione navigate per la gestione della navigazione

  return (
    <div className="relative flex items-center justify-center h-screen text-center text-white">
      {/* Immagine di sfondo */}
      <img className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=1900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="bilanciere" />

      {/* Overlay scuro per migliorare la leggibilità del testo */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Contenuto del Hero */}
      <div className="relative z-10 max-w-2xl px-6">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">Level Up Gym</h1>

        {/* Descrizione dell'abbonamento */}
        <p className="text-lg mt-6 text-gray-200">
          Abbonamento mensile a <span className="font-semibold">50£</span> al mese
        </p>
        <p className="text-lg mt-4 text-gray-300">
          Per allenamenti occasionali: <br />
          Costo d'entrata fisso <span className="font-semibold">2£</span> + utilizzo attrezzi da <span className="font-semibold">0,10£</span> al minuto
        </p>

        {/* Pulsante di Call-To-Action per la registrazione */}
        <button
          onClick={() => {
            navigate("/registration"); // Reindirizza alla pagina di registrazione
          }}
          className={logged ? "hidden" : "mt-8 px-6 py-3 bg-indigo-700 hover:bg-indigo-900 text-white font-semibold text-lg rounded-lg shadow-lg transition"}
        >
          Registrati Ora
        </button>

        {/* Freccia animata per indicare lo scroll verso il basso */}
        <div className="mt-12 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-8 h-8 mx-auto text-gray-300">
            <path fill="currentColor" d="M169.4 470.6l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 402.7l137.4-137.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
