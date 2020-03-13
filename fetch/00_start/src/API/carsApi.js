const baseUrl = "http://localhost:3050";

const handleError = response => {
  const error = response.json();
  console.log(error);
  throw Error(response.statusText);
};

export const getAllCars = async () => {
  const response = await fetch(`${baseUrl}/api/cars`);
  if (!response.ok) {
    handleError(response);
  }
  return await response.json();
};

export const getCarById = async id => {
  const response = await fetch(`${baseUrl}/api/cars/${id}`);
  if (!response.ok) {
    handleError(response);
  }
  return await response.json();
};

export const addCar = async car => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(car)
  };
  const response = await fetch(`${baseUrl}/api/cars`, settings);
  if (!response.ok) {
    handleError(response);
  }
  return await response.json();
};
