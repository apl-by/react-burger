import styles from "./burg-ingr-scroll.module.css";
import BurgIngrCard from "./burg-ingr-card/burg-ingr-card";
import { useMemo, FC, MutableRefObject, RefObject } from "react";
import { useSelector } from "react-redux";
import { sortData } from "../../../utils/utils";
import throttle from "lodash/throttle";
import { ISortedMenu, IMenuSection } from "../../../types/common";

interface IBurgIngrScroll {
  sections: Array<IMenuSection>;
  sectionAnchor: MutableRefObject<HTMLHeadingElement[]>;
  containerAnchor: RefObject<HTMLDivElement>;
  onScroll: () => void;
}

const BurgIngrScroll: FC<IBurgIngrScroll> = ({
  sections,
  sectionAnchor,
  containerAnchor,
  onScroll,
}) => {
  // используется any (до типизации useSelector)
  const { menu } = useSelector((store: any) => store.menu);

  const sortedMenu = useMemo<ISortedMenu>(() => sortData(menu), [menu]);

  return (
    <div
      className={styles.window}
      onScroll={throttle(onScroll, 100)}
      ref={containerAnchor}
    >
      <ul className={styles.block}>
        {sections.map((i, ind) => (
          <li className={styles.block__item} key={i.id}>
            <h2
              className={`${styles.block__title} mt-10 mb-6 text text_type_main-medium`}
              ref={(el) => (el ? (sectionAnchor.current[ind] = el) : null)}
            >
              {i.section}
            </h2>
            <ul className={`${styles.cards} pr-2 pl-4`}>
              {sortedMenu[i.key as keyof ISortedMenu].map((item) => (
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