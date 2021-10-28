import styles from "./burg-ingr-scroll.module.css";
import BurgIngrCard from "./burg-ingr-card/burg-ingr-card";
import Modal from "../../modal/modal";
import IngredientDetails from "../../modal/ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { menuSectionPropType } from "../../../utils/prop-types";
import { useSelector } from "react-redux";
import { sortData } from "../../../utils/utils";

const BurgIngrScroll = ({ sections }) => {
  const { menu } = useSelector(store => store.menu);
  const { isModalOpen } = useSelector(store => store.ingrDetails);

  const sortedMenu = useMemo(() => sortData(menu), [menu]);

  return (
    <div className={styles.window}>
      <ul className={styles.block}>
        {sections.map((i) => (
          <li className={styles.block__item} key={i.id}>
            <h2
              className={`${styles.block__title} mt-10 mb-6 text text_type_main-medium`}
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
      {isModalOpen && (
        <Modal title="Детали ингредиента" type="ingredient">
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgIngrScroll;

BurgIngrScroll.propTypes = {
  sections: PropTypes.arrayOf(menuSectionPropType),
};
