import { useEffect, useState } from "react";
import equipmentDetailApi from "../services/detail.api";
import { Equipment } from "../types/equipment";

// funzione per mappare i dati ricevuti dall'API
const mapEquipmentDetailToClient = (equipmentDetailApiRes: Equipment): Equipment => {
  return {
    id: equipmentDetailApiRes.id,
    name: equipmentDetailApiRes.name,
    claim: equipmentDetailApiRes.claim,
    icon: equipmentDetailApiRes.icon,
    image: equipmentDetailApiRes.image,
    pricePerMinute: equipmentDetailApiRes.pricePerMinute,
    onClick: equipmentDetailApiRes.onClick,
  };
};

// hook personalizzato per recuperare i dettagli di un'attrezzatura specifica
const useEquipmentDetailApi = (id: number) => {
  // stato per i dettagli dell'attrezzatura
  const [equipmentDetail, setEquipmentDetail] = useState<Equipment>();

  // stato per il caricamento dei dati
  const [loading, setLoading] = useState(false);

  //sStato per gli errori
  const [error, setError] = useState<string | null>(null);

  // effetto eseguito quando cambia l'ID dell'attrezzatura
  useEffect(() => {
    setLoading(true);
    setError(null); // resetta errori precedenti

    // get per ottenere i dettagli dell'attrezzatura
    equipmentDetailApi(id)
      .then((data: Equipment) => {
        const equipmentForClient = mapEquipmentDetailToClient(data); // converte i dati nel formato richiesto dal client
        setEquipmentDetail(equipmentForClient); // salva i dati nello stato
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to fetch equipment detail data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // restituisce lo stato e i dati per l'utilizzo nei componenti
  return {
    equipmentDetail,
    loading,
    error,
  };
};

export default useEquipmentDetailApi;
