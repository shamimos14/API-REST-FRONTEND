import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://api-rest-nodejs-inventario.onrender.com'
});

export {
    axiosInstance
}