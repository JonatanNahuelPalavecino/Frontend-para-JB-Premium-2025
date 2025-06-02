import { ContextProvider } from "./componentes/Context/ContextProvider";
import { NavBar } from "./componentes/NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";
import { Cargando } from "./componentes/Cargando/Cargando";
import {Layout} from "./componentes/Layout/Layout";
import {WhatsappComponent} from "./componentes/WhatsappComponent/WhatsappComponent"
import "./App.scss";
import { Footer } from "./componentes/Footer/Footer";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <ContextProvider>

        <BrowserRouter>
          <NavBar />
          <Layout/>
          <Footer/>
        </BrowserRouter>
        <WhatsappComponent/>
        <Cargando />
        <Toaster position="bottom-left" richColors/>
      </ContextProvider>
    </>
  );
}

export default App;
