import styles from "./stats.module.css";
import { FC, useCallback } from "react";
import { useSelector } from "../../hooks/reduxHooks";

type TOrderNumbers = {
  done: number[];
  pending: number[];
};

const Stats: FC = () => {
  const ordersAll = useSelector((state) => state.orders.resAll);
  const ordersNumbers: TOrderNumbers | undefined = ordersAll?.orders.reduce(
    (prev: TOrderNumbers, i) => {
      i.status === "done"
        ? prev.done.push(i.number)
        : prev.pending.push(i.number);
      return prev;
    },
    { done: [], pending: [] }
  );

  const doneForRenfer = ordersNumbers?.done.slice(0, 20);
  const pendingForRenfer = ordersNumbers?.pending.slice(0, 20);

  const insertStateHtml = useCallback(
    (numbers: number[] | undefined, state: string, mod?: string) => (
      <div className={styles.state}>
        <p className={`text text_type_main-medium mb-6`}>{state}</p>
        <ul className={styles.state__numbers}>
          {numbers?.map((i: number, index: number) => (
            <li
              className={`${styles.state__number} ${
                styles[`state__number_color_${mod}`]
              } text text_type_digits-default`}
              key={index}
            >
              {i}
            </li>
          ))}
        </ul>
      </div>
    ),
    []
  );

  const insertStatsHtml = useCallback(
    (value: number, text: string) => (
      <>
        <p className={`text text_type_main-medium mt-15`}>{text}</p>
        <span className={`${styles.stats} text text_type_digits-large`}>
          {value}
        </span>
      </>
    ),
    []
  );

  return (
    <>
      {ordersAll && (
        <div className={`${styles.container} ml-15`}>
          <div className={styles[`state-container`]}>
            {insertStateHtml(doneForRenfer, "Готовы:", "green")}
            {insertStateHtml(pendingForRenfer, "В работе:")}
          </div>
          {insertStatsHtml(ordersAll.total, "Выполнено за все время:")}
          {insertStatsHtml(ordersAll.totalToday, "Выполнено за сегодня:")}
        </div>
      )}
    </>
  );
};

export default Stats;
