import { EquipmentBookingRequest } from "../types/equipment";

// funzione per ottenere tutte le prenotazioni dell'attrezzatura
const fetchEquipmentBookings = async () => {
  try {
    const response = await fetch("https://d3660g9kardf5b.cloudfront.net/api/equipment-bookings");

    // errore
    if (!response.ok) throw new Error("Errore nel recupero delle prenotazioni");

    // converte la risposta in JSON
    const data = await response.json();
    return { data, error: null }; // Restituisce i dati se va a buon fine
  } catch (error) {
    // logga l'errore e restituisce un errore personalizzato
    console.error(error);
    return { data: [], error: "Impossibile caricare le prenotazioni" };
  }
};

// funzione per recuperare le prenotazioni per la dashboard dell'utente loggato
const fetchDashboardBookings = async () => {
  try {
    // ottiene il token di autenticazione dall'archivio locale
    const token = localStorage.getItem("authToken");

    // se il token non c'è, restituisce un errore
    if (!token) {
      return { data: [], error: "Utente non loggato" };
    }

    // get con token nella header
    const response = await fetch("https://d3660g9kardf5b.cloudfront.net/api/equipment-bookings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //token
      },
    });

    if (!response.ok) throw new Error("Errore nel recupero delle prenotazioni");

    // converte la risposta in JSON
    const data = await response.json();
    return { data, error: null }; // restituisce i dati se va a buon fine
  } catch (error) {
    console.error(error);
    return { data: [], error: "Impossibile caricare le prenotazioni" };
  }
};

// funzione per prenotare l'attrezzatura, passando l'ID dell'attrezzatura, la durata e il token
const bookEquipmentPost = async (equipmentId: number, selectedMinutes: number, token: string | null) => {
  try {
    // mette in duration i minuti selezionati
    const bookingRequest: EquipmentBookingRequest = { duration: selectedMinutes };

    // post con token nella header
    const response = await fetch(`https://d3660g9kardf5b.cloudfront.net/api/equipment/${equipmentId}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "", // token
      },
      body: JSON.stringify(bookingRequest), // invio dati di prenotazione
    });

    if (!response.ok) throw new Error("Errore nella prenotazione");

    return { success: true, message: `Prenotazione confermata per ${selectedMinutes} minuti!` };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Errore durante la prenotazione. Riprova." };
  }
};

//
const fetchEquipment = {
  Bookings: fetchEquipmentBookings, // funzione per ottenere le prenotazioni anonime
  Dashboard: fetchDashboardBookings, // funzione per ottenere le prenotazioni della dashboard (utende loggato)
  Detail: bookEquipmentPost, // funzione per prenotare l'attrezzatura
};

export default fetchEquipment;
