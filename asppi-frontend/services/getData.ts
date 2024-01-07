// Экспорт асинхронной функции getRC, которая отправляет GET-запрос по адресу "http://localhost:8000/data/rc" и возвращает результат в формате JSON.
export const getRC = async () => {
  // Ожидание выполнения запроса с использованием функции fetch.
  const response = await fetch("http://localhost:8000/data/rc", {
    method: "GET", // Указание метода запроса (GET).
  });

  // Возвращение результатов запроса в формате JSON.
  return response.json();
};

// Экспорт асинхронной функции getCL, которая отправляет GET-запрос по адресу "http://localhost:8000/data/cl" и возвращает результат в формате JSON.
export const getCL = async () => {
  // Ожидание выполнения запроса с использованием функции fetch.
  const response = await fetch("http://localhost:8000/data/cl", {
    method: "GET", // Указание метода запроса (GET).
  });

  // Возвращение результатов запроса в формате JSON.
  return response.json();
};

// Экспорт асинхронной функции getDA1, которая отправляет GET-запрос по адресу "http://localhost:8000/data/da1" и возвращает результат в формате JSON.
export const getDA1 = async () => {
  // Ожидание выполнения запроса с использованием функции fetch.
  const response = await fetch("http://localhost:8000/data/da1", {
    method: "GET", // Указание метода запроса (GET).
  });

  // Возвращение результатов запроса в формате JSON.
  return response.json();
};

// Экспорт асинхронной функции getWT, которая отправляет GET-запрос по адресу "http://localhost:8000/data/wt" и возвращает результат в формате JSON.
export const getWT = async () => {
  // Ожидание выполнения запроса с использованием функции fetch.
  const response = await fetch("http://localhost:8000/data/wt", {
    method: "GET", // Указание метода запроса (GET).
  });

  // Возвращение результатов запроса в формате JSON.
  return response.json();
};
