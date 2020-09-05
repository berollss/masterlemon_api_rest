const baseUrl = "http://localhost:3050";

export const httpClientService = (() => {
  let headers;
  const getHeaders = () => headers;
  return {
    setHeaders: (_headers) => (headers = _headers),
    getAllCars: async () => {
      const response = await fetch(`${baseUrl}/api/cars`, {
        headers: getHeaders(),
      });
      if (!response.ok) {
        handleError(response);
      }
      return await response.json();
    },
    getCarById: async (id) => {
      const response = await fetch(`${baseUrl}/api/cars/${id}`, {
        headers: getHeaders(),
      });
      if (!response.ok) {
        handleError(response);
      }
      return await response.json();
    },
    addCar: async (car) => {
      const settings = {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(car),
      };
      settings.headers.Accept = "application/json";
      settings.headers["Content-type"] = "application/json";

      const response = await fetch(`${baseUrl}/api/cars`, settings);
      if (!response.ok) {
        handleError(response);
      }
      return await response.json();
    },
  };
})();

const handleError = (response) => {
  const error = response.json();
  console.log(error);
  throw Error(response.statusText);
};
