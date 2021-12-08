import styles from "./burger-ingredients.module.css";
import BurgIngrTabs from "./burg-ingr-tabs/burg-ingr-tabs";
import BurgIngrScroll from "./burg-ingr-scroll/burg-ingr-scroll";
import { menuSections, SECTION_TOP_MARGIN } from "../../utils/data";
import { memo, useRef, useState, FC } from "react";

const BurgerIngredients: FC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLHeadingElement[] | []>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const setTabOnScroll = (): void => {
    if (containerRef.current === null) return;
    const containerPos = containerRef.current.getBoundingClientRect().top;
    const sectionsPos = sectionsRef.current.map(
      (i) => i.getBoundingClientRect().top - containerPos
    );
    const tabInd = sectionsPos.findIndex(
      (i, ind, arr) => Math.abs(i) === Math.min(...arr.map((n) => Math.abs(n)))
    );
    setTabIndex(tabInd);
  };

  const handleClickOnTab = (ind: number): void => {
    if (containerRef.current === null) return;
    setTabIndex(ind);
    const containerPos = containerRef.current.getBoundingClientRect().top;
    const sectionPos = sectionsRef.current[ind].getBoundingClientRect().top;
    const scrollValue = sectionPos - containerPos - SECTION_TOP_MARGIN;
    containerRef.current.scrollBy({
      top: scrollValue,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.ingredients}>
      <h1
        className={`${styles.ingredients__title} text text_type_main-large mt-10 mb-5`}
      >
        Соберите бургер
      </h1>
      <BurgIngrTabs
        sections={menuSections}
        tabIndex={tabIndex}
        onClick={handleClickOnTab}
      />
      <BurgIngrScroll
        sections={menuSections}
        sectionAnchor={sectionsRef}
        containerAnchor={containerRef}
        onScroll={setTabOnScroll}
      />
    </section>
  );
});

export default BurgerIngredients;
