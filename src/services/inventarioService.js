import { axiosInstance } from '../helpers/axios-config';

//http://localhost:4000/inventario
const getInventario = () => {
    return axiosInstance.get(`inventario`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
const crearInventario = (data) => {
    return axiosInstance.post(`inventario`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
const editInventario = (inventarioId, data) => {
    return axiosInstance.put(`inventario/${inventarioId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
const getInventarioPorId = (inventarioId) => {
    return axiosInstance.get(`inventario/${inventarioId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
export {
    getInventario, crearInventario, editInventario, getInventarioPorId
}