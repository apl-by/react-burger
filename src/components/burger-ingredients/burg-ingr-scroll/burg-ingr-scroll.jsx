import styles from "./burg-ingr-scroll.module.css";
import BurgIngrCard from "./burg-ingr-card/burg-ingr-card";
import Modal from "../../modal/modal";
import IngredientDetails from "../../modal/ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
import { menuSectionPropType } from "../../../utils/prop-types";
import { useSelector, useDispatch } from "react-redux";
import { sortData } from "../../../utils/utils";
import throttle from "lodash/throttle";
import { CLOSE_INGR_DETAILS } from "../../../services/actions";

const BurgIngrScroll = ({
  sections,
  sectionAnchor,
  containerAnchor,
  onScroll,
}) => {
  const dispatch = useDispatch();
  const { menu } = useSelector((store) => store.menu);
  const { isModalOpen } = useSelector((store) => store.ingrDetails);

  const sortedMenu = useMemo(() => sortData(menu), [menu]);

  const closeModal = useCallback(() => {
    dispatch({ type: CLOSE_INGR_DETAILS });
  }, [dispatch]);

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
      {isModalOpen && (
        <Modal title="Детали ингредиента" sendDispatch={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
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
