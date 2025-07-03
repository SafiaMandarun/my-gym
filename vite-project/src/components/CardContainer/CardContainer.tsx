import { PropsWithChildren } from "react";
import { Equipment } from "../../types/equipment";

//  contenitore delle card dell'attrezzatura
const EquipmentCardContainer = ({ children, loading }: PropsWithChildren<{ loading: boolean }>) => {
  return <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mb-16 ${loading ? "opacity-50" : "opacity-100"}`}>{children}</div>;
};

//  che rappresenta un singolo elemento della card dell'attrezzatura
const EquipmentCardElement = ({ image, name, claim, pricePerMinute, onClick }: Equipment) => {
  return (
    <div tabIndex={0} className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all mb-4">
      {/* immagine attrezzatura */}
      <img src={image} alt={name} className="w-full h-40 object-cover" />

      <div className="p-4 flex flex-col">
        {/* nome attrezzo */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        </div>

        {/* motto */}
        <p className="text-sm text-gray-600 mt-2">{claim}</p>

        {/* prezzo al minuto */}
        <div className="mt-2">
          <p className="text-sm font-semibold text-gray-800">Prezzo: {pricePerMinute}£/min</p>
        </div>

        {/* bottone per i dettagli */}
        <button
          onClick={() => {
            onClick(); // esegue la funzione passata come prop
          }}
          className="mt-4 bg-indigo-700 hover:bg-indigo-900 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          Dettagli
        </button>
      </div>
    </div>
  );
};

// oggetto che contiene i componenti per renderizzare il contenitore e le card stesse
const EquipmentCard = {
  Container: EquipmentCardContainer,
  Element: EquipmentCardElement,
};

export default EquipmentCard; // Export
