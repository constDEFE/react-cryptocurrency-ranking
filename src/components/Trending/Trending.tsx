import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchTrending } from "../../redux/slices/trendingSlice";
import TrendingItem from "./TrendingItem";
import { Style } from "../../models/models";

const styles: Style = {
  container: "rounded-div my-12 pb-8 pt-4 text-primary",
  title: "text-2xl font-bold py-2",
  content: "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
  loading: "text-center text-3xl font-semibold tracking-wide py-2",
};

const Trending = () => {
  const dispatch = useAppDispatch();
  const { trending, isLoading, error } = useAppSelector((state) => state.trending);

  useEffect(() => {
    dispatch(fetchTrending());
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Trending Coins</h2>
      <div className={styles.content}>
        {trending.map((coin) => (
          <TrendingItem key={coin.item.coin_id} coin={coin} />
        ))}
      </div>
      {isLoading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.loading}>{error}</p>}
    </div>
  );
};

export default Trending;
