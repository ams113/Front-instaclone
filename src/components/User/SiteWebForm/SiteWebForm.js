import React from 'react';
import './SiteWebForm.scss';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { toast } from 'react-toastify';

export const SiteWebForm = ( { setShowModal, currentSiteWeb, refetch} ) => {

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik( {
        initialValues: { siteWeb: currentSiteWeb || '' },
        validationSchema: Yup.object( {
            siteWeb: Yup.string().required()
        }),
        onSubmit: async ( formValue ) => {
            
            try {
                await updateUser({
                    variables: {
                        input: formValue,
                    }
                });
                refetch();
                setShowModal( false );
                toast.success('Sitio Web actualizado');
            } catch (error) {
                toast.error( 'Error al actualizar sitio Web' );
            }
        }
    });


    return (
        <Form className="site-web-form" onSubmit={ formik.handleSubmit } >
            <Form.Input
                placeholder='Url sitio web' 
                name="siteWeb"
                value={ formik.values.siteWeb } 
                onChange={ formik.handleChange }
                error= { formik.errors.siteWeb && true }

            />
            <Button type="submit" className="btn-submit">
                Actualizar
            </Button>
        </Form>
    )
}

export default SiteWebForm;