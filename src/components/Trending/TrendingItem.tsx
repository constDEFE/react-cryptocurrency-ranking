import { Style, TrendingCoin } from "../../models/models";
import { Link } from "react-router-dom";
import React from "react";

interface TrendingItemProps {
  coin: TrendingCoin;
}

const styles: Style = {
  container: "rounded-div flex justify-between p-4 hover:scale-[1.025] transition-md",
  link: "w-full",
  content: "flex w-full items-center px-2 justify-between",
  info: "flex gap-4",
  image: "rounded-full",
  name: "font-bold",
  priceContainer: "flex items-center",
  btcImage: "mr-2",
};

const TrendingItem = ({ coin }: TrendingItemProps) => {
  return (
    <div className={styles.container}>
      <Link className={styles.link} to={`/coin/${coin.item.id}`}>
        <div className={styles.content}>
          <div className={styles.info}>
            <img
              className={styles.image}
              src={coin.item.small}
              alt={coin.item.name}
            />
            <div>
              <p className={styles.name}>{coin.item.name}</p>
              <p>{coin.item.symbol}</p>
            </div>
          </div>
          <div className={styles.priceContainer}>
            <img
              className={styles.btcImage}
              width={16}
              height={16}
              src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579"
              alt="btc"
            />
            <p>{coin.item.price_btc.toFixed(7)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TrendingItem;
