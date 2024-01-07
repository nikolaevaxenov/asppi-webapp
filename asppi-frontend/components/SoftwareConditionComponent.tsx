// Инструкция "use client" указывает на использование клиентского (браузерного) режима.
"use client";

// Импорт стилей из модуля softwareConditionComponent.module.scss.
import styles from "@/styles/softwareConditionComponent.module.scss";

// Импорт компонента Carousel из библиотеки nuka-carousel.
import Carousel from "nuka-carousel";

// Импорт хуков и сервиса для работы с запросами о состоянии программного обеспечения.
import { useQuery } from "react-query";
import { getRC } from "@/services/getData";

// Импорт иконок из библиотеки react-icons/io.
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

// Экспортируемый по умолчанию функциональный компонент SoftwareConditionComponent.
export default function SoftwareConditionComponent() {
  // Используем хук useQuery для получения данных о состоянии программного обеспечения.
  const { isLoading, error, data, isFetching } = useQuery("rcData", getRC, {
    refetchInterval: 60000, // Интервал автоматического обновления данных в миллисекундах.
    refetchOnWindowFocus: false, // Отключение автоматического обновления при фокусе на окне браузера.
  });

  // Если данные загружаются или выполняется обновление, отображаем сообщение о загрузке.
  if (isLoading || isFetching) return <div>Загрузка...</div>;

  // Если произошла ошибка при загрузке данных, отображаем сообщение об ошибке.
  if (error) return <div>Ошибка загрузки данных!</div>;

  return (
    // Обертка для содержимого компонента с применением стилей из модуля.
    <div className={styles.main}>
      {/* Карусель для пролистывания блоков данных. */}
      <Carousel
        renderBottomCenterControls={false}
        renderCenterLeftControls={({ previousSlide }) => (
          <button onClick={previousSlide}>
            <IoIosArrowDropleftCircle />
          </button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <button onClick={nextSlide}>
            <IoIosArrowDroprightCircle />
          </button>
        )}
      >
        {/* Проверка наличия данных перед отображением таблиц. */}
        {!!data ? (
          // Проходим по ключам данных и отображаем таблицу для каждого блока.
          Object.keys(data).map((key) => {
            return (
              <div>
                {/* Заголовок с информацией о блоке данных. */}
                <p>Информация по блоку {key}</p>

                {/* Таблица с данными о состоянии программного обеспечения. */}
                <table>
                  {/* Заголовок таблицы. */}
                  <thead>
                    <tr>
                      <th>Дата и время</th>
                      <th>Процесс</th>
                      <th>Статус</th>
                    </tr>
                  </thead>
                  {/* Тело таблицы с данными. */}
                  <tbody>
                    {data[key][0].map((row) => (
                      <tr key={row[1]}>
                        {/* Форматирование даты и времени на русском языке. */}
                        <td>{new Date(row[0]).toLocaleString("ru-RU")}</td>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })
        ) : (
          // Если данные загружаются, но пока не доступны, отображаем сообщение о загрузке.
          <tr>
            <td>Загрузка...</td>
          </tr>
        )}
      </Carousel>
    </div>
  );
}
