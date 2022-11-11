import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { checkTheme } from "./utils/functions";
import { setUser } from "./redux/slices/userSlice";
import { Style } from "./models/models";
import CoinPage from "./pages/CoinPage";
import { auth } from "./firebase";
import Account from "./pages/Account";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const styles: Style = {
  footer: "rounded-div mt-8 pt-8 text-primary",
};

const App = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    checkTheme(theme);
  }, [theme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUser(currentUser));
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
          <Route path="/coin/:coinId" element={<CoinPage />}>
            <Route path=":coinId" />
          </Route>
        </Routes>
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </>
  );
};

export default App;
