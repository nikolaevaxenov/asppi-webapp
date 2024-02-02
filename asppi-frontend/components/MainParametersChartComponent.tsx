// Инструкция "use client" указывает на использование клиентского (браузерного) режима.
"use client";

// Импорт стилей из модуля mainParametersChartComponent.module.scss.
import styles from "@/styles/mainParametersChartComponent.module.scss";

// Импорт компонента Carousel из библиотеки nuka-carousel.
import Carousel from "nuka-carousel";

// Импорт хуков и компонентов для работы с запросами и графиками.
import { useQuery } from "react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Импорт функции getWT из сервиса getData.
import { getWT } from "@/services/getData";

// Импорт иконок из библиотеки react-icons/io.
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useCarouselStore } from "@/hooks/useCarouselStore";

// Экспортируемый по умолчанию функциональный компонент MainParametersChartComponent.
export default function MainParametersChartComponent() {
  const carouselIndex = useCarouselStore((state) => state.index);
  const updateIndex = useCarouselStore((state) => state.updateIndex);

  // Используем хук useQuery для получения данных о тепловыделении.
  const { isLoading, error, data, isFetching } = useQuery("wtData", getWT, {
    refetchInterval: 60000, // Интервал автоматического обновления данных в миллисекундах.
    refetchOnWindowFocus: false, // Отключение автоматического обновления при фокусе на окне браузера.
  });

  // Если данные загружаются или выполняется обновление, отображаем сообщение о загрузке.
  if (isLoading || isFetching) return <div>Загрузка...</div>;

  // Если произошла ошибка при загрузке данных, отображаем сообщение об ошибке.
  if (error) return <div>Ошибка загрузки данных!</div>;

  // Функция для преобразования полученных данных в удобный формат для графиков.
  const convertData = (inputData) => {
    const outputData = {};

    // Проходим по ключам входных данных и преобразуем каждый набор данных.
    for (const key in inputData) {
      outputData[key] = inputData[key].map((row) => {
        const newRow = {};
        for (let i = 0; i < row.length; i += 2) {
          newRow[row[i]] = row[i + 1];
        }
        return newRow;
      });
    }

    return outputData;
  };

  // Преобразуем полученные данные.
  const chartData = convertData(data);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{ backgroundColor: "#457b9d", padding: "0.5em" }}
        >
          <p className="intro">{label}</p>
          <p className="label">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

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
        {/* Проверка наличия данных перед отображением графиков. */}
        {!!data ? (
          // Проходим по ключам данных и отображаем графики для каждого блока.
          Object.keys(chartData).map((key) => {
            return (
              <div>
                {/* Заголовок с информацией о блоке данных. */}
                <p>Информация о блоке {key}</p>

                {/* Обертка для графиков с применением стилей из модуля. */}
                <div className={styles.charts}>
                  {/* График мощности. */}
                  <ResponsiveContainer height={300}>
                    <LineChart
                      data={chartData[key]}
                      margin={{
                        right: 10,
                        left: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Дата/время" tick={{ fill: "#f1faee" }} />
                      <YAxis
                        tick={{ fill: "#f1faee" }}
                        tickFormatter={(value) =>
                          Number.parseFloat(value).toExponential()
                        }
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Мощность"
                        stroke="#fbf8cc"
                        strokeWidth={5}
                      />
                    </LineChart>
                  </ResponsiveContainer>

                  {/* График концентрации ксенона 135. */}
                  <ResponsiveContainer height={300}>
                    <LineChart
                      data={chartData[key]}
                      margin={{
                        right: 10,
                        left: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Дата/время" tick={{ fill: "#f1faee" }} />
                      <YAxis
                        tick={{ fill: "#f1faee" }}
                        tickFormatter={(value) =>
                          Number.parseFloat(value).toExponential()
                        }
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Концентрация ксенона 135"
                        stroke="#f1c0e8"
                        strokeWidth={5}
                      />
                    </LineChart>
                  </ResponsiveContainer>

                  {/* График концентрации йода 135. */}
                  <ResponsiveContainer height={300}>
                    <LineChart
                      data={chartData[key]}
                      margin={{
                        right: 10,
                        left: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Дата/время" tick={{ fill: "#f1faee" }} />
                      <YAxis
                        tick={{ fill: "#f1faee" }}
                        tickFormatter={(value) =>
                          Number.parseFloat(value).toExponential()
                        }
                      />
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Концентрация йода 135"
                        stroke="#ffd166"
                        strokeWidth={5}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
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
