import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./Context/UserContext";
import { store } from "./features/store.js";
import { Provider } from "react-redux";
import { ThemeProvider } from "./Context/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </UserProvider>
  </StrictMode>
);
