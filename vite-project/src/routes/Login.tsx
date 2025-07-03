import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import fetchLoginLogout from "../services/fetchLoginLogout";

const Login = () => {
  // stati per l'input dell'utente
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // stato per gli errori
  const [error, setError] = useState<string | null>(null);

  // stato per gestire il caricamento della richiesta di login
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // funzione per il login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // previene il comportamento di default del form
    setError(null);

    // controlla se i campi sono vuoti
    if (!username || !password) {
      setError("Username e password sono obbligatori.");
      return;
    }

    setLoading(true); // setta lo stato di caricamento

    // chiamata API per fare il login
    const { success, message } = await fetchLoginLogout.Login(username, password);

    if (success) {
      alert(message); // messaggio di conferma
      navigate("/dashboard"); // porta alla dashboard
    } else {
      setError("Errore durante il login. Riprova.");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white mt-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 p-2 w-full border rounded-md shadow-sm" placeholder="Inserisci username" required />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 w-full border rounded-md shadow-sm" placeholder="Inserisci password" required />
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Se non hai ancora un account,{" "}
            <a onClick={() => navigate("/registration")} className="text-indigo-600 hover:underline cursor-pointer">
              registrati
            </a>
            .
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* bottone login */}
          <button type="submit" disabled={loading} className={`mt-4 w-full py-2 px-4 rounded-md text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}>
            {loading ? "Login in corso..." : "Accedi"}
          </button>
        </form>
      </div>
      <Navbar />
    </>
  );
};

export default Login;
