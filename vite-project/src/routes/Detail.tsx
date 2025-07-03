import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import { Equipment } from "../types/equipment";
import useEquipmentApi from "../hooks/useEquipmentApi";
import fetchEquipment from "../services/fetchEquipments";

const Detail = () => {
  // recupero dell'elenco delle attrezzature tramite custom hook
  const { equipment } = useEquipmentApi();

  // ottiene l'ID dell'attrezzatura dai parametri dell'URL
  const { id } = useParams<{ id: string }>();

  // hook per la navigazione tra le pagine
  const navigate = useNavigate();

  // ottiene i dettagli dell'attrezzatura corrispondente all'ID passato nell'URL
  const equipmentData = equipment.find((eq: Equipment) => eq.id === Number(id));

  // stato per i minuti selezionati per il noleggio
  const [selectedMinutes, setSelectedMinutes] = useState(5);

  // stato per il caricamento della prenotazione
  const [loading, setLoading] = useState(false);

  // recupera il token di autenticazione dall'archivio locale
  const token = localStorage.getItem("authToken");

  // verifica se l'utente è loggato
  let logged = false;
  if (token) {
    logged = true;
  }

  // se l'attrezzatura non viene trovata, mostra un messaggio di errore
  if (!equipmentData) return <p>Attrezzatura non trovata</p>;

  // calcolo del prezzo totale in base ai minuti selezionati
  const totalPrice = equipmentData.pricePerMinute * selectedMinutes;

  // funzione per gestire la prenotazione
  const handleBooking = async () => {
    setLoading(true);

    // fa la prenotazione chiamando l'API e tramite la post
    const { success, message } = await fetchEquipment.Detail(equipmentData.id, selectedMinutes, token);

    // messaggio di conferma o errore
    alert(message);

    // se la prenotazione è andata a buon fine, reindirizza l'utente
    if (success) navigate(logged ? "/dashboard" : "/bookings"); // se l'utente è loggato va a dashboard, altrimenti a bookings

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-lg mx-auto mt-8 p-6 mb-16 relative">
        {/* bttone per tornare alla pagina principale */}
        <button onClick={() => navigate("/")} className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition-all">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>

        {/* info attrezzatura */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img src={equipmentData.image} alt={equipmentData.name} className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 shadow-md" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{equipmentData.name}</h2>
              <p className="text-sm text-gray-500">{equipmentData.claim}</p>
            </div>
          </div>
        </header>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600 font-medium">Motto:</span>
            <span className="text-gray-800">{equipmentData.claim}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600 font-medium">💰 Prezzo al minuto:</span>
            <span className="text-indigo-500 font-semibold">{equipmentData.pricePerMinute}£</span>
          </div>

          {/* selezione del tempo di noleggio */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-600 font-medium">⏳ Tempo selezionato:</span>
            <div className="flex items-center space-x-4">
              {/* bottone per diminuire i minuti (minimo 5) */}
              <button onClick={() => setSelectedMinutes((prev) => Math.max(5, prev - 5))} className="bg-gray-300 px-3 py-1 rounded-md text-gray-800 hover:bg-gray-400 transition-all">
                -
              </button>
              <span className="text-lg font-semibold">{selectedMinutes} min</span>
              {/* bottone per aumentare i minuti (massimo 20) */}
              <button onClick={() => setSelectedMinutes((prev) => Math.min(20, prev + 5))} className="bg-gray-300 px-3 py-1 rounded-md text-gray-800 hover:bg-gray-400 transition-all">
                +
              </button>
            </div>
          </div>

          {/* prezzo totale calcolato */}
          <div className="flex justify-between border-b pb-2 mt-2">
            <span className="text-gray-600 font-medium">💵 Prezzo totale:</span>
            <span className="text-indigo-700 font-semibold">{totalPrice}£</span>
          </div>
        </div>

        {/* bottone per noleggiare */}
        <button onClick={handleBooking} disabled={loading} className={`mt-6 w-full py-3 px-6 rounded-lg transition-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-700 hover:bg-indigo-900 text-white"}`}>
          {loading ? "Prenotazione in corso..." : "Noleggia"}
        </button>
      </div>
    </>
  );
};

export default Detail;
