import styles from "./burg-ingr-scroll.module.css";
// import { useEffect, useState } from "react";
import useModal from "../../../hoocs/use-modal";
import BurgIngrCard from "./burg-ingr-card/burg-ingr-card";
import Modal from "../../modal/modal";
import IngredientDetails from "../../modal/ingredient-details/ingredient-details";
import { setCardsList } from "../../../utils/utils";
import PropTypes from "prop-types";
import { menuSectionPropType, cardPropTypes } from "../../../utils/prop-types";

const BurgIngrScroll = ({ sections, menu }) => {
  const { isOpen, info, openModal, closeModal } = useModal({});

  return (
    <div className={styles.window}>
      <ul className={styles.block}>
        {sections.map((i) => (
          <li className={styles.block__item} key={i.id}>
            <h2
              className={`${styles.block__title} mt-10 mb-6 text text_type_main-medium`}
            >
              {i.title}
            </h2>
            <ul className={`${styles.cards} pr-2 pl-4`}>
              {setCardsList(i.title, menu).map((item) => (
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
  menu: PropTypes.arrayOf(PropTypes.arrayOf(cardPropTypes)),
};
