import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";
import { Provider } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "./utils/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

function App() {
  const registerAdmin = async () => {
    try {
      const adminCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        "admin@gmail.com",
        "admin@123"
      );

      // const adminRef = doc(FIREBASE_FIRESTORE, `account/${adminCredential.user.email}`);
      // await setDoc(adminRef, {
      //   id: adminCredential.user.uid,
      //   fullName: adminCredential.user.displayName,
      //   email: adminCredential.user.email,
      //   status: 
      // });
    }
    catch {

    }
  }
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PersistGate>
  );
}

export default App;