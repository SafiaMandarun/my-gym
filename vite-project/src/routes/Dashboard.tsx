import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { EquipmentBooking } from "../types/equipment";
import fetchEquipment from "../services/fetchEquipments";
import { Equipment } from "../types/equipment";
import useEquipmentApi from "../hooks/useEquipmentApi";

const Dashboard = () => {
  // recuper dell'elenco delle attrezzature tramite il custom hook
  const { equipment } = useEquipmentApi();

  // stato per le prenotazioni dell'utente
  const [bookings, setBookings] = useState<EquipmentBooking[]>([]);

  // stato per il caricamento dei dati
  const [loading, setLoading] = useState(true);

  // stato per gli errori
  const [error, setError] = useState<string | null>(null);

  // funzione per ottenere il nome dell'attrezzatura dato il suo ID
  const getEquipmentName = (bookingId: number) => {
    const equipmentData = equipment.find((eq: Equipment) => eq.id == bookingId);
    return equipmentData?.name || "Attrezzatura non trovata";
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // recupera le prenotazioni dell'utente loggato dall'API
      const { data, error } = await fetchEquipment.Dashboard();

      setBookings(data); // memorizza i dati delle prenotazioni
      setError(error); // memorizza gli errori
      setLoading(false); // setta il caricamento su false
    };

    fetchData();
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📌 Ultime mie Prenotazioni</h2>

        {/* messaggio di caricamento */}
        {loading && <p className="text-gray-500">Caricamento in corso...</p>}

        {/* messaggio d'errore */}
        {error && <p className="text-red-500">{error}</p>}

        {/* se non ci sono prenotazioni */}
        {!loading && !error && bookings.length === 0 && <p className="text-gray-500">Nessuna prenotazione trovata.</p>}

        {/* lista prenotazioni */}
        <div className="space-y-4">
          {sortedBookings.map((booking) => (
            <div key={booking.id} className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center">
              <div>
                {/* nome attrezzatura  */}
                <h3 className="text-lg font-semibold text-gray-900">{getEquipmentName(booking.equipment_id)}</h3>

                {/* orari  prenotazione */}
                <p className="text-gray-600">
                  🕒 {new Date(booking.start_date).toLocaleTimeString()} - {new Date(booking.end_date).toLocaleTimeString()}
                </p>

                {/*  prenotazione in minuti */}
                <p className="text-green-600 font-medium">⏳ {calculateMinutes(booking.start_date, booking.end_date)} min</p>
              </div>

              {/* id prenotazione */}
              <span className="text-xs bg-gray-300 px-3 py-1 rounded-full text-gray-700">ID: {booking.id}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
