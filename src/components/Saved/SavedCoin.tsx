import { doc, updateDoc } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Coin, Style } from "../../models/models";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import React from "react";

interface SavedCoinProps {
  coin: Coin;
  coins: Coin[];
}

const styles: Style = {
  row: "h-[60px] overflow-hidden",
  content: "flex items-center",
  image: "mr-4",
  name: "hidden md:table-cell",
  symbol: "text-gray-500 text-left text-sm",
  removeContainer: "pl-5",
  removeButton: "cursor-pointer transition-sm hover:scale-[1.15]",
};

const SavedCoin = ({ coin, coins }: SavedCoinProps) => {
  const user = useAppSelector((state) => state.user.user);
  const coinPath = doc(db, "users", `${user?.email}`);

  const deleteCoin = async (passedId: string): Promise<void> => {
    try {
      const result = coins.filter((item) => item.id !== passedId);
      await updateDoc(coinPath, {
        watchList: result,
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <tr className={styles.row}>
      <td>{coin.market_cap_rank}</td>
      <td>
        <Link to={`/coin/${coin.id}`}>
          <div className={styles.content}>
            <img
              className={styles.image}
              width={32}
              height={32}
              src={coin.image}
              alt={coin.name}
            />
            <div>
              <p className={styles.name}>{coin.name}</p>
              <p className={styles.symbol}>{coin.symbol.toUpperCase()}</p>
            </div>
          </div>
        </Link>
      </td>
      <td className={styles.removeContainer}>
        <AiOutlineClose
          onClick={() => deleteCoin(coin.id)}
          className={styles.removeButton}
          size={25}
        />
      </td>
    </tr>
  );
};

export default SavedCoin;
