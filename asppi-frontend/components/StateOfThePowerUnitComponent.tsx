// Инструкция "use client" указывает на использование клиентского (браузерного) режима.
"use client";

// Импорт компонента Carousel из библиотеки nuka-carousel.
import Carousel from "nuka-carousel";

// Импорт хуков и сервисов для работы с запросами о состоянии блоков CL и DA1.
import { useQuery } from "react-query";
import { getCL, getDA1 } from "@/services/getData";

// Импорт стилей из модуля stateOfThePowerUnitComponent.module.scss.
import styles from "@/styles/stateOfThePowerUnitComponent.module.scss";

// Импорт иконок из библиотеки react-icons/io.
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useCarouselStore } from "@/hooks/useCarouselStore";

// Экспортируемый по умолчанию функциональный компонент StateOfThePowerUnitComponent.
export default function StateOfThePowerUnitComponent() {
  const carouselIndex = useCarouselStore((state) => state.index);
  const updateIndex = useCarouselStore((state) => state.updateIndex);

  // Используем хуки useQuery для получения данных о состоянии блоков CL и DA1.
  const {
    isLoading: isLoadingCL,
    error: errorCL,
    data: dataCL,
    isFetching: isFetchingCL,
  } = useQuery("clData", getCL, {
    refetchInterval: 60000, // Интервал автоматического обновления данных в миллисекундах.
    refetchOnWindowFocus: false, // Отключение автоматического обновления при фокусе на окне браузера.
  });
  const {
    isLoading: isLoadingDA1,
    error: errorDA1,
    data: dataDA1,
    isFetching: isFetchingDA1,
  } = useQuery("da1Data", getDA1, {
    refetchInterval: 60000, // Интервал автоматического обновления данных в миллисекундах.
    refetchOnWindowFocus: false, // Отключение автоматического обновления при фокусе на окне браузера.
  });

  // Если данные загружаются или выполняется обновление, отображаем сообщение о загрузке.
  if (isLoadingCL || isFetchingCL || isLoadingDA1 || isFetchingDA1)
    return <div>Загрузка...</div>;

  // Если произошла ошибка при загрузке данных, отображаем сообщение об ошибке.
  if (errorCL || errorDA1) return <div>Ошибка загрузки данных!</div>;

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
        slideIndex={carouselIndex}
        afterSlide={updateIndex}
      >
        {/* Проверка наличия данных перед отображением таблиц. */}
        {!!dataCL && !!dataDA1 ? (
          // Проходим по ключам данных и отображаем таблицу для каждого блока.
          Object.keys(dataCL).map((key) => {
            return (
              <div>
                {/* Заголовок с информацией о блоке данных. */}
                <p>Информация о блоке {key}</p>

                {/* Проверка наличия данных о дате/времени окончания предыдущего расчета для блока CL. */}
                {dataCL[key]?.[0]?.[0]?.[1] !== "1899-12-30T00:00:00" && (
                  <p>
                    Дата/время окончания предыдущего расчета:{" "}
                    {new Date(
                      dataCL[key]?.[0]?.[0]?.[1].toLocaleString("ru-RU")
                    ).toLocaleString("ru-RU")}
                  </p>
                )}

                {/* Проверка наличия данных о дате/времени окончания текущего расчета для блока CL. */}
                {dataCL[key]?.[0]?.[1]?.[1] !== "1899-12-30T00:00:00" && (
                  <p>
                    Дата/время окончания расчета:{" "}
                    {new Date(
                      dataCL[key]?.[0]?.[1]?.[1].toLocaleString("ru-RU")
                    ).toLocaleString("ru-RU")}
                  </p>
                )}

                {/* Проверка наличия данных о дате/времени сохранения таблицы DA для блока DA1. */}
                {dataDA1[key]?.[0]?.[0]?.[1] !== "1899-12-30T00:00:00" && (
                  <p>
                    Дата/время сохранения таблицы DA:{" "}
                    {new Date(
                      dataDA1[key]?.[0]?.[0]?.[1].toLocaleString("ru-RU")
                    ).toLocaleString("ru-RU")}
                  </p>
                )}

                {/* Таблица с параметрами состояния блоков CL и DA1. */}
                <table>
                  {/* Заголовок таблицы. */}
                  <thead>
                    <tr>
                      <th>Параметр</th>
                      <th>Значение</th>
                    </tr>
                  </thead>
                  {/* Тело таблицы с данными. */}
                  <tbody>
                    {/* Проверка наличия данных о параметрах блока CL. */}
                    {!!dataCL[key]?.[0] ? (
                      // Фильтрация данных и отображение каждой строки таблицы для блока CL.
                      dataCL[key][0]
                        .slice(2)
                        .filter(
                          (row) =>
                            row[1] !== 0 && row[1] !== "1899-12-30T00:00:00"
                        )
                        .map((row) => (
                          <tr key={row[0]}>
                            <td>{row[0]}</td>
                            <td>{Math.round(row[1] * 100) / 100}</td>
                          </tr>
                        ))
                    ) : (
                      // Если данные загружаются, но пока не доступны, отображаем сообщение о загрузке.
                      <tr>
                        <td>Загрузка...</td>
                      </tr>
                    )}

                    {/* Проверка наличия данных о параметрах блока DA1. */}
                    {!!dataDA1[key]?.[0] ? (
                      // Фильтрация данных и отображение каждой строки таблицы для блока DA1.
                      dataDA1[key][0]
                        .slice(1)
                        .filter(
                          (row) =>
                            row[1] !== 0 && row[1] !== "1899-12-30T00:00:00"
                        )
                        .map((row) => (
                          <tr key={row[0]}>
                            <td>{row[0]}</td>
                            <td>{Math.round(row[1] * 100) / 100}</td>
                          </tr>
                        ))
                    ) : (
                      // Если данные загружаются, но пока не доступны, отображаем сообщение о загрузке.
                      <tr>
                        <td>Загрузка...</td>
                      </tr>
                    )}
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
