import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PersistGate>
  );
}

export default App;