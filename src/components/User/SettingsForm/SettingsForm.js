import React from 'react';
import { Button } from 'semantic-ui-react';
import './SettingsForm.scss';
import useAuth from '../../../hook/useAuth';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import PasswordForm from '../PasswordForm/PasswordForm';
import EmailForm from '../EmailForm';
import DescriptionForm from '../DescriptionForm';
import SiteWebForm from '../SiteWebForm/SiteWebForm';

export const SettingsForm = ( { setShowModal, setTitleModal, setChildrenModal, getUser, refetch } ) => {

    const client = useApolloClient();
    const { logout } = useAuth();
    const history = useHistory();

    const onChangePass = () => {
        setTitleModal('Cambiar contraseña');
        setChildrenModal( <PasswordForm logout={onLogout} /> );
    };
    
    const onChangeEmail = () => {
        setTitleModal('Cambiar email')
        setChildrenModal( 
            <EmailForm 
                setShowModal={ setShowModal } 
                currentEmail={ getUser.email } 
                refetch={ refetch } 
            /> );
    };

    const onChangeDescription = () => {
        setTitleModal('Actualizar biografía')
        setChildrenModal( 
            <DescriptionForm
                setShowModal={ setShowModal } 
                currentDescription={ getUser.description } 
                refetch={ refetch } 
            /> );
    };

    const onChangeSiteWeb = () => {
        setTitleModal('Actualizar Sitio Web')
        setChildrenModal( 
            <SiteWebForm
                setShowModal={ setShowModal } 
                currentSiteWeb={ getUser.siteWeb } 
                refetch={ refetch } 
            /> );
    };

    const onLogout = () => {
        client.clearStore();
        logout();
        history.push('/');
        
    };

    return (
        <div className="settings-form">
            <Button onClick={ onChangePass } >Cambiar contraseña</Button>
            <Button onClick={ onChangeEmail }>Cambiar email</Button>
            <Button onClick={ onChangeDescription }>Descripción</Button>
            <Button onClick={ onChangeSiteWeb }>Sitio web</Button>
            <Button onClick={ onLogout }>Cerrar sesión</Button>
            <Button onClick={ ()=> setShowModal( false ) }>Cancelar</Button>
        </div>
    )
}

export default SettingsForm;