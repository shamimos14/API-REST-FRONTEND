import { getEstadoEquipo } from "./estadoEquipoService";
import { getMarca } from "./marcaService";
import { getTipoequipo } from "./tipoEquipoService";
import { getUsuarios } from "./usuarioService";

export const listarUsuarios = async () => {
    try {
        const { data } = await getUsuarios();
        //setUsuarios(data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const listarMarcas = async () => {
    try {
        const { data } = await getMarca();
        //setMarcas(data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const listarTipos = async () => {
    try {
        const { data } = await getTipoequipo();
        //setTipos(data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const listarEstados = async () => {
    try {
        const { data } = await getEstadoEquipo();
        //setEstados(data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}