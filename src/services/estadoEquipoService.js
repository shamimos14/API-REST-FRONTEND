import { axiosInstance } from '../helpers/axios-config';

//http://localhost:4000/estado-equipo
const getEstadoEquipo = () => {
    return axiosInstance.get( 'estado-equipo', {
        headers: {
            'Content-Type': 'aplication/json'
        }
    });
}
const crearEstadoEquipo = (data) => {
    return axiosInstance.post('estado-equipo', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
const editarEstadoEquipo = (data) => {
    return axiosInstance.put(`estado-equipo/${data.id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }); 
}

export {
    getEstadoEquipo, crearEstadoEquipo, editarEstadoEquipo
}