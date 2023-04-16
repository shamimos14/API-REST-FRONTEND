import React from 'react'

export const InventarioCard = (props) => {

    const { inventario } = props

    return (
        <div className='card inventario-card'>
            <div className="image">
                <img src={inventario.fotoEquipo} className='card-img-top' alt='...' />
            </div>
            <div className='card-body'>
                <h5 className='card-title'>Caracteristicas</h5>
                <hr />
                <p className='card-text'>{`Serial: ${inventario.serial}`}</p>
                <p className='card-text'>{`Marca: ${inventario.marca.nombre}`}</p>
                <p className='card-text'>{`Nombre: ${inventario.usuario.nombre}`}</p>
                <p className='cart-text'>
                    <a href={`inventarios/edit/${inventario._id}`}>Ver Más...</a>
                </p>
            </div>
        </div>
    )
}
