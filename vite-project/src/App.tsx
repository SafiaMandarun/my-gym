import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./routes/Home"; // OPPURE const Home= lazy (()=>import ('./routes/Home))
import Detail from "./routes/Detail"; //OPPURE const Detail= lazy (()=>import ('./routes/Detail))
import "./App.css";
import Booking from "./routes/Bookings";
import Registration from "./routes/Registration";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import Logout from "./routes/Logout";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/detail/:id"} element={<Detail />} />
        <Route path={"/bookings"} element={<Booking />} />
        <Route path={"/registration"} element={<Registration />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/logout"} element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
