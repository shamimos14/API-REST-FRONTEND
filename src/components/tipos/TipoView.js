import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Table } from '../table';
import { crearTipoequipo, editarTipoequipo, getTipoequipo } from '../../services/tipoEquipoService';

export const TipoView = () => {
    const [valoresForm, setValoresForm] = useState({ nombre: "", estado: "" });
    const [tipos, setTipos] = useState([]);
    const dataTableHead = ["Id", "Nombre", "Estado", "Fecha de Creación", "Fecha de Actualización"];

    const listarTipos = async () => {
        try {
            const { data } = await getTipoequipo();
            setTipos(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value }) //spreat
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const tipo = {
            nombre: valoresForm.nombre,
            estado: valoresForm.estado
        }
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();

            if (valoresForm.id) {
                await editarTipoequipo(valoresForm)

            } else {
                await crearTipoequipo(tipo);
            }

            listarTipos();
            setValoresForm({ nombre: "", estado: "" });
            Swal.close();
        } catch (error) {
            console.log(error, error.response);
            Swal.close();
            let mensaje;
            if (error && error.response && error.response.data) {
                mensaje = error.response.data;
            } else {
                mensaje = 'Ocurrio un error, favor verificar los datos';
            }
            Swal.fire('Error', mensaje, 'error');
        }
    }

    const handleUpdate = async (e, tipo) => {
        e.preventDefault();
        setValoresForm({
            nombre: tipo.nombre,
            estado: tipo.estado, id: tipo._id
        });
    }

    useEffect(() => {
        listarTipos();
    }, []);

    return (
        <div className="container-fluid mt-3 mb-2 p-3">
            <div className="card">
                <div className='card-header'>
                    <h5 className='card-title'>Tipos de Equipo</h5>
                </div>
                <div className='card-body'>
                    <form onSubmit={(e) => handleOnSubmit(e)}>
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="tex" name='nombre'
                                        required
                                        onChange={(e) => handleOnChange(e)}
                                        value={valoresForm.nombre} className="form-control" />
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Estado</label>
                                    <select className="form-select"
                                        required
                                        onChange={(e) => handleOnChange(e)}
                                        name='estado'
                                        value={valoresForm.estado}>
                                        <option value="" disabled>--SELECCIONE--</option>
                                        <option value="ACTIVO">ACTIVO</option>
                                        <option value="INACTIVO">INACTIVO</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <button className='btn btn-info'>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <Table dataTableHead={dataTableHead}>
                        {tipos.map((tipo) => (
                            <tr key={tipo._id}>
                                <th scope="row">{tipo._id}</th>
                                <td>{tipo.nombre}</td>
                                <td>{tipo.estado}</td>
                                <td>{moment(tipo.fechaCreacion).format('MMMM Do YYYY, h:mm:ss')}</td>
                                <td>{moment(tipo.fechaActualizacion).format('MMMM Do YYYY, h:mm:ss')}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={(e) => handleUpdate(e, tipo)}>
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </div>
            </div>
        </div>
    )
}
