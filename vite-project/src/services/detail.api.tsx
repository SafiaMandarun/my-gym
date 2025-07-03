import { EQUIPMENT_API_BASE_URL } from "../constants";

const equipmentDetailApi = async (id?: number) => {
  if (!id) return undefined;
  const res = await fetch(`${EQUIPMENT_API_BASE_URL}/${id}`);
  const data = await res.json();
  return data;
};

export default equipmentDetailApi;
