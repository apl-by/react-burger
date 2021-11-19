import styles from "./burg-ingr-scroll.module.css";
import BurgIngrCard from "./burg-ingr-card/burg-ingr-card";
import PropTypes from "prop-types";
import {  useMemo } from "react";
import { menuSectionPropType } from "../../../utils/prop-types";
import { useSelector } from "react-redux";
import { sortData } from "../../../utils/utils";
import throttle from "lodash/throttle";

const BurgIngrScroll = ({
  sections,
  sectionAnchor,
  containerAnchor,
  onScroll,
}) => {
  const { menu } = useSelector((store) => store.menu);

  const sortedMenu = useMemo(() => sortData(menu), [menu]);

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
              ref={(el) => (sectionAnchor.current[ind] = el)}
            >
              {i.section}
            </h2>
            <ul className={`${styles.cards} pr-2 pl-4`}>
              {sortedMenu[i.key].map((item) => (
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

BurgIngrScroll.propTypes = {
  sections: PropTypes.arrayOf(menuSectionPropType),
  sectionAnchor: PropTypes.shape({
    current: PropTypes.any,
  }),
  containerAnchor: PropTypes.shape({
    current: PropTypes.any,
  }),
  onScroll: PropTypes.func.isRequired,
};
