import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import fetchLoginLogout from "../services/fetchLoginLogout";

const Registration = () => {
  // stato per username, password, errori e stato di caricamento
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // funzione per la registrazione
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // impedisce il comportamento predefinito del form
    setError(null);

    // verifica che siano stati inseriti username e password
    if (!username || !password) {
      setError("Username e password sono obbligatori.");
      return;
    }

    setLoading(true);
    // chiamata API per la registrazione
    const { success, message } = await fetchLoginLogout.Registration(username, password);

    // gestione risposta
    if (success) {
      alert(message); //  andato a buon fine
      navigate("/login"); // manda al login
    } else {
      setError(message); // errore
    }

    setLoading(false);
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white mt-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Registrazione</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Aggiorna lo stato di username
              className="mt-1 p-2 w-full border rounded-md shadow-sm"
              placeholder="Inserisci username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Aggiorna lo stato di password
              className="mt-1 p-2 w-full border rounded-md shadow-sm"
              placeholder="Inserisci password"
              required
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Se hai già un account,{" "}
            <a
              onClick={() => navigate("/login")} // Naviga alla pagina di login
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              accedi
            </a>
            .
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading} // disabilita bottone mentre loading è true
            className={`mt-4 w-full py-2 px-4 rounded-md text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {loading ? "Registrazione in corso..." : "Registrati"}
          </button>
        </form>
      </div>
      <Navbar />
    </>
  );
};

export default Registration;
