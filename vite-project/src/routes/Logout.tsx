import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate(); // hook per navigare tra le pagine

  // useEffect si attiva quando il componente viene montato
  useEffect(() => {
    // rimozione del token di autenticazione dal localStorage
    localStorage.removeItem("authToken");

    // val al login dopo il logout
    navigate("/login");
  }, [navigate]); // dipendenza da 'navigate', il che significa che l'effetto si attiva solo una volta

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-semibold text-gray-700">Logout in corso...</h2>
    </div>
  );
};

export default Logout;
