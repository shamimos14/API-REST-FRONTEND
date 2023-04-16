import { axiosInstance } from '../helpers/axios-config';

//http://localhost:4000/usuario
const getUsuarios = () => {
    return axiosInstance.get( 'usuario', {
        headers: {
            'Content-Type': 'aplication/json'
        }
    });
}
const crearUsuario = (data) => {
    return axiosInstance.post('usuario', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
const editarUsuario = (data) => {
    return axiosInstance.put(`usuario/${data.id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getUsuarios, crearUsuario, editarUsuario
}