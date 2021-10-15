import styles from "./burg-ingr-scroll.module.css";
// import { useEffect, useState } from "react";
import useModal from "../../../hoocs/use-modal";
import BurgIngrCard from "./burg-ingr-card/burg-ingr-card";
import Modal from "../../modal/modal";
import cn from "classnames";
import { setCardsList } from "../../../utils/utils";
import { modalCardTemplate } from "../../../utils/data";

const BurgIngrScroll = ({ sections, menu }) => {
  const { isOpen, info, openModal, closeModal } = useModal({});

  console.log(info)
  const cnCards = cn(styles.cards, "pr-2", "pl-4");
  const cnBlockTitle = cn(
    styles.block__title,
    "mt-10",
    "mb-6",
    "text",
    "text_type_main-medium"
  );
  const cnModalName = cn(
    styles.modal__name,
    "mt-4",
    "mb-8",
    "text",
    "text_type_main-medium"
  );
  const cnModalItem = cn(
    styles.modal__item,
    "mr-5",
    "text",
    "text_type_main-default",
    "text_color_inactive"
  );
  const cnModalValue = cn(
    "mt-2",
    "text",
    "text_type_digits-default",
    "text_color_inactive"
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
                  <BurgIngrCard cardData={item} onClick={openModal} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {isOpen && (
        <Modal title="Детали ингредиента" onClick={closeModal}>
          <img
            src={info.image_large}
            alt={info.name}
            className={styles.modal__img}
          />
          <p className={cnModalName}>{info.name}</p>
          <ul className={styles.modal__list}>
            {modalCardTemplate.map((i, ind) => (
              <li className={cnModalItem} key={ind}>
                {i[0]} <br />
                <span className={cnModalValue}>{info[`${i[1]}`]}</span>
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default BurgIngrScroll;
