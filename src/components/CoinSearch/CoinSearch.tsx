import React, { ChangeEvent, useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchCoins } from "../../redux/slices/coinsSlice";
import { Style } from "../../models/models";
import CoinItem from "./CoinItem";

const styles: Style = {
  container: "rounded-div my-4",
  header: "flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right px-2",
  title: "text-2xl font-bold my-2",
  input: "w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl focus:outline-none",
  table: "w-full border-collapse text-center",
  headRow: "border-b",
  headNumber: "px-4",
  headCoin: "text-left",
  headCell: "hidden sm:table-cell",
  loading: "text-center text-3xl font-semibold tracking-wide py-2"
};

const CoinSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { coins, error, isLoading } = useAppSelector((state) => state.coins);
  const dispatch = useAppDispatch();
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value);

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Search Crypto</h2>
        <form onSubmit={(event) => event.preventDefault()}>
          <input
            className={styles.input}
            onChange={handleSearch}
            type="text"
            placeholder="Search a coin..."
          />
        </form>
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headRow}>
            <th></th>
            <th className={styles.headNumber}>#</th>
            <th className={styles.headCoin}>Coin</th>
            <th></th>
            <th>Price</th>
            <th>24h</th>
            <th className={styles.headCell}>24h Volume</th>
            <th className={styles.headCell}>Mkt</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {coins
            .filter((value) => {
              if (searchQuery === "") return value;
              else if (value.name.toLowerCase().includes(searchQuery.toLowerCase())) return value;
            })
            .map((coin) => (
              <CoinItem key={coin.id} coin={coin} />
            ))}
        </tbody>
      </table>
      { isLoading && <p className={styles.loading}>Loading...</p> }
      { error && <p className={styles.loading}>{error}</p> }
    </div>
  );
};

export default CoinSearch;
