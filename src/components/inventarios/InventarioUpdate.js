import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getInventarioPorId, editInventario } from '../../services/inventarioService';
import Swal from 'sweetalert2';
import { listarEstados, listarMarcas, listarTipos, listarUsuarios } from '../../services/peticionesGet';


export const InventarioUpdate = () => {

    const { inventarioId = '' } = useParams();
    const [inventario, setInventario] = useState({});
    const [valoresForm, setValoresForm] = useState({});
    const [usuarios, setUsuarios] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [estados, setEstados] = useState([]);
    const { serial = '', modelo = '', descripcion = '', color = '', fotoEquipo = '',
        fechaCompra = '', precio = '', usuario, marca, tipoEquipo, estadoEquipo } = valoresForm;

    const getData = async () => {
        setUsuarios(await listarUsuarios());
        setEstados(await listarEstados());
        setMarcas(await listarMarcas());
        setTipos(await listarTipos());
    }

    useEffect(() => {
        setValoresForm({
            serial: inventario.serial,
            modelo: inventario.modelo,
            descripcion: inventario.descripcion,
            color: inventario.color,
            fotoEquipo: inventario.fotoEquipo,
            fechaCompra: inventario.fechaCompra,
            precio: inventario.precio,
            usuario: inventario.usuario,
            marca: inventario.marca,
            tipoEquipo: inventario.tipoEquipo,
            estadoEquipo: inventario.estadoEquipo,
        })
    }, [inventario]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value }) //spreat
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const inventario = {
            serial, modelo, descripcion, color, fechaCompra, precio, fotoEquipo,
            usuario: {
                _id: usuario
            },
            marca: {
                _id: marca
            },
            tipoEquipo: {
                _id: tipoEquipo
            },
            estadoEquipo: {
                _id: estadoEquipo
            }

        }
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            await editInventario(inventarioId, inventario);
            Swal.close();
        } catch (error) {
            console.log(error);
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

    useEffect(() => {
        const getInventario = async () => {
            try {
                Swal.fire({
                    allowOutsideClick: false,
                    text: 'Cargando...'
                });
                Swal.showLoading();
                const { data } = await getInventarioPorId(inventarioId);
                setInventario(data);
                Swal.close();
            } catch (error) {
                console.log(error);
                Swal.close();
            }
        }
        getData();
        getInventario();
    }, [inventarioId]);

    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Detalle activo</h5>
                </div>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-6'>
                        <img src={inventario?.fotoEquipo} alt={inventario?.descripcion} />
                    </div>
                    <div className='col-md-6'>
                        <form onSubmit={(e) => handleOnSubmit(e)}>
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Serial</label>
                                        <input type="tex" name='serial'
                                            required
                                            onChange={(e) => handleOnChange(e)}
                                            value={serial} className="form-control" />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Modelo</label>
                                        <input type="tex" name='modelo'
                                            required
                                            onChange={(e) => handleOnChange(e)}
                                            value={modelo} className="form-control" />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Descripción</label>
                                        <input type="tex" name='descripcion'
                                            required
                                            onChange={(e) => handleOnChange(e)}
                                            value={descripcion} className="form-control" />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Color</label>
                                        <input type="tex" name='color'
                                            required
                                            onChange={(e) => handleOnChange(e)}
                                            value={color} className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Foto</label>
                                        <input type="url" name='fotoEquipo'
                                            required
                                            onChange={(e) => handleOnChange(e)}
                                            value={fotoEquipo} className="form-control" />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Fecha Compra</label>
                                        <input type="date" name='fechaCompra'
                                            required
                                            onChange={(e) => handleOnChange(e)}
                                            value={fechaCompra} className="form-control" />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Precio</label>
                                        <input type="number" name='precio'
                                            required
                                            onChange={(e) => handleOnChange(e)}
                                            value={precio} className="form-control" />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Usuario</label>
                                        <select className="form-select"
                                            required
                                            onChange={(e) => handleOnChange(e)}
                                            name='usuario'
                                            value={usuario}>
                                            <option value="">--SELECCIONE--</option>
                                            {
                                                usuarios.map(({ _id, nombre }) => {
                                                    return <option key={_id} value={_id}>
                                                        {nombre}
                                                    </option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Marca</label>
                                        <select className="form-select"
                                            required
                                            onChange={(e) => handleOnChange(e)}
                                            name='marca'
                                            value={marca}>
                                            <option value="">--SELECCIONE--</option>
                                            {
                                                marcas.map(({ _id, nombre }) => {
                                                    return <option key={_id} value={_id}>
                                                        {nombre}
                                                    </option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Tipo Equipo</label>
                                        <select className="form-select"
                                            required
                                            onChange={(e) => handleOnChange(e)}
                                            name='tipoEquipo'
                                            value={tipoEquipo}>
                                            <option value="">--SELECCIONE--</option>
                                            {
                                                tipos.map(({ _id, nombre }) => {
                                                    return <option key={_id} value={_id}>
                                                        {nombre}
                                                    </option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Estado Equipo</label>
                                        <select className="form-select"
                                            required
                                            onChange={(e) => handleOnChange(e)}
                                            name='estadoEquipo'
                                            value={estadoEquipo}>
                                            <option value="">--SELECCIONE--</option>
                                            {
                                                estados.map(({ _id, nombre }) => {
                                                    return <option key={_id} value={_id}>
                                                        {nombre}
                                                    </option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <button className='btn btn-info'>Guardar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
