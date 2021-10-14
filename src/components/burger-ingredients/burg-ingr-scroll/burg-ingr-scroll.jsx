import styles from "./burg-ingr-scroll.module.css";
import BurgIngrCard from "./burg-ingr-card/burg-ingr-card";
import cn from "classnames";
import { setCardsList } from "../../../utils/utils";

const BurgIngrScroll = ({ sections, menu }) => {
  const cnCards = cn(styles.cards, "pr-2", "pl-4");
  const cnBlockTitle = cn(
    styles.block__title,
    "mt-10",
    "mb-6",
    "text",
    "text_type_main-medium"
  );

  return (
    <div className={styles.window}>
      <ul className={styles.block}>
        {sections.map((i) => (
          <li className={styles.block__item} key={i.id}>
            <h2 className={cnBlockTitle}>{i.title}</h2>
            <ul className={cnCards}>
              {setCardsList(i.title, menu).map((item) => (
                <li className={styles.cards__card} key={item._id}>
                  <BurgIngrCard cardData={item} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BurgIngrScroll;
