import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
// import { LoginPage } from './components/pages/LoginPage';
import AppRoutes from "./routes/AppRoutes";
import "./translation/i18nConfig";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
