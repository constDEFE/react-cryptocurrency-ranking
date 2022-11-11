import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Coin, Style } from "../../models/models";
import SavedCoin from "./SavedCoin";
import { Link } from "react-router-dom";
import { db } from "../../firebase";

export type SavedCoinType = {
  id: string;
  name: string;
  image: string;
  rank: number;
  symbol: string;
};

const styles: Style = {
  noCoinsLink: "text-accent",
  table: "w-full border-collapse text-center",
  headRow: "border-b",
  headRank: "px-4",
  headCell: "text-left",
};

const SavedCoins = () => {
  const [coins, setCoins] = useState<Coin[] | null>(null);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        setCoins(doc.data()?.watchList);
      });
    }
  }, [user]);

  return (
    <div>
      {coins ? (
        <table className={styles.table}>
          <thead>
            <tr className={styles.headRow}>
              <th className={styles.headRank}>Rank #</th>
              <th className={styles.headCell}>Coin</th>
              <th className={styles.headCell}>Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => <SavedCoin coin={coin} coins={coins} key={coin.id} />)}
          </tbody>
        </table>
      ) : (
        <p>
          You don't have any coins saved. Please save a coin to add it to watch
          list.
          <Link className={styles.noCoinsLink} to={"/"}>
            {" "}
            Click here to search coins.
          </Link>
        </p>
      )}
    </div>
  );
};

export default SavedCoins;
