import axios from "axios";

const baseUrl = "http://localhost:3050";

const handleError = err => console.log(err);

export const getAllCars = () => {
  return axios
    .get(`${baseUrl}/api/cars`)
    .then(result => result.data)
    .catch(handleError);
};

export const getCarById = id => {
  return axios
    .get(`${baseUrl}/api/cars/${id}`)
    .then(result => result.data)
    .catch(handleError);
};

export const addCar = car => {
  axios
    .post(`${baseUrl}/api/cars/`, car)
    .then((result) => result.data)
    .catch(handleError);
};
