import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
// import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { data } from '../../utils/data';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        {/* <BurgerConstructor /> */}
      </main>
      
    </div>
  );
}

export default App;
