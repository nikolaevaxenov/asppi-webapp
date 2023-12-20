export const getRC = async () => {
  const response = await fetch("http://localhost:8000/data/rc", {
    method: "GET",
  });

  return response.json();
};

export const getCL = async () => {
  const response = await fetch("http://localhost:8000/data/cl", {
    method: "GET",
  });

  return response.json();
};

export const getDA1 = async () => {
  const response = await fetch("http://localhost:8000/data/da1", {
    method: "GET",
  });

  return response.json();
};

export const getWT = async () => {
  const response = await fetch("http://localhost:8000/data/wt", {
    method: "GET",
  });

  return response.json();
};
