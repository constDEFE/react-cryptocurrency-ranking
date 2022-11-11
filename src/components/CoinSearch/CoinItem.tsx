import { getDoc, doc, arrayUnion, updateDoc} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Sparklines, SparklinesLine } from 'react-sparklines-typescript';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Coin, Style } from "../../models/models";
import { Link } from "react-router-dom";
import { db } from "../../firebase";

interface CoinItemProps {
  coin: Coin;
}

const styles: Style = {
  row: "h-20 border-b last:border-none overflow-hidden bg-primary",
  goldenStar: "cursor-pointer text-yellow-500",
  hollowStar: "cursor-pointer",
  imageContainer: "flex items-center",
  image: "mr-2 rounded-full",
  coinName: "hidden sm:table-cell",
  green: "text-green-600 pointer-events-none",
  red: "text-red-600 pointer-events-none",
  cell: "w-[180px] hidden md:table-cell pointer-events-none",
  eventless: "pointer-events-none"
};

const CoinItem = ({ coin }: CoinItemProps) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user.user);
  const coinPath = doc(db, "users", `${user?.email}`);

  const saveCoin = async (): Promise<void> => {
    if (user) {
      setIsSaved(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion(coin),
      });
    } else {
      alert("Please sign in to add this coin to your watchlist.");
    }
  };

  useEffect(() => {
    const getSavedCoins = async (): Promise<void> => {
      const snap = await getDoc(doc(db, "users", user?.email as string));
      const data = snap.data();

      if (data) {
        data.watchList.forEach((listCoin: Coin) => {
          if (listCoin.id === coin.id) setIsSaved(true);
        });
      }
    }
    
    getSavedCoins()
  }, [coin.id]);

  return (
    <tr className={styles.row}>
      <td onClick={saveCoin}>
        {isSaved ? (
          <AiFillStar className={styles.goldenStar} size={25} />
        ) : (
          <AiOutlineStar className={styles.hollowStar} size={25} />
        )}
      </td>
      <td className={styles.eventless}>{coin.market_cap_rank}</td>
      <td>
        <Link to={`/coin/${coin.id}`}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={coin.image}
              width={32}
              height={32}
              alt={coin.id}
            />
            <p className={styles.coinName}>{coin.name}</p>
          </div>
        </Link>
      </td>
      <td className={styles.eventless}>{coin.symbol.toUpperCase()}</td>
      <td className={styles.eventless}>${coin.current_price.toLocaleString()}</td>
      <td>
        {coin.price_change_percentage_24h > 0 ? (
          <p className={styles.green}>{`${coin.price_change_percentage_24h.toFixed(1)}%`}</p>
        ) : (
          <p className={styles.red}>{`${coin.price_change_percentage_24h.toFixed(1)}%`}</p>
        )}
      </td>
      <td className={styles.cell}>${coin.total_volume.toLocaleString()}</td>
      <td className={styles.cell}>${coin.market_cap.toLocaleString()}</td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
};

export default CoinItem;
