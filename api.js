import axios from "axios";

const API_KEY = "b748c1c6bb1a2517a25014354486f117"; // Replace with your API key
const CITY = "Seoul"; // Replace with your city name

export const fetchWeather = async () => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
  );
  return response.data;
};
