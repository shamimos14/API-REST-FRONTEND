import { axiosInstance } from '../helpers/axios-config';

//http://localhost:4000/tipo-equipo
const getTipoequipo = () => {
    return axiosInstance.get('tipo-equipo', {
        headers: {
            'Content-Type': 'aplication/json'
        }
    });
}
const crearTipoequipo = (data) => {
    return axiosInstance.post('tipo-equipo', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
const editarTipoequipo = (data) => {
    return axiosInstance.put(`tipo-equipo/${data.id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getTipoequipo, crearTipoequipo, editarTipoequipo
}