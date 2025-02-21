import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import store, { persistor } from "./redux/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { UserProvider } from "./context/UserContext.tsx";

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
