// Инструкция "use client" указывает на использование клиентского (браузерного) режима.
"use client";

// Импорт стилей из модуля HeaderComponent.module.scss.
import styles from "@/styles/HeaderComponent.module.scss";

// Экспортируемый по умолчанию функциональный компонент HeaderComponent.
export default function HeaderComponent() {
  return (
    // Обертка для содержимого шапки с применением стилей из модуля.
    <div className={styles.main}>
      {/* Параграф с описанием сайта автоматизированной системы. */}
      <p>
        Сайт автоматизированной системы подготовки последовательности извлечения
        стержней СУЗ (АСППИ)
      </p>
    </div>
  );
}
