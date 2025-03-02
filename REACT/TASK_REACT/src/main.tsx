import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store, { persistor } from "./redux/store/Store";
import { PersistGate } from "redux-persist/integration/react";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
        <UserProvider>
          <App />
        </UserProvider>
      </PersistGate>
    </Provider>
  // </StrictMode>
);
