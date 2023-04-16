import { axiosInstance } from '../helpers/axios-config';

//http://localhost:4000/marca
const getMarca = () => {
    return axiosInstance.get( 'marca', {
        headers: {
            'Content-Type': 'aplication/json'
        }
    });
}
const crearMarca = (data) => {
    return axiosInstance.post('marca', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
const editarMarca = (data) => {
    return axiosInstance.put(`marca/${data.id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getMarca, crearMarca, editarMarca
}