import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { crearMarca, editarMarca, getMarca } from '../../services/marcaService';
import { Table } from '../table';

export const MarcaView = () => {
    const [valoresForm, setValoresForm] = useState({ nombre: "", estado: "" });
    const [marcas, setMarcas] = useState([]);
    const dataTableHead = ["Id", "Nombre", "Estado", "Fecha de Creación", "Fecha de Actualización"];

    const listarMarcas = async () => {
        try {
            const { data } = await getMarca();
            setMarcas(data);
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
        const marca = {
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
                await editarMarca(valoresForm)

            } else {
                await crearMarca(marca);
            }

            listarMarcas();
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

    const handleUpdate = async (e, marca) => {
        e.preventDefault();
        setValoresForm({
            nombre: marca.nombre,
            estado: marca.estado, id: marca._id
        });
    }

    useEffect(() => {
        listarMarcas();
    }, []);

    return (
        <div className="container-fluid mt-3 mb-2 p-3">
            <div className="card">
                <div className='card-header'>
                    <h5 className='card-title'>Marcas</h5>
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
                        {marcas.map((marca) => (
                            <tr key={marca._id}>
                                <th scope="row">{marca._id}</th>
                                <td>{marca.nombre}</td>
                                <td>{marca.estado}</td>
                                <td>{moment(marca.fechaCreacion).format('MMMM Do YYYY, h:mm:ss')}</td>
                                <td>{moment(marca.fechaActualizacion).format('MMMM Do YYYY, h:mm:ss')}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={(e) => handleUpdate(e, marca)}>
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
