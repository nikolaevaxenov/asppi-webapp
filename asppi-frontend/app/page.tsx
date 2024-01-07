// Импорт стилей из модуля homePage.module.scss.
import styles from "@/styles/homePage.module.scss";

// Импорт компонентов, необходимых для отображения содержимого домашней страницы.
import SoftwareConditionComponent from "@/components/SoftwareConditionComponent";
import StateOfThePowerUnitComponent from "@/components/StateOfThePowerUnitComponent";
import MainParametersChartComponent from "@/components/MainParametersChartComponent";

// Экспортируемый по умолчанию функциональный компонент Home.
export default function Home() {
  return (
    // Обертка для всего контента домашней страницы с применением стилей из модуля.
    <div className={styles.main}>
      {/* Заголовок для раздела "Состояние программ АСППИ". */}
      <h1>Состояние программ АСППИ</h1>

      {/* Компонент, отображающий информацию о состоянии программ АСППИ. */}
      <SoftwareConditionComponent />

      {/* Заголовок для раздела "Графики основных параметров". */}
      <h1>Графики основных параметров</h1>

      {/* Компонент, отображающий графики основных параметров. */}
      <MainParametersChartComponent />

      {/* Заголовок для раздела "Текущие технологические параметры". */}
      <h1>Текущие технологические параметры</h1>

      {/* Компонент, отображающий текущие технологические параметры. */}
      <StateOfThePowerUnitComponent />
    </div>
  );
}
