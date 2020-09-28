import React from 'react';
import './EmailForm.scss';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';

export const EmailForm = ( { setShowModal, currentEmail, refetch } ) => {

    const [updateUser] = useMutation( UPDATE_USER );

    const formik = useFormik({
        initialValues: { email: currentEmail || '' },
        validationSchema: Yup.object( {
            email: Yup.string().email().required(),
        }),
        onSubmit: async ( formValue ) => {
            try {
                
                await updateUser( {
                    variables: {
                        input: formValue
                    }
                });

                refetch();
                setShowModal(false);
                toast.success('Email actualizado correctamente');

            } catch (error) {
                toast.error('Error al cambiar la contraseña');
            }
        }

    });

    return (
       <Form className="email-form" onSubmit={ formik.handleSubmit }>
            <Form.Input 
                    placeholder="Nuevo email"
                    name="email"
                    value={ formik.values.email }
                    onChange={ formik.handleChange }
                    error={ formik.errors.email && true}
                />
             <Button 
                    className="btn-submit"
                    type="submit">
                        Actualizar
            </Button>
       </Form>
    )
}

export default EmailForm;