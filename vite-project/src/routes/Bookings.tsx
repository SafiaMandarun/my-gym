import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { EquipmentBooking } from "../types/equipment";
import fetchEquipment from "../services/fetchEquipments";
import useEquipmentApi from "../hooks/useEquipmentApi";
import { Equipment } from "../types/equipment";
const Bookings = () => {
  // recupera l'elenco delle attrezzature tramite il custom hook
  const { equipment } = useEquipmentApi();

  // stato per elenco delle prenotazioni
  const [bookings, setBookings] = useState<EquipmentBooking[]>([]);

  // stato per il caricamento dei dati
  const [loading, setLoading] = useState(true);

  // stato per possibili errori
  const [error, setError] = useState<string | null>(null);

  // funzione per ottenere il nome dell'attrezzatura dato il suo ID
  const getEquipmentName = (bookingId: number) => {
    const equipmentData = equipment.find((eq: Equipment) => eq.id == bookingId);
    return equipmentData?.name || "Attrezzatura non trovata";
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // setta il caricamento su true

      // recupera le prenotazioni dall'API
      const { data, error } = await fetchEquipment.Bookings();

      // aggiorna mettendo le prenotazioni ottenute nello stato
      setBookings(data);

      // Se non è andat a buon fine, setta l'errore nello stato
      setError(error);

      setLoading(false); // setta il caricamento su false
    };

    fetchData(); // ivocazione funzione per recupero dati
  }, []);

  // funzione per calcolare la durata della prenotazione in minuti
  const calculateMinutes = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.round((endDate.getTime() - startDate.getTime()) / 60000);
  };

  // ordinamento prenotazioni in ordine inverso
  const sortedBookings = bookings.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📌 Ultime Prenotazioni</h2>

        {loading && <p className="text-gray-500">Caricamento in corso...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && bookings.length === 0 && <p className="text-gray-500">Nessuna prenotazione trovata.</p>}

        <div className="space-y-4">
          {/* mappa e visualizza le prenotazioni */}
          {sortedBookings.map((booking) => (
            <div key={booking.id} className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center">
              <div>
                {/* mostra il nome dell'attrezzatura tramite la funzione per ottenere il nome basandosi sull'id dello strum */}
                <h3 className="text-lg font-semibold text-gray-900">{getEquipmentName(booking.equipment_id)}</h3>

                {/*orario di inizio e fine della prenotazione */}
                <p className="text-gray-600">
                  🕒 {new Date(booking.start_date).toLocaleTimeString()} - {new Date(booking.end_date).toLocaleTimeString()}
                </p>

                {/*durata della prenotazione in minuti */}
                <p className="text-green-600 font-medium">⏳ {calculateMinutes(booking.start_date, booking.end_date)} min</p>
              </div>

              {/*ID della prenotazione */}
              <span className="text-xs bg-gray-300 px-3 py-1 rounded-full text-gray-700">ID: {booking.id}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Bookings;
