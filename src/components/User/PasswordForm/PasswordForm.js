import React from 'react';
import './PasswordForm.scss';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { toast } from 'react-toastify';


export const PasswordForm = ( { logout } ) => {

    const [updateUser] = useMutation( UPDATE_USER );

    const formik = useFormik({
        initialValues: initValues(),
        validationSchema: Yup.object( {
            currentPass: Yup.string().required(),
            newPass: Yup.string()
                .required()
                .oneOf([Yup.ref('repeatNewPass')]),
            repeatNewPass: Yup.string()
                .required()
                .oneOf([Yup.ref('newPass')]),
        }),
        onSubmit: async ( formValue ) => {
            try {
                
                const result = await updateUser( {
                    variables: {
                        input: {
                            currentPassword: formValue.currentPass,
                            newPassword: formValue.newPass,
                        }
                    }
                });

                if ( !result.data.updateUser ) {
                    toast.error('Error al cambiar la contraseña');
                } else {
                    toast.success('Contraseña actualizada correctamente');
                    logout();
                }

            } catch (error) {
                toast.error('Error al cambiar la contraseña');
            }
        }
    });

    return (
        <>
            <Form className="password-form" onSubmit={ formik.handleSubmit } >
                <Form.Input
                    type="password" 
                    placeholder="Contraseña actual"
                    name="currentPass"
                    value={ formik.values.currentPass }
                    onChange={ formik.handleChange }
                    error={ formik.errors.currentPass && true}
                />
                <Form.Input 
                    type="password"
                    placeholder="Nueva contraseña"
                    name="newPass"
                    value={ formik.values.newPass }
                    onChange={ formik.handleChange }
                    error={ formik.errors.newPass && true}
                />
                <Form.Input
                    type="password" 
                    placeholder="Repetir nueva contraseña"
                    name="repeatNewPass"
                    value={ formik.values.repeatNewPass }
                    onChange={ formik.handleChange }
                    error={ formik.errors.repeatNewPass && true}
                />
                <Button 
                    className="btn-submit"
                    type="submit">
                        Actualizar
                </Button>
            </Form>
        </>
    )
}

function initValues() {
    return {
        currentPass: '',
        newPass: '',
        repeatNewPass: '',
    }
}

export default PasswordForm;