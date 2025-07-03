//equipmen api per recuperare i dati
//qui recupero i dati api equipment e li rendo json
import { EQUIPMENT_API_BASE_URL } from "../constants";
const equipmentApi = async () => {
  const res = await fetch(`${EQUIPMENT_API_BASE_URL}`);
  const data = await res.json();
  return data;
};

export default equipmentApi;
