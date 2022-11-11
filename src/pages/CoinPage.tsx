import { Sparklines, SparklinesLine } from "react-sparklines-typescript";
import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchCoin } from '../redux/slices/coinsSlice';
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { Style } from '../models/models';
import { 
  FaFacebook, 
  FaTwitter, 
  FaReddit, 
  FaGithub 
} from "react-icons/fa";


const styles: Style = {
  container: "rounded-div my-24 py-4 px-4",
  header: "flex py-8",
  image: "mr-8 rounded-full",
  wallet: "text-3xl font-bold",
  infoContainer: "grid md:grid-cols-2 gap-8",
  leftHeader: "flex justify-between",
  price: "text-3xl font-bold",
  row: "flex justify-between py-4",
  subtitle: "text-gray-500 text-sm",
  rightTitle: "text-xl font-bold",
  green: "text-green-600",
  red: "text-red-600",
  linksContainer: "flex justify-around text-accent py-4",
  aboutContainer: "py-4",
  aboutTitle: "text-xl font-bold",
};

const CoinPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const coin = useAppSelector((state) => state.coins.currentCoin);

  useEffect(() => {
    if (params.coinId) dispatch(fetchCoin(params.coinId));
  }, []);

  return (
    <>
      <div className={styles.container}>
      <div className={styles.header}>
        <img
          className={styles.image}
          width={80}
          height={80}
          src={coin?.image.large}
          alt=""
        />
        <div>
          <p className={styles.wallet}>{coin?.name} Price</p>
          <p>{coin?.symbol.toUpperCase()} / USD</p>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div>
          <div className={styles.leftHeader}>
            {coin?.market_data.current_price && (
              <p className={styles.price}>
                ${coin.market_data.current_price.usd.toLocaleString()}
              </p>
            )}
            <p>7 Day</p>
          </div>
          <div>
            {coin && (
              <Sparklines data={coin.market_data.sparkline_7d.price}>
                <SparklinesLine color="teal" />
              </Sparklines>
            )}
          </div>
          <div className={styles.row}>
            <div>
              <p className={styles.subtitle}>Market Cap</p>
              {coin?.market_data.market_cap && (
                <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
              )}
            </div>
            <div>
              <p className={styles.subtitle}>Volume (24h)</p>
              {coin?.market_data.market_cap && (
                <p>${coin.market_data.total_volume.usd.toLocaleString()}</p>
              )}
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <p className={styles.subtitle}>24h High</p>
              {coin?.market_data.high_24h && (
                <p>${coin.market_data.high_24h.usd}</p>
              )}
            </div>
            <div>
              <p className={styles.subtitle}>24h Low</p>
              {coin?.market_data.high_24h && (
                <p>${coin.market_data.low_24h.usd}</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <p className={styles.rightTitle}>Market Stats</p>
          <div className={styles.row}>
            <div>
              <p className={styles.subtitle}>Market Rank</p>
              {coin?.market_cap_rank}
            </div>
            <div>
              <p className={styles.subtitle}>Hashing Algorithm</p>
              {coin?.hashing_algorithm && <p>{coin.hashing_algorithm}</p>}
            </div>
            <div>
              <p className={styles.subtitle}>Trust Score</p>
              {coin?.tickers && <p>{coin.liquidity_score.toFixed(2)}</p>}
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <p className={styles.subtitle}>Price Change (24h)</p>
              {coin?.market_data &&
                (coin.market_data.price_change_percentage_24h > 0 ? (
                  <p className={styles.green}>
                    {coin.market_data.price_change_percentage_24h.toFixed(1)}%
                  </p>
                ) : (
                  <p className={styles.red}>
                    {coin.market_data.price_change_percentage_24h.toFixed(1)}%
                  </p>
                ))}
            </div>
            <div>
              <p className={styles.subtitle}>Price Change (7d)</p>
              {coin?.market_data &&
                (coin.market_data.price_change_percentage_7d > 0 ? (
                  <p className={styles.green}>
                    {coin.market_data.price_change_percentage_7d.toFixed(1)}%
                  </p>
                ) : (
                  <p className={styles.red}>
                    {coin.market_data.price_change_percentage_7d.toFixed(1)}%
                  </p>
                ))}
            </div>
            <div>
              <p className={styles.subtitle}>Price Change (14d)</p>
              {coin?.market_data &&
                (coin.market_data.price_change_percentage_14d > 0 ? (
                  <p className={styles.green}>
                    {coin.market_data.price_change_percentage_14d.toFixed(1)}%
                  </p>
                ) : (
                  <p className={styles.red}>
                    {coin.market_data.price_change_percentage_14d.toFixed(1)}%
                  </p>
                ))}
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <p className={styles.subtitle}>Price Change (30d)</p>
              {coin?.market_data &&
                (coin.market_data.price_change_percentage_30d > 0 ? (
                  <p className={styles.green}>
                    {coin.market_data.price_change_percentage_30d.toFixed(1)}%
                  </p>
                ) : (
                  <p className={styles.red}>
                    {coin.market_data.price_change_percentage_30d.toFixed(1)}%
                  </p>
                ))}
            </div>
            <div>
              <p className={styles.subtitle}>Price Change (60d)</p>
              {coin?.market_data &&
                (coin.market_data.price_change_percentage_60d > 0 ? (
                  <p className={styles.green}>
                    {coin.market_data.price_change_percentage_60d.toFixed(1)}%
                  </p>
                ) : (
                  <p className={styles.red}>
                    {coin.market_data.price_change_percentage_60d.toFixed(1)}%
                  </p>
                ))}
            </div>
            <div>
              <p className={styles.subtitle}>Price Change (1y)</p>
              {coin?.market_data &&
                (coin.market_data.price_change_percentage_1y > 0 ? (
                  <p className={styles.green}>
                    {coin.market_data.price_change_percentage_1y.toFixed(1)}%
                  </p>
                ) : (
                  <p className={styles.red}>
                    {coin.market_data.price_change_percentage_1y.toFixed(1)}%
                  </p>
                ))}
            </div>
          </div>
          <div className={styles.linksContainer}>
            <FaTwitter size={25} />
            <FaFacebook size={25} />
            <FaReddit size={25} />
            <FaGithub size={25} />
          </div>
        </div>
      </div>
      <div className={styles.aboutContainer}>
        <p className={styles.aboutTitle}>About {coin?.name}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              coin?.description ? coin.description.en : ""
            ),
          }}
        ></p>
      </div>
    </div>
    </>
  )
}

export default CoinPage