import { useAppSelector } from "../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/functions";
import SavedCoins from "../components/Saved/SavedCoins";
import { Style } from "../models/models";
import React from "react";

const styles: Style = {
  container: "mt-24 max-w-[1140px] mx-auto",
  content: "flex justify-between items-center py-8 rounded-div",
  title: "text-2xl font-bold",
  button: "border px-6 py-2 rounded-2xl shadow-lg hover:shadow-2xl",
  coinsContainer: "flex justify-between items-center my-12 py-8 rounded-div",
  coinsWrapper: "w-full min-h-[300px]",
  coinsTitle: "text-2xl font-bold",
};

const Account = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleSignOut = async (): Promise<void> => {
    try {
      await logout();
      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>Accout</h1>
          <div>
            <p>Welcome, {user?.email}</p>
          </div>
        </div>
        <div>
          <button onClick={handleSignOut} className={styles.button}>
            Sign Out
          </button>
        </div>
      </div>
      <div className={styles.coinsContainer}>
        <div className={styles.coinsWrapper}>
          <h1 className={styles.coinsTitle}>Watch List</h1>
          <SavedCoins />
        </div>
      </div>
    </div>
  );
};

export default Account;
