import Hero from "../components/Hero/Hero";
import { useNavigate } from "react-router";
import useEquipmentApi from "../hooks/useEquipmentApi";
import Navbar from "../components/Navbar/Navbar";
import CardContainer from "../components/CardContainer/CardContainer";

const Home = () => {
  // custom hook useEquipmentApi per ottenere i dati delle attrezzature e lo stato di caricamento
  const { equipment, loading } = useEquipmentApi();

  // hook useNavigate per la navigazione tra le pagine
  const navigate = useNavigate();

  return (
    <>
      <Hero /> {/* rendering del componente Hero per la parte superiore della pagina */}
      <h2 className="text-3xl font-semibold text-center mt-12">Scopri le nostre attrezzature</h2> {/* titolo */}
      {/* card container */}
      <CardContainer.Container loading={loading}>
        {/* mappa su tutte le attrezzature e crea un elemento Card per ciascuna */}
        {equipment.map((eq, index) => {
          return (
            <CardContainer.Element
              key={index} // usa l'indice come chiave per ogni elemento
              // passa le proprietà dell'attrezzo come props alla card
              image={eq.image}
              name={eq.name}
              claim={eq.claim}
              id={eq.id}
              icon={eq.icon}
              pricePerMinute={eq.pricePerMinute}
              onClick={() => {
                //  porta alla pagina dei dettagli dell'attrezzo
                navigate(`/detail/${eq.id}`);
              }}
            />
          );
        })}
      </CardContainer.Container>
      <Navbar />
    </>
  );
};

export default Home;
