import { RegisterAndLoginRequest } from "../types/auth";

// funzione per effettuare il login
const loginUser = async (username: string, password: string) => {
  try {
    // inserisce nel corpo della richiesta le credenziali dell'utente
    const requestBody: RegisterAndLoginRequest = { username, password };

    // post con le credenziali dell'utente
    const response = await fetch("https://d3660g9kardf5b.cloudfront.net/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.message || "Errore durante il login");
    }

    // se il login è riuscito, recupera il token dalla risposta
    const { token } = await response.json();

    // salva il token nell'archivio locale
    localStorage.setItem("authToken", token);

    return { success: true, message: `Login effettuato con successo come ${username}` };
  } catch (error: any) {
    return { success: false, message: "Errore durante il login. Riprova." };
  }
};

// funzione per registrare un nuovo utente
const registrationUser = async (username: string, password: string) => {
  try {
    // inserisce nel corpo della richiesta le credenziali dell'utente
    const requestBody: RegisterAndLoginRequest = { username, password };

    // posto con le credenziali dell'utente
    const response = await fetch("https://d3660g9kardf5b.cloudfront.net/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.message || "Errore durante la registrazione, utente già registrato");
    }

    return { success: true, message: "Registrazione completata con successo!" };
  } catch (error: any) {
    return { success: false, message: error.message || "Errore. Riprova." };
  }
};

// oggetto che contiene le funzioni per login e registrazione
const fetchLoginLogout = {
  Login: loginUser, // funzione per il login
  Registration: registrationUser, // funzione per la registrazione
};

export default fetchLoginLogout;
