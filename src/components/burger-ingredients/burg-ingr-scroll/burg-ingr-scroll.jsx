import styles from "./burg-ingr-scroll.module.css";
import { useContext } from "react";
import useModal from "../../../hooks/use-modal";
import BurgIngrCard from "./burg-ingr-card/burg-ingr-card";
import Modal from "../../modal/modal";
import IngredientDetails from "../../modal/ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import { menuSectionPropType } from "../../../utils/prop-types";
import { BurgerContext } from "../../../contexts/burger-context";

const BurgIngrScroll = ({ sections }) => {
  const { isOpen, info, openModal, closeModal } = useModal({});
  const menu = useContext(BurgerContext);

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
              {menu[i.key].map((item) => (
                <li className={styles.cards__card} key={item._id}>
                  <BurgIngrCard cardData={item} onClick={openModal} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {isOpen && (
        <Modal title="Детали ингредиента" onClick={closeModal}>
          <IngredientDetails info={info} />
        </Modal>
      )}
    </div>
  );
};

export default BurgIngrScroll;

BurgIngrScroll.propTypes = {
  sections: PropTypes.arrayOf(menuSectionPropType),
};
