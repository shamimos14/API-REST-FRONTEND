import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { crearUsuario, editarUsuario, getUsuarios } from '../../services/usuarioService'
import { Table } from '../table';

export const UsuarioView = () => {
    const [valoresForm, setValoresForm] = useState({ nombre: "", email: "", estado: "" });
    const [usuarios, setUsuarios] = useState([]);
    const dataTableHead = ["Id", "Nombre", "Email", "Estado", "Fecha de Creación", "Fecha de Actualización"];

    const listarUsuarios = async () => {
        try {
            const { data } = await getUsuarios();
            setUsuarios(data);
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
        const usuario = {
            nombre: valoresForm.nombre,
            email: valoresForm.email,
            estado: valoresForm.estado
        }
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();

            if (valoresForm.id) {
                await editarUsuario(valoresForm)

            } else {
                await crearUsuario(usuario);
            }

            listarUsuarios();
            setValoresForm({ nombre: "", email: "", estado: "" });
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

    const handleUpdate = async (e, usuario) => {
        e.preventDefault();
        setValoresForm({
            nombre: usuario.nombre,
            email: usuario.email,
            estado: usuario.estado,
            id: usuario._id
        });
    }

    useEffect(() => {
        listarUsuarios();
    }, []);

    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Crear Usuario</h5>
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
                                    <label className="form-label">Email</label>
                                    <input type="tex" name='email'
                                        required
                                        onChange={(e) => handleOnChange(e)}
                                        value={valoresForm.email} className="form-control" />
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
                        {usuarios.map((usuario) => (
                            <tr key={usuario._id}>
                                <th scope="row">{usuario._id}</th>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.estado}</td>
                                <td>{moment(usuario.fechaCreacion).format('MMMM Do YYYY, h:mm:ss')}</td>
                                <td>{moment(usuario.fechaActualizacion).format('MMMM Do YYYY, h:mm:ss')}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={(e) => handleUpdate(e, usuario)}>
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