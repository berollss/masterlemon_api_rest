import {
  addCarRows,
  retrieveCarId,
  populateEditCarForm,
  retrieveCarForm,
  cleanTable,
} from "./uiHelpers";
import { getAllCars, getCarById, addCar } from "./API/carsApi";
import { login } from "./api/login.service";
import { httpClientService } from "./API/carsApi";

const readCredentials = () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  return {
    username,
    password,
  };
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login").addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const credentials = readCredentials();
    login(credentials)
      .then((data) => {
        console.log(data);
        const { access_token } = data;
        const headers = {
          Authorization: `Bearer ${access_token}`,
        };
        httpClientService.setHeaders(headers);
      })
      .catch((err) => console.log(err));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const buttonLoadCars = document.getElementById("loadcars");
  buttonLoadCars.addEventListener("click", (event) => {
    event.stopPropagation();
    cleanTable("cars-table");
    httpClientService.getAllCars().then((result) => {
      addCarRows(result, "cars-table");
    });
  });

  const buttonLoadCar = document.getElementById("loadcar");
  buttonLoadCar.addEventListener("click", (event) => {
    event.stopPropagation();
    const carId = retrieveCarId();
    httpClientService.getCarById(carId).then((r) => populateEditCarForm(r));
  });

  const buttonAddCar = document.getElementById("add");
  buttonAddCar.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    const car = retrieveCarForm();
    httpClientService
      .addCar(car)
      .then((_) => {
        cleanTable("cars-table");
        return httpClientService.getAllCars();
      })
      .then((result) => {
        addCarRows(result, "cars-table");
      });
  });
});
