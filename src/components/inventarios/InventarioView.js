import React, { useState, useEffect } from 'react';
import { getInventario } from '../../services/inventarioService'
import { InventarioCard } from './InventarioCard';
import { InventarioNew } from './InventarioNew';
import Swal from 'sweetalert2';

export const InventarioView = () => {

    const [inventarios, setInventarios] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const listarInventarios = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await getInventario();
            setInventarios(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        listarInventarios();
    }, []);

    const handleOpenModal = () => {
        setOpenModal(!openModal)

    }

    return (
        <div className='container-fluid'>
            <div className='container-cards'>
                <div className='cards mt-2 mb-2'>
                    {
                        inventarios.map((inventario) => {
                            return <InventarioCard key={inventario._id} inventario={inventario} />
                        })
                    }
                </div>
            </div>
            {
                openModal ? <InventarioNew
                    handleOpenModal={handleOpenModal}
                    listarInventarios={listarInventarios} /> :
                    (<button className='btn btn-primary fab' onClick={handleOpenModal}>
                        <i className="fa-solid fa-plus"></i>
                    </button>)
            }
        </div>
    )

}


