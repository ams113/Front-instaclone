import React from 'react';
import { Link } from 'react-router-dom';
import './UserNotFound.scss';

export const UserNotFound = () => {
    return (
        <div className="user-not-found">
            <p>Usuario no encontrado</p>
            <p>Enlace es incorrecto o usuario esta eliminado</p>
            <Link to="/" > Volver al inicio </Link>
        </div>
    )
}

export default UserNotFound;