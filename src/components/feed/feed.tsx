import styles from "./feed.module.css";
import FeedItem from "../feed-item/feed-item";
import { FC } from "react";
import { useSelector } from "../../hooks/reduxHooks";

interface IFeed {
  mod?: string;
}

const Feed: FC<IFeed> = ({ mod }) => {
  const allOrders = useSelector((state) => state.orders.resAll?.orders);
  const ownerOrders = useSelector((state) =>
    state.orders.resOwner?.orders
  );

  const feedArr = mod === "profile" ? ownerOrders : allOrders;

  return (
    <ul className={`${styles.feed} ${styles[`feed_type_${mod}`]}`}>
      {feedArr?.map((i) => (
        <FeedItem mod={mod} orderData={i} key={i._id} />
      ))}
    </ul>
  );
};

export default Feed;
