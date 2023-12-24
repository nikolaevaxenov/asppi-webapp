"use client";

import styles from "@/styles/HeaderComponent.module.scss";

export default function HeaderComponent() {
  return (
    <div className={styles.main}>
      <p>
        Сайт автоматизированной системы подготовки последовательности извлечения
        стержней СУЗ (АСППИ)
      </p>
    </div>
  );
}
