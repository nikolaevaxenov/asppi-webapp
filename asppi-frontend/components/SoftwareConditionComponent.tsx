"use client";

import styles from "@/styles/softwareConditionComponent.module.scss";
import Carousel from "nuka-carousel";
import { useQuery } from "react-query";
import { getRC } from "@/services/getData";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

export default function SoftwareConditionComponent() {
  const { isLoading, error, data, isFetching } = useQuery("rcData", getRC, {
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки данных!</div>;

  return (
    <div className={styles.main}>
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
        {!!data ? (
          Object.keys(data).map((key) => {
            return (
              <div>
                <p>Информация по блоку {key}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Дата и время</th>
                      <th>Процесс</th>
                      <th>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[key][0].map((row) => (
                      <tr key={row[1]}>
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
          <tr>
            <td>Загрузка...</td>
          </tr>
        )}
      </Carousel>
    </div>
  );
}
