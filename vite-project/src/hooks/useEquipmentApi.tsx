import { useEffect, useState } from "react";
import equipmentApi from "../services/api";
import { EquipmentResult } from "../types/equipment";

// hook custom per recuperare i dati dell'attrezzatura
const useEquipmentApi = () => {
  // stato per i dati dell'attrezzatura
  const [equipment, setEquipment] = useState<EquipmentResult>([]);

  // stato per i dati in fase di caricamento
  const [loading, setLoading] = useState(false);

  // stato per gli errori
  const [error, setError] = useState<string | null>(null);

  // effetto eseguito al primo render per recuperare i dati
  useEffect(() => {
    setLoading(true); // imposta lo stato di caricamento su true
    setError(null); // resetta eventuali errori precedenti

    // chiamata all'API per ottenere i dati dell'attrezzatura
    equipmentApi()
      .then((data: EquipmentResult) => {
        setEquipment(data); // salva i dati recuperati nello stato
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to fetch equipment data"); // setta il messaggio di errore
      })
      .finally(() => {
        setLoading(false); // setta lo stato di caricamento su false
      });
  }, []);

  // restituisce lo stato e i dati in modo che possano essere utilizzati nei componenti
  return {
    equipment,
    loading,
    error,
  };
};

export default useEquipmentApi;
